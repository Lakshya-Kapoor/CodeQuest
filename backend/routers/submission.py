from fastapi import APIRouter, File, Form, UploadFile, Depends, HTTPException
from utils import verify_jwt_token, FileService, GCSWrapper, GCSError, pubsub_publish, PubSubError
from typing import Literal
from models import SubmissionModel, ProblemModel
from beanie import PydanticObjectId
from datetime import datetime, UTC


router = APIRouter()

@router.post("")
async def create_submission(
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
        
        submission = SubmissionModel(
            user=PydanticObjectId(jwtPayload["id"]),
            problem=PydanticObjectId(problem_id),
            submittedAt=datetime.now(UTC),
            language=language,
            status="pending"
        )
        await submission.insert()

        blobName = f"submissions/{submission.id}"
        await GCSWrapper.upload_file(blobName, file.file)

        await pubsub_publish(str(submission.id).encode())
        
        return {"message": "Submission submitted successfully"}
    
    except GCSError as e:
        await submission.delete()
        raise HTTPException(status_code=500, detail=str(e))
    except PubSubError as e:
        await submission.delete()
        await GCSWrapper.delete_file(blobName)
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail="Server error")

@router.get("")
async def get_submissions(jwtPayload = Depends(verify_jwt_token), problem_id: str | None = None):
    try:
        submissions = await SubmissionModel.find(SubmissionModel.user == PydanticObjectId(jwtPayload["id"])).to_list()
        if problem_id:
            submissions = [sub for sub in submissions if str(sub.problem) == problem_id]
        return submissions
    except Exception as e:
        raise HTTPException(status_code=500, detail="Server error")

@router.get("/{submission_id}/code")
async def get_submission_code(submission_id: str, jwtPayload = Depends(verify_jwt_token)):
    try:
        submission = await SubmissionModel.get(PydanticObjectId(submission_id))
        if not submission or submission.user != PydanticObjectId(jwtPayload["id"]):
            raise HTTPException(status_code=404, detail="Submission not found")

        blobName = f"submissions/{submission.id}"
        code = await GCSWrapper.read_file(blobName)
        return code
    
    except GCSError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail="Server error")