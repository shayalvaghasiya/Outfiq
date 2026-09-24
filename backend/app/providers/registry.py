from app.providers.base import ImageProvider, VideoProvider
from app.providers.google_provider import GoogleImageProvider, GoogleVideoProvider
from app.core.config import settings

_image_providers = {
    "google": GoogleImageProvider,
}

_video_providers = {
    "google": GoogleVideoProvider,
}

def get_image_provider() -> ImageProvider:
    provider_class = _image_providers.get(settings.ACTIVE_IMAGE_PROVIDER)
    if not provider_class:
        raise ValueError(f"Unknown image provider: {settings.ACTIVE_IMAGE_PROVIDER}")
    return provider_class()

def get_video_provider() -> VideoProvider:
    provider_class = _video_providers.get(settings.ACTIVE_VIDEO_PROVIDER)
    if not provider_class:
        raise ValueError(f"Unknown video provider: {settings.ACTIVE_VIDEO_PROVIDER}")
    return provider_class()

def register_image_provider(name: str, provider_class: type):
    _image_providers[name] = provider_class

def register_video_provider(name: str, provider_class: type):
    _video_providers[name] = provider_class
