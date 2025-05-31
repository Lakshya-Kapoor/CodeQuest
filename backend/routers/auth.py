from fastapi import APIRouter, HTTPException, status, Response, Request, Depends
from pydantic import BaseModel
import bcrypt
from typing import Literal
from utils import create_access_token, verify_jwt_token
from models.user import UserModel

router = APIRouter()

class SignupRequest(BaseModel):
    username: str
    password: str
    role: Literal["user", "admin"]

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

@router.post("/signup", response_model=TokenResponse)
async def signup(payload: SignupRequest, response: Response):
    existing = await UserModel.find_one(UserModel.username == payload.username)
    
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")
    
    hashed_pw = bcrypt.hashpw(payload.password.encode("utf-8"), bcrypt.gensalt())
    user = UserModel(username=payload.username, password=hashed_pw.decode("utf-8"), role=payload.role)
    await user.insert()
    
    token = create_access_token({"username": user.username, "id": str(user.id), "role": user.role})
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False
    )
    return TokenResponse(access_token=token)

@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, response: Response):
    user = await UserModel.find_one(UserModel.username == payload.username)
    
    if not user or not bcrypt.checkpw(payload.password.encode("utf-8"), user.password.encode("utf-8")):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    token = create_access_token({"username": user.username, "id": str(user.id), "role": user.role})
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False
    )
    return TokenResponse(access_token=token)

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out successfully"}

@router.get("/user")
async def get_user_info(payload = Depends(verify_jwt_token)):
    return payload
    