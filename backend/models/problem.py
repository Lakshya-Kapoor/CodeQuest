from beanie import Document, PydanticObjectId
from pydantic import Field
from typing import Literal
from datetime import datetime


class ProblemModel(Document):
    title: str = Field(..., unique=True)
    problemStatement: str | None = None # Markdown string will be stored in this field
    difficulty: Literal["easy", "medium", "hard"]
    tags: list[str] = []
    author: PydanticObjectId
    timeLimit: int # in seconds
    memoryLimit: int # in MB
    createdAt: datetime

    class Settings:
        name = "problem"