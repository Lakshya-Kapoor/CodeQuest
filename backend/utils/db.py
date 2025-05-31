import os
from beanie import init_beanie, Document
from motor.motor_asyncio import AsyncIOMotorClient
from models import ProblemModel, UserModel, SubmissionModel

class Sample(Document):
    name: str


async def connect_db():
    MONGODB_URI = os.getenv("MONGODB_URI")
    client = AsyncIOMotorClient(MONGODB_URI)

    await init_beanie(database=client.codequest, document_models=[Sample, ProblemModel, UserModel, SubmissionModel])