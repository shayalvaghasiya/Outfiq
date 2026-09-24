import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, func, ForeignKey, JSON, Text, Float
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class Video(Base):
    __tablename__ = "videos"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    generation_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("generations.id"), nullable=False, index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    animation_type: Mapped[str] = mapped_column(String(100), nullable=False)
    configuration: Mapped[dict] = mapped_column(JSON, nullable=False)
    prompt_version: Mapped[str] = mapped_column(String(50), nullable=False)
    prompt_snapshot: Mapped[dict] = mapped_column(JSON, nullable=True)
    provider: Mapped[str] = mapped_column(String(50), nullable=False)
    provider_generation_id: Mapped[str] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="QUEUED", index=True)
    output_video_key: Mapped[str] = mapped_column(String(500), nullable=True)
    output_video_url: Mapped[str] = mapped_column(String(1000), nullable=True)
    validation_score: Mapped[float] = mapped_column(Float, nullable=True)
    validation_result: Mapped[dict] = mapped_column(JSON, nullable=True)
    error_message: Mapped[str] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
