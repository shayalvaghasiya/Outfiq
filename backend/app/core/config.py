from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "AI Fashion Studio"
    DEBUG: bool = False
    API_V1_PREFIX: str = "/api/v1"
    SECRET_KEY: str = "dev-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30
    DATABASE_URL: str = "postgresql+asyncpg://fashion_user:fashion_pass@localhost:5432/fashion_studio"
    REDIS_URL: str = "redis://localhost:6379/0"
    S3_ENDPOINT_URL: str = "http://localhost:9000"
    S3_ACCESS_KEY_ID: str = "minioadmin"
    S3_SECRET_ACCESS_KEY: str = "minioadmin"
    S3_BUCKET_NAME: str = "fashion-studio"
    S3_REGION: str = "us-east-1"
    GOOGLE_API_KEY: str = ""
    GOOGLE_PROJECT_ID: str = ""
    GOOGLE_LOCATION: str = "us-central1"
    ACTIVE_IMAGE_PROVIDER: str = "google"
    ACTIVE_VIDEO_PROVIDER: str = "google"
    DEFAULT_FIDELITY_THRESHOLD: float = 0.85
    MAX_RETRY_ATTEMPTS: int = 3
    STRICT_MODE_DEFAULT: bool = True
    PROMPT_VERSION: str = "image_generation_v1"
    VIDEO_PROMPT_VERSION: str = "video_generation_v1"
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:3001"]

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
