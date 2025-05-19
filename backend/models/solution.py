from .problem import ProblemModel
from .user import UserModel
from beanie import Document, Link
from datetime import datetime, UTC
from typing import Literal

class SolutionModel(Document):
    language: Literal["python"]
    submittedAt: datetime = datetime.now(UTC)
    problem: Link[ProblemModel]
    user: Link[UserModel]
    status: Literal["pending", "accepted", "wrong answer", "runtime error", "compile error", "time limit exceeded", "memory limit exceeded"]
