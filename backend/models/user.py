from beanie import Document
from typing import Literal
from pydantic import Field

class UserModel(Document):
    username: str = Field(..., unique=True)
    password: str
    role: Literal["user", "admin"]

    class Settings:
        name = "user"