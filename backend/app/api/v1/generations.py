from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
import uuid
import datetime

from app.api.deps import get_db, get_current_user
from app.models.user import User
from app.models.generation import Generation
from app.models.project import Project
from app.schemas.generation import (
    GenerationCreate, 
    GenerationResponse, 
    ValidationResult,
    GenerationVariationCreate
)
from app.services.generation_service import generation_service

router = APIRouter()

@router.post("/", response_model=GenerationResponse, status_code=status.HTTP_202_ACCEPTED)
async def create_generation(
    gen_in: GenerationCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    generation = await generation_service.create_generation(
        project_id=gen_in.project_id,
        user_id=current_user.id,
        request_data=gen_in,
        db=db
    )
    return generation

@router.get("/{generation_id}", response_model=GenerationResponse)
async def get_generation(
    generation_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = select(Generation).where(Generation.id == generation_id)
    result = await db.execute(query)
    gen = result.scalar_one_or_none()
    if not gen:
        raise HTTPException(status_code=404, detail="Generation not found")
    return gen

@router.post("/{generation_id}/approve", response_model=GenerationResponse)
async def approve_generation(
    generation_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    gen = await generation_service.approve_generation(
        generation_id=generation_id,
        user_id=current_user.id,
        db=db
    )
    return gen

@router.post("/{generation_id}/retry", response_model=GenerationResponse)
async def retry_generation(
    generation_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    gen = await generation_service.retry_generation(
        generation_id=generation_id,
        db=db
    )
    return gen

@router.get("/{generation_id}/comparison")
async def get_comparison_data(
    generation_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = select(Generation).where(Generation.id == generation_id)
    result = await db.execute(query)
    gen = result.scalar_one_or_none()
    if not gen:
        raise HTTPException(status_code=404, detail="Generation not found")

    return {
        "generation_id": str(gen.id),
        "status": gen.status,
        "output_image_url": gen.output_image_url,
        "validation_score": gen.validation_score,
        "validation_result": gen.validation_result,
        "clothing_hash": gen.clothing_hash,
        "model_hash": gen.model_hash,
        "background_hash": gen.background_hash,
        "seed": gen.provider_seed
    }
