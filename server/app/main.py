from fastapi import FastAPI
from app.database import create_db_and_tables
from contextlib import asynccontextmanager
from app.middleware.limit_upload_size import LimitUploadSizeMiddleware
from app.routes.api.routers import router
from app.utils.coludinary import configure_cloudinary


@asynccontextmanager
async def lifespan(app:FastAPI):
    create_db_and_tables()
    configure_cloudinary()
    yield

app = FastAPI(lifespan=lifespan)



app.add_middleware(LimitUploadSizeMiddleware, max_upload_size=10 * 1024 * 1024)

app.include_router(router)

@app.get("/")
def start_up():
    return {"hello"}