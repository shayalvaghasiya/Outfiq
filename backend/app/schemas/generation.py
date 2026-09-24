from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from uuid import UUID
from datetime import datetime
from app.schemas.asset import AssetResponse

class GenerationConfig(BaseModel):
    pose: str
    camera: str
    aspect_ratio: str
    lighting: str
    fidelity: str
    creativity: str = 'locked'
    background_mode: str
    strict_mode: bool = True

class GenerationCreate(BaseModel):
    project_id: UUID
    clothing_asset_ids: List[UUID]
    model_asset_id: UUID
    background_asset_id: UUID
    configuration: GenerationConfig
    strict_mode: bool = True

class ValidationResult(BaseModel):
    clothing_match: float
    model_match: float
    background_match: float
    overall_fidelity: float
    issues: List[str]
    passed: bool

class GenerationResponse(BaseModel):
    id: UUID
    project_id: UUID
    status: str
    configuration: Dict[str, Any]
    provider: str
    output_image_url: Optional[str] = None
    validation_score: Optional[float] = None
    validation_result: Optional[ValidationResult] = None
    is_approved: bool
    retry_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class GenerationVariationCreate(BaseModel):
    base_generation_id: UUID
    variation: Dict[str, Any]

class ComparisonData(BaseModel):
    generation: GenerationResponse
    clothing_references: List[AssetResponse]
    model_reference: AssetResponse
    background_reference: AssetResponse
    validation_result: ValidationResult
