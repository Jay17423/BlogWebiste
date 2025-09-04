
from datetime import timedelta,datetime,timezone
from fastapi import HTTPException,status
import jwt
from requests import Session
from sqlmodel import select

from app.models.user import User
from app.services.user_services import create_user, get_user_by_username
from app.utils.security import hash_password, verify_password
from app.config import settings


def signup_user(session:Session, username:str,password:str) -> User:
    if get_user_by_username(session,username):
        raise HTTPException(status_code=400,  detail="Username already taken")
    user = User(username=username,hashed_password=hash_password(password))
    return create_user(session,user=user)

def login_user(session:Session,username:str,password:str) :
    user = session.exec(select(User).where(User.username==username)).first()
    if not user or not verify_password(password,user.hashed_password):
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    token = create_access_token({"sub":user.username})
    return {"access_token": token, "token_type": "bearer"}


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
