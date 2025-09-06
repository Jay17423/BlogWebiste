# app/services/post_service.py

from sqlmodel import Session
from fastapi import UploadFile
from app.models.post import Post
from app.services.cloudinary_service import upload_image

async def create_post_with_image(
    db: Session,
    user_id: int,
    title: str,
    content: str,
    image: UploadFile | None = None
) -> Post:

    image_url = None
    if image and image.filename:
        # Upload image to Cloudinary and get the URL
        image_url = upload_image(image)

    new_post = Post(
        title=title,
        content=content,
        image_url=image_url,
        user_id=user_id
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post