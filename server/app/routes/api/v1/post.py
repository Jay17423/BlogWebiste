from fastapi import Form, File, UploadFile


from fastapi import APIRouter, Depends, Form, File, HTTPException, UploadFile
from app.services.cloudinary_service import upload_image
from sqlmodel import Session, select,desc
from app.database import get_session  # Assuming you have this
from app.dependencies import get_current_user
from app.models.post import Post
from app.schema.post import PostRead, PostUpdate
from app.services.post_services import create_post_with_image

router = APIRouter(prefix="/posts", tags=["Posts"])


@router.post("/", response_model=PostRead)
async def create_post(
    title: str = Form(...),
    content: str = Form(...),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    user_id = current_user.get("id")

    post = await create_post_with_image(
        db=db, user_id=user_id, title=title, content=content, image=image
    )

    return post


@router.get("/my-posts", response_model=list[PostRead])
async def get_my_posts(
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    statement = select(Post).where(Post.user_id == current_user["id"])
    result = session.exec(statement).all()

    posts = (
        [p for (p,) in result] if result and isinstance(result[0], tuple) else result
    )

    return posts



@router.patch("/{id}", response_model=PostRead)
async def partial_update_post(
    id: int,
    title: str = Form(None),
    content: str = Form(None),
    image: UploadFile | None = File(None),
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    db_post = session.exec(select(Post).where(Post.id == id)).first()

    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")

    if db_post.user_id != current_user["id"]:
        raise HTTPException(status_code=403, detail="Not allowed to update this post")

    if title is not None:
        db_post.title = title
    if content is not None:
        db_post.content = content
    if image is not None:
        upload_result = upload_image(image)  
        db_post.image_url = upload_result

    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post



@router.delete("/{id}")
def delete_post(
    id: int,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    db_post = session.exec(select(Post).where(Post.id == id)).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    if current_user["id"] != db_post.user_id:
        raise HTTPException(status_code=403, detail="Not allowed to update this post")
    session.delete(db_post)
    session.commit()

    return {"msg": "Post deletion successfull"}


@router.get("/", response_model=list[PostRead])
def get_app_post(
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    statement = select(Post).where(Post.user_id != current_user["id"]).order_by(Post.created_at.desc())
    result = session.exec(statement).all()

    posts = (
        [p for (p,) in result] if result and isinstance(result[0], tuple) else result
    )

    return posts

from sqlalchemy import or_

@router.get("/filter-post", response_model=list[PostRead])
async def filter_all_post(
    query: str | None = None,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    if not query:
        return []

    statement = (
        select(Post)
        .where(
            or_(
                Post.title.ilike(f"%{query}%"),
                Post.content.ilike(f"%{query}%")
            )
        )
        .order_by(Post.created_at.desc())
    )

    result = session.exec(statement).all()
    return result

