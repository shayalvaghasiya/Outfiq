import uuid
from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, func, ForeignKey, JSON, Text, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class Generation(Base):
    __tablename__ = "generations"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("projects.id"), nullable=False, index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    parent_generation_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("generations.id"), nullable=True)
    generation_number: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    clothing_asset_ids: Mapped[list] = mapped_column(JSON, nullable=False)
    model_asset_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    background_asset_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    configuration: Mapped[dict] = mapped_column(JSON, nullable=False)
    prompt_version: Mapped[str] = mapped_column(String(50), nullable=False)
    prompt_snapshot: Mapped[dict] = mapped_column(JSON, nullable=True)
    provider: Mapped[str] = mapped_column(String(50), nullable=False)
    provider_generation_id: Mapped[str] = mapped_column(String(255), nullable=True)
    provider_seed: Mapped[int] = mapped_column(Integer, nullable=True)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="CREATED", index=True)
    output_image_key: Mapped[str] = mapped_column(String(500), nullable=True)
    output_image_url: Mapped[str] = mapped_column(String(1000), nullable=True)
    validation_score: Mapped[float] = mapped_column(Float, nullable=True)
    validation_result: Mapped[dict] = mapped_column(JSON, nullable=True)
    clothing_hash: Mapped[str] = mapped_column(String(64), nullable=True)
    model_hash: Mapped[str] = mapped_column(String(64), nullable=True)
    background_hash: Mapped[str] = mapped_column(String(64), nullable=True)
    configuration_hash: Mapped[str] = mapped_column(String(64), nullable=True)
    retry_count: Mapped[int] = mapped_column(Integer, default=0)
    max_retries: Mapped[int] = mapped_column(Integer, default=3)
    error_message: Mapped[str] = mapped_column(Text, nullable=True)
    is_approved: Mapped[bool] = mapped_column(Boolean, default=False)
    approved_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
