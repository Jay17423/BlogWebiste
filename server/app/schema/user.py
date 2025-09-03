from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel


class UserBase(SQLModel):
    username: str


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    pass
    
class UserLogin(UserBase):
    password: str