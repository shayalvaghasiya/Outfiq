from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
import uuid
import hashlib

from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.models.asset import Asset
from app.schemas.asset import (
    AssetResponse, 
    AssetUploadResponse, 
    ClothingMetadata, 
    ClothingAnalysisResponse
)

router = APIRouter()

PRESET_MODELS = [
  {
    "id": "model_001",
    "name": "Elena Rostova",
    "gender": "Female",
    "aesthetic": "High Fashion Editorial",
    "thumbnail_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "model_002",
    "name": "Marcus Vance",
    "gender": "Male",
    "aesthetic": "Modern Streetwear",
    "thumbnail_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "model_003",
    "name": "Anya Chen",
    "gender": "Female",
    "aesthetic": "Minimalist Atelier",
    "thumbnail_url": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
  }
]

PRESET_BACKGROUNDS = [
  {
    "id": "bg_001",
    "name": "Parisian Haussmann Atelier",
    "category": "Studio",
    "lighting": "Soft Natural Daylight (5600K)",
    "image_url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    "id": "bg_002",
    "name": "Minimalist Concrete Loft",
    "category": "Minimal",
    "lighting": "Sculptural Key Light",
    "image_url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
  },
  {
    "id": "bg_003",
    "name": "Milan Fashion Week Runway",
    "category": "Runway",
    "lighting": "High Drama Spotlight",
    "image_url": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"
  }
]

@router.get("/", response_model=List[AssetResponse])
async def list_assets(
    asset_type: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = select(Asset).where(Asset.user_id == current_user.id)
    if asset_type:
        query = query.where(Asset.asset_type == asset_type)
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/upload", response_model=AssetUploadResponse)
async def upload_asset(
    file: UploadFile = File(...),
    asset_type: str = Form("clothing"),
    project_id: Optional[uuid.UUID] = Form(None),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    content = await file.read()
    content_hash = hashlib.sha256(content).hexdigest()
    storage_key = f"assets/{current_user.id}/{content_hash[:16]}_{file.filename}"
    storage_url = f"https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"

    asset = Asset(
        project_id=project_id,
        user_id=current_user.id,
        asset_type=asset_type,
        storage_key=storage_key,
        storage_url=storage_url,
        original_filename=file.filename,
        file_size=len(content),
        mime_type=file.content_type,
        content_hash=content_hash,
        metadata_json={
            "filename": file.filename,
            "locked": True
        }
    )
    db.add(asset)
    await db.commit()
    await db.refresh(asset)
    return asset

@router.post("/analyze-clothing", response_model=ClothingAnalysisResponse)
async def analyze_clothing(
    asset_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Simulated high-precision Gemini Vision clothing analysis
    item_analysis = ClothingMetadata(
        garment_type="Oversized Heavyweight Hoodie",
        color="Washed Charcoal Black (#212124)",
        pattern="Solid Matte Surface",
        texture="Brushed French Terry Cotton (450 GSM)",
        material="100% Cotton",
        logos=["White Minimal Typography at Center Left Chest"],
        visible_text=["OUTFIQ"],
        shape="Boxy Drop-Shoulder Relaxed Cut",
        sleeves="Long Sleeve with 2.5 inch Ribbed Cuffs",
        collar="Double-layer Structured Hood",
        pocket="Kangaroo Pouch with Reinforced Bar-tacks",
        additional_details="Coverstitched seams, unrolled cuffs"
    )

    return ClothingAnalysisResponse(
        asset_id=asset_id,
        detected_items=[item_analysis],
        analysis_confidence=0.992
    )

@router.get("/library/models")
async def get_model_library():
    return PRESET_MODELS

@router.get("/library/backgrounds")
async def get_background_library():
    return PRESET_BACKGROUNDS
