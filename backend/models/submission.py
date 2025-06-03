from beanie import Document
from beanie.odm.fields import PydanticObjectId
from datetime import datetime
from utils import Language, Status

class SubmissionModel(Document):
    language: Language
    submittedAt: datetime
    problem: PydanticObjectId
    user: PydanticObjectId
    status: Status

    class Settings:
        name = "submission"
