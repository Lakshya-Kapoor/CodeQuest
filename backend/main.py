from fastapi import FastAPI
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from utils import connect_db
from routers import auth_router, admin_router

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(auth_router, prefix="/auth")
app.include_router(admin_router, prefix="/admin")