from fastapi import FastAPI
# from dotenv import load_dotenv
from environs import Env
from contextlib import asynccontextmanager
from utils import connect_db
from routers import *
from fastapi.middleware.cors import CORSMiddleware
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield

Env().read_env()

app = FastAPI(lifespan=lifespan)

# Add CORS middleware to allow all frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_DOMAIN")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(problem_router, prefix="/problems")
app.include_router(submission_router, prefix="/submissions")