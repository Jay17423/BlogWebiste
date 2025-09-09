from ast import Dict
from fastapi import APIRouter, Depends, Response
from app.dependencies import get_current_user
from sqlmodel import Session
from app.database import get_session
from app.schema.user import TokenResponse, UserCreate, UserLogin, UserRead
from app.services.auth_services import login_user, signup_user

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/signup", response_model=UserRead)
def signup(user: UserCreate, session: Session = Depends(get_session)):
    db_user = signup_user(session, user.username, user.password)
    return db_user

@router.post("/login",response_model=TokenResponse)
def user_login(user: UserLogin, session: Session = Depends(get_session), response: Response = None):
    login_data = login_user(session, user.username, user.password)
   
    
    return login_data

@router.get("/me", response_model=UserRead)
def get_me(current_user: Dict = Depends(get_current_user)):
    return current_user


@router.post("/logout")
def logout():
    return {"message": "Logout successful (clear token on frontend)"}