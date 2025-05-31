from fastapi import APIRouter, Depends, File, Form, UploadFile, HTTPException, status, Query
from models import ProblemModel, SubmissionModel
from utils import is_admin, FileService, FileError, GCSError, GCSWrapper, verify_jwt_token
from typing import Literal
from beanie import PydanticObjectId

router = APIRouter()

@router.post("")
async def create_problem(
    jwtPayload = Depends(is_admin),
    file: UploadFile = File(...),
    title: str = Form(...),
    difficulty: Literal["easy", "medium", "hard"] = Form(...),
    timeLimit: int = Form(...),
    memoryLimit: int = Form(...),
):

    try:
        FileService.validate_zip(file)
        problemStatement = FileService.extract_problem_statement(file)

        problem = ProblemModel(
            title=title,
            problemStatement=problemStatement,
            difficulty=difficulty,
            timeLimit=timeLimit,
            memoryLimit=memoryLimit,
            author=PydanticObjectId(jwtPayload["id"])
        )
        await problem.insert()

        blobName = f"problems/{problem.id}"
        await GCSWrapper.upload_file(blobName, file.file)

        return {"message": "Problem created successfully"}

    except FileError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except GCSError as e:
        await problem.delete()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Server error")

@router.delete("/{problem_id}")
async def delete_problem(problem_id: str, jwtPayload = Depends(is_admin)):
    try:
        problem = await ProblemModel.get(PydanticObjectId(problem_id))
        if not problem or problem.author != PydanticObjectId(jwtPayload["id"]):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Problem not found")

        await GCSWrapper.delete_file(f"problems/{problem.id}")
        await problem.delete()
        return {"message": "Problem deleted successfully"}

    except GCSError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Server error")
    

@router.get("")
async def get_problems(created_by: str = Query(None)):
    try:
        if created_by:
            problems = await ProblemModel.find(ProblemModel.author == PydanticObjectId(created_by)).to_list()
        else:
            problems = await ProblemModel.find_all().to_list()
        return problems
    except Exception as e:
        raise HTTPException(status_code=500, detail="Server error")

@router.get("/{problem_id}")
async def get_problem(problem_id: str):
    try:
        problem = await ProblemModel.get(PydanticObjectId(problem_id))
        if not problem:
            raise HTTPException(status_code=404, detail="Problem not found")
        return problem
    except Exception as e:
        raise HTTPException(status_code=500, detail="Server error")

@router.get("/{problem_id}/submissions")
async def get_problem_submissions_metadata(problem_id: str, jwtPayload = Depends(verify_jwt_token)):
    try:
        submissions = await SubmissionModel.find_many({
            "problem": PydanticObjectId(problem_id),
            "user": PydanticObjectId(jwtPayload["id"])
        }).to_list()
        return submissions
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Server error")