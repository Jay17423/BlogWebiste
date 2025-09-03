from fastapi import APIRouter
from app.routes.api.v1 import auth

router = APIRouter(prefix="/api/v1")


router.include_router(auth.router)
