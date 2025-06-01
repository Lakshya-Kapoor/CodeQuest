from beanie import Document
from beanie.odm.fields import PydanticObjectId
from datetime import datetime, UTC
from typing import Literal

class SubmissionModel(Document):
    language: Literal["python"]
    submittedAt: datetime
    problem: PydanticObjectId
    user: PydanticObjectId
    status: Literal["pending", "accepted", "wrong answer", "runtime error", "compile error", "time limit exceeded", "memory limit exceeded"]

    class Settings:
        name = "submission"
