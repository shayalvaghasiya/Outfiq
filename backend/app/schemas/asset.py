from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict
from uuid import UUID
from datetime import datetime

class ClothingMetadata(BaseModel):
    garment_type: str
    color: str
    pattern: str
    texture: str
    material: str
    logos: Optional[str] = None
    visible_text: Optional[str] = None
    shape: str
    sleeves: Optional[str] = None
    collar: Optional[str] = None
    pocket: Optional[str] = None
    additional_details: Optional[str] = None
    user_corrected_description: Optional[str] = None

class ModelMetadata(BaseModel):
    name: str
    gender: str
    skin_tone: Optional[str] = None
    hair_color: Optional[str] = None
    body_type: Optional[str] = None
    reference_images: List[str] = []

class BackgroundMetadata(BaseModel):
    name: str
    category: str
    description: Optional[str] = None

class AssetUploadResponse(BaseModel):
    id: UUID
    asset_type: str
    storage_url: str
    thumbnail_url: Optional[str] = None
    metadata_json: Dict[str, Any]
    content_hash: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class AssetResponse(BaseModel):
    id: UUID
    project_id: Optional[UUID] = None
    user_id: UUID
    asset_type: str
    storage_url: str
    thumbnail_url: Optional[str] = None
    original_filename: Optional[str] = None
    metadata_json: Dict[str, Any]
    is_library_item: bool
    created_at: datetime

    class Config:
        from_attributes = True

class ClothingAnalysisResponse(BaseModel):
    asset_id: UUID
    detected_items: List[ClothingMetadata]
    analysis_confidence: float
