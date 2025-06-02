import os
from mongoengine import connect

def connect_db():
    MONGODB_URI = os.getenv("MONGODB_URI")
    print(f"Connecting to MongoDB at {MONGODB_URI}")
    connect(host=MONGODB_URI, db="codequest")