from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict
from fastapi import Form, UploadFile, File



class PostBase(BaseModel):
    title: str
    content: str




class PostCreate(PostBase):
    image_url: str

class PostUpdate(BaseModel):
    title: str
    content: str
    image_url: str

class PostRead(BaseModel):
    id: int
    title: str
    content: str
    image_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    user_id: int

    model_config = ConfigDict(from_attributes=True)
