from sqlmodel import SQLModel,create_engine,Session
from typing import Optional
from app.config import settings
from app.models.user import User

engine = create_engine(settings.DATABASE_URL, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session


