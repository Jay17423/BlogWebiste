from requests import Session
from websockets import route
from app.database import get_session
from fastapi import APIRouter, Depends,HTTPException,Response

from app.schema.user import UserCreate, UserRead
from app.services.auth_services import signup_user

router = APIRouter(prefix="/auth",tags=["Auth"])

@router.post("/signup",response_model=UserRead)
def signup(user:UserCreate,session:Session = Depends(get_session)):
    db_user = signup_user(session,user.username,user.password)
    return db_user

