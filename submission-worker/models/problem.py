from mongoengine import Document, StringField, ReferenceField, IntField, DateTimeField, ListField
from datetime import datetime
from .user import UserModel


class ProblemModel(Document):
    title = StringField(required=True, unique=True)
    problemStatement = StringField()
    difficulty = StringField(required=True, choices=["easy", "medium", "hard"])
    tags = ListField(StringField())
    author = ReferenceField(UserModel, required=True)
    timeLimit = IntField(required=True)  # in seconds
    memoryLimit = IntField(required=True)  # in MB
    createdAt = DateTimeField(required=True, default=datetime.utcnow)

    meta = {"collection": "problem"}