from fastapi import FastAPI
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from utils import connect_db

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield

app = FastAPI(lifespan=lifespan)

@app.get("/")
async def root():
    return "Hello world"