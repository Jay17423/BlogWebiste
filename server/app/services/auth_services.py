
from fastapi import HTTPException,status
from requests import Session
from sqlmodel import select

from app.models.user import User
from app.schema.user import UserRead
from app.services.user_services import create_user, get_user_by_username
from app.utils.security import hash_password, verify_password


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
    return user
