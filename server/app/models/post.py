from datetime import datetime, timezone
from typing import TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from app.models.user import User  # only for type hints

def now_utc() -> datetime:
    return datetime.now(timezone.utc)

class Post(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(index=True, nullable=False)
    content: str = Field(nullable=False)

    user_id: int = Field(foreign_key="user.id", nullable=False)

    image_url: str | None = Field(default=None)

    created_at: datetime = Field(default_factory=now_utc, nullable=False)
    updated_at: datetime = Field(
        default_factory=now_utc,
        sa_column_kwargs={"onupdate": now_utc},
    )

    # forward reference
    user: "User" = Relationship(back_populates="posts")
