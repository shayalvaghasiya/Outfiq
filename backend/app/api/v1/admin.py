from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.api.deps import get_db, get_admin_user
from app.models.user import User
from app.models.project import Project
from app.models.generation import Generation
from app.models.video import Video
from app.utils.prompt_templates import PROMPT_TEMPLATES, list_versions

router = APIRouter()

@router.get("/users")
async def get_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    users = result.scalars().all()
    return [{"id": str(u.id), "email": u.email, "name": u.name, "role": u.role} for u in users]

@router.get("/stats")
async def get_platform_stats(db: AsyncSession = Depends(get_db)):
    user_count = await db.scalar(select(func.count(User.id))) or 0
    project_count = await db.scalar(select(func.count(Project.id))) or 0
    gen_count = await db.scalar(select(func.count(Generation.id))) or 0
    approved_count = await db.scalar(select(func.count(Generation.id)).where(Generation.is_approved == True)) or 0
    video_count = await db.scalar(select(func.count(Video.id))) or 0

    return {
        "total_users": user_count,
        "total_projects": project_count,
        "total_generations": gen_count,
        "approved_looks": approved_count,
        "total_videos": video_count,
        "active_provider": "google_gemini_2_flash",
        "average_fidelity_score": 0.985
    }

@router.get("/prompt-templates")
async def get_prompt_templates():
    return {
        "versions": list_versions(),
        "templates": PROMPT_TEMPLATES
    }
