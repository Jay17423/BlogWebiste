
from fastapi import HTTPException
from requests import Session

from app.models.user import User
from app.services.user_services import create_user, get_user_by_username
from app.utils.security import hash_password


def signup_user(session:Session, username:str,password:str) -> User:
    if get_user_by_username(session,username):
        raise HTTPException(status_code=400,  detail="Username already taken")
    user = User(username=username,hashed_password=hash_password(password))
    return create_user(session,user=user)