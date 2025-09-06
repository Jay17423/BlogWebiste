# app/routers/post.py

from fastapi import APIRouter, Depends, Form, File, UploadFile
from sqlmodel import Session
from app.database import get_session # Assuming you have this
from app.dependencies import get_current_user
from app.schema.post import PostRead
from app.services.post_services import create_post_with_image

router = APIRouter(prefix="/posts", tags=["Posts"])

@router.post("/", response_model=PostRead)
async def create_post(
    title: str = Form(...),
    content: str = Form(...),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user.get("id")

    post = await create_post_with_image(
        db=db,
        user_id=user_id,
        title=title,
        content=content,
        image=image
    )

    return post