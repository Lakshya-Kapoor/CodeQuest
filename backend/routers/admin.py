from fastapi import APIRouter, Depends, File, Form, UploadFile, HTTPException, status
from models import ProblemModel, UserModel
from utils import is_admin, FileService, FileError, GCSError, GCSWrapper
from pydantic import BaseModel
from typing import Literal
from beanie import PydanticObjectId

router = APIRouter()

@router.post("/problems")
async def create_question(
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

        return {"message": "Question created successfully"}

    except FileError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except GCSError as e:
        await problem.delete()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Server error")


@router.get("/problems")
async def get_questions(jwtPayload = Depends(is_admin)):
    problems = await ProblemModel.find(ProblemModel.author == PydanticObjectId(jwtPayload["id"])).to_list()
    return problems

@router.delete("/problems/{problem_id}")
async def delete_question(problem_id: str, jwtPayload = Depends(is_admin)):
    try:
        problem = await ProblemModel.get(PydanticObjectId(problem_id))
        if not problem or problem.author != PydanticObjectId(jwtPayload["id"]):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Problem not found")

        await GCSWrapper.delete_file(f"problems/{problem.id}")
        await problem.delete()
        return {"message": "Question deleted successfully"}

    except GCSError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Server error")