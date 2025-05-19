from beanie import Document, Link
from pydantic import Field
from typing import Literal
from .user import UserModel

class ProblemModel(Document):
    title: str = Field(..., unique=True)
    problemStatement: str # Markdown string will be stored in this field
    difficulty: Literal["easy", "medium", "hard"]
    tags: list[str]
    author: Link[UserModel]

    class Settings:
        name = "problem"