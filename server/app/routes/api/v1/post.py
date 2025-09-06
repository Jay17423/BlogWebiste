# app/routers/post.py


from fastapi import APIRouter, Depends, Form, File, HTTPException, UploadFile
from sqlalchemy import Select
from sqlmodel import Session, select
from app.database import get_session # Assuming you have this
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

@router.get("/my-posts", response_model=list[PostRead])
async def get_my_posts(
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user)
):
    statement = select(Post).where(Post.user_id == current_user["id"])
    result = session.exec(statement).all()

    posts = [p for (p,) in result] if result and isinstance(result[0], tuple) else result

    return posts 

@router.patch("/{id}", response_model=PostRead)
def partial_update_post(
    id: int, 
    post: PostUpdate,
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user)
):
    db_post = session.exec(select(Post).where(Post.id == id)).first()
    
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if db_post.user_id != current_user["id"]:
        raise HTTPException(status_code=403, detail="Not allowed to update this post")

    if post.title is not None:
        db_post.title = post.title
    if post.content is not None:
        db_post.content = post.content
    if post.image_url is not None:
        db_post.image_url = post.image_url

    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post