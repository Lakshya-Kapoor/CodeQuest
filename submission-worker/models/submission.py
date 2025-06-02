from mongoengine import Document, StringField, DateTimeField, ReferenceField
from datetime import datetime
from typing import Literal
from .user import UserModel
from .problem import ProblemModel

class SubmissionModel(Document):
    language = StringField(required=True, choices=["python"])
    submittedAt = DateTimeField(required=True, default=datetime.utcnow)
    problem = ReferenceField(ProblemModel, required=True)
    user = ReferenceField(UserModel, required=True)
    status = StringField(required=True, choices=[
        "pending", "accepted", "wrong answer", "runtime error", "compile error",
        "time limit exceeded", "memory limit exceeded"
    ])

    meta = {"collection": "submission"}
