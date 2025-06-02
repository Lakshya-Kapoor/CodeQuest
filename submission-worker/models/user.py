from mongoengine import Document, StringField
from typing import Literal

class UserModel(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    role = StringField(required=True, choices=["user", "admin"])

    meta = {"collection": "user"}