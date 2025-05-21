from fastapi import FastAPI
# from dotenv import load_dotenv
from environs import Env
from contextlib import asynccontextmanager
from utils import connect_db
from routers import auth_router, admin_router, user_router
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    # load_dotenv()
    Env().read_env()
    await connect_db()
    yield

app = FastAPI(lifespan=lifespan)

# Add CORS middleware to allow all origins, methods, and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(admin_router, prefix="/admin")
app.include_router(user_router, prefix="/user")