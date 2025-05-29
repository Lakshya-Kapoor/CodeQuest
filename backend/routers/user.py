from fastapi import APIRouter, File, Form, UploadFile, Depends, HTTPException
from utils import verify_jwt_token, FileService, GCSWrapper, GCSError
from typing import Literal
from models import SolutionModel, ProblemModel
from beanie import PydanticObjectId

router = APIRouter()

@router.post("/solutions")
async def create_solution(
    jwtPayload = Depends(verify_jwt_token),
    file: UploadFile = File(...),
    problem_id: str = Form(...),
    language: Literal["python"] = Form(...)
):
    try:
        problem = await ProblemModel.get(PydanticObjectId(problem_id))
        if not problem:
            raise HTTPException(status_code=404, detail="Invalid problem ID")

        content = await file.read()
        if len(content) > FileService.MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File size exceeds 1 MB")
        
        solution = SolutionModel(
            user=PydanticObjectId(jwtPayload["id"]),
            problem=PydanticObjectId(problem_id),
            language=language,
            status="pending"
        )
        await solution.insert()

        blobName = f"solutions/{solution.id}"
        await GCSWrapper.upload_file(blobName, file.file)
        
        return {"message": "Solution submitted successfully"}
    
    except GCSError as e:
        await solution.delete()
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail="Server error")

@router.get("/solutions")
async def get_solutions(jwtPayload = Depends(verify_jwt_token), problem_id: str | None = None):
    try:
        solutions = await SolutionModel.find(SolutionModel.user == PydanticObjectId(jwtPayload["id"])).to_list()
        if problem_id:
            solutions = [sol for sol in solutions if str(sol.problem) == problem_id]
        return solutions
    except Exception as e:
        raise HTTPException(status_code=500, detail="Server error")

@router.get("/problems")
async def get_problems():
    try:
        problems = await ProblemModel.find_all().to_list()
        return problems
    except Exception as e:
        raise HTTPException(status_code=500, detail="Server error")
    
@router.get("/problems/{problem_id}")
async def get_problem(problem_id: str):
    try:
        problem = await ProblemModel.get(PydanticObjectId(problem_id))
        if not problem:
            raise HTTPException(status_code=404, detail="Problem not found")
        return problem
    except Exception as e:
        raise HTTPException(status_code=500, detail="Server error")