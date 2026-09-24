import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, func, ForeignKey, JSON, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class Project(Base):
    __tablename__ = "projects"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    clothing_asset_ids: Mapped[list] = mapped_column(JSON, default=list)
    model_asset_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=True)
    background_asset_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=True)
    reference_lock: Mapped[dict] = mapped_column(JSON, default=lambda: {
        "clothing": "locked",
        "model": "locked",
        "background": "locked",
        "accessories": "not_allowed",
        "creative_modifications": "not_allowed"
    })
    is_archived: Mapped[bool] = mapped_column(Boolean, default=False)
    total_generations: Mapped[int] = mapped_column(Integer, default=0)
    approved_count: Mapped[int] = mapped_column(Integer, default=0)
    video_count: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
