from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from uuid import UUID
from datetime import datetime

class ReferenceLock(BaseModel):
    clothing: str = "locked"
    model: str = "locked"
    background: str = "locked"
    accessories: str = "not_allowed"
    creative_modifications: str = "not_allowed"

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class ProjectResponse(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    description: Optional[str] = None
    clothing_asset_ids: List[UUID] = []
    model_asset_id: Optional[UUID] = None
    background_asset_id: Optional[UUID] = None
    reference_lock: Dict[str, Any]
    is_archived: bool
    total_generations: int
    approved_count: int
    video_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProjectListResponse(BaseModel):
    items: List[ProjectResponse]
    total: int
