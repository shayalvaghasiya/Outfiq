from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List, Optional, Dict, Any

@dataclass
class ImageGenerationRequest:
    system_prompt: str
    user_prompt: str
    negative_prompt: str
    clothing_asset_urls: List[str]
    model_asset_url: str
    background_asset_url: str
    seed: Optional[int] = None
    config: Optional[Dict[str, Any]] = None

@dataclass
class ImageGenerationResult:
    provider_generation_id: str
    image_url: str
    image_data: bytes
    seed: Optional[int] = None
    metadata: Optional[Dict[str, Any]] = None

@dataclass
class VideoGenerationRequest:
    system_prompt: str
    animation_prompt: str
    source_image_url: str
    config: Optional[Dict[str, Any]] = None

@dataclass
class VideoGenerationResult:
    provider_generation_id: str
    video_url: str
    video_data: bytes
    metadata: Optional[Dict[str, Any]] = None

@dataclass
class ValidationRequest:
    generated_image_url: str
    clothing_reference_urls: List[str]
    model_reference_url: str
    background_reference_url: str

@dataclass
class ValidationResult:
    clothing_match: float
    model_match: float
    background_match: float
    overall_fidelity: float
    issues: List[str]
    passed: bool
    raw_response: Dict[str, Any]

class ImageProvider(ABC):
    @abstractmethod
    async def generate(self, request: ImageGenerationRequest) -> ImageGenerationResult:
        pass

    @abstractmethod
    async def validate(self, request: ValidationRequest) -> ValidationResult:
        pass

class VideoProvider(ABC):
    @abstractmethod
    async def generate(self, request: VideoGenerationRequest) -> VideoGenerationResult:
        pass

    @abstractmethod
    async def validate_video(self, video_url: str, source_image_url: str, config: dict) -> ValidationResult:
        pass
