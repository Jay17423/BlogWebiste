
from fastapi import APIRouter
from httpx import post
from app.routes.api.v1 import auth
from app.routes.api.v1 import post

router = APIRouter(prefix="/api/v1")


router.include_router(auth.router)
router.include_router(post.router)
