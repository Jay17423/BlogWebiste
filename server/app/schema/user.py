from sqlmodel import SQLModel



class UserBase(SQLModel):
    username: str


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id:int
    
class UserLogin(UserBase):
    password: str

class TokenResponse(UserBase):
    access_token: str
    token_type: str
    id: int