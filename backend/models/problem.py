from beanie import Document, PydanticObjectId
from pydantic import Field
from datetime import datetime
from utils import Difficulty


class ProblemModel(Document):
    title: str = Field(..., unique=True)
    problemStatement: str | None = None # Markdown string will be stored in this field
    difficulty: Difficulty
    tags: list[str] = []
    author: PydanticObjectId
    timeLimit: int # in seconds
    memoryLimit: int # in MB
    createdAt: datetime

    class Settings:
        name = "problem"