from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from uuid import UUID
from datetime import datetime

class VideoConfig(BaseModel):
    animation_type: str
    duration_seconds: int = 8
    camera_mode: str = "fixed"
    movement: str = "subtle"
    motion_intensity: str = "low"
    clothing_fidelity: str = 'maximum'
    face_fidelity: str = 'maximum'
    background_locked: bool = True
    output_format: str = 'mp4'

class VideoCreate(BaseModel):
    generation_id: UUID
    configuration: VideoConfig

class VideoValidationResult(BaseModel):
    frame_consistency: float
    clothing_consistency: float
    model_consistency: float
    logo_consistency: float
    color_consistency: float
    issues: List[str]
    passed: bool

class VideoResponse(BaseModel):
    id: UUID
    generation_id: UUID
    animation_type: str
    configuration: Dict[str, Any]
    provider: str
    status: str
    output_video_url: Optional[str] = None
    validation_score: Optional[float] = None
    validation_result: Optional[VideoValidationResult] = None
    created_at: datetime

    class Config:
        from_attributes = True
