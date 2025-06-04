import os
from mongoengine import connect

def connect_db():
    MONGODB_URI = os.getenv("MONGODB_URI")
    connect(host=MONGODB_URI, db="codequest")