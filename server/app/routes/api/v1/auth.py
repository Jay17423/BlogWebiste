from requests import Session
from websockets import route
from app.database import get_session
from fastapi import APIRouter, Depends,HTTPException,Response

from app.models.user import User
from app.schema.user import UserCreate, UserLogin, UserRead
from app.services.auth_services import login_user, signup_user

router = APIRouter(prefix="/auth",tags=["Auth"])

@router.post("/signup",response_model=UserRead)
def signup(user:UserCreate,session:Session = Depends(get_session)):
    db_user = signup_user(session,user.username,user.password)
    return db_user

@router.post("/login", response_model=UserRead)
def user_login(user:UserLogin,session:Session = Depends(get_session)):
    db_user = login_user(session,user.username,user.password)
    return db_user
