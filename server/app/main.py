from fastapi import FastAPI
from app.database import create_db_and_tables
from contextlib import asynccontextmanager
from app.routes.api.routers import router

@asynccontextmanager
async def lifespan(app:FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(router)

@app.get("/")
def start_up():
    return {"hello"}