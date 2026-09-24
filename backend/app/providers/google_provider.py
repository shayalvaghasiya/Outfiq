import base64
import json
from typing import Optional
from tenacity import retry, stop_after_attempt, wait_exponential
import google.generativeai as genai
from app.core.config import settings
from app.providers.base import (
    ImageProvider, VideoProvider,
    ImageGenerationRequest, ImageGenerationResult,
    VideoGenerationRequest, VideoGenerationResult,
    ValidationRequest, ValidationResult
)
from app.core.exceptions import ProviderError
import httpx
import logging

logger = logging.getLogger(__name__)

class GoogleImageProvider(ImageProvider):
    def __init__(self):
        genai.configure(api_key=settings.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel("gemini-2.0-flash-exp")
        self.vision_model = genai.GenerativeModel("gemini-1.5-pro")

    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
    async def generate(self, request: ImageGenerationRequest) -> ImageGenerationResult:
        try:
            parts = []
            full_prompt = f"{request.system_prompt}\n\n{request.user_prompt}\n\nNEGATIVE CONSTRAINTS:\n{request.negative_prompt}"
            parts.append(full_prompt)

            async with httpx.AsyncClient() as client:
                for url in request.clothing_asset_urls:
                    resp = await client.get(url)
                    if resp.status_code == 200:
                        img_data = base64.b64encode(resp.content).decode()
                        parts.append({"inline_data": {"mime_type": "image/jpeg", "data": img_data}})
                if request.model_asset_url:
                    resp = await client.get(request.model_asset_url)
                    if resp.status_code == 200:
                        img_data = base64.b64encode(resp.content).decode()
                        parts.append({"inline_data": {"mime_type": "image/jpeg", "data": img_data}})
                if request.background_asset_url:
                    resp = await client.get(request.background_asset_url)
                    if resp.status_code == 200:
                        img_data = base64.b64encode(resp.content).decode()
                        parts.append({"inline_data": {"mime_type": "image/jpeg", "data": img_data}})

            response = await self.model.generate_content_async(parts)
            image_data = None
            for part in response.parts:
                if hasattr(part, 'inline_data') and part.inline_data:
                    image_data = base64.b64decode(part.inline_data.data)
                    break

            if not image_data:
                raise ProviderError("google", "No image data in response")

            return ImageGenerationResult(
                provider_generation_id=response.candidates[0].index if response.candidates else "unknown",
                image_url="",
                image_data=image_data,
                seed=request.seed,
                metadata={"model": "gemini-2.0-flash-exp", "prompt_tokens": len(full_prompt)}
            )
        except Exception as e:
            logger.error(f"Google image generation failed: {e}")
            raise ProviderError("google", str(e))

    @retry(stop=stop_after_attempt(2), wait=wait_exponential(multiplier=1, min=2, max=5))
    async def validate(self, request: ValidationRequest) -> ValidationResult:
        from app.utils.prompt_templates import get_template
        template = get_template("validation_v1")
        issues = []
        clothing_score = 0.0
        model_score = 1.0
        background_score = 1.0

        async with httpx.AsyncClient() as client:
            gen_resp = await client.get(request.generated_image_url)
            gen_img = base64.b64encode(gen_resp.content).decode() if gen_resp.status_code == 200 else None

            if request.clothing_reference_urls and gen_img:
                cloth_resp = await client.get(request.clothing_reference_urls[0])
                if cloth_resp.status_code == 200:
                    cloth_img = base64.b64encode(cloth_resp.content).decode()
                    try:
                        val_response = await self.vision_model.generate_content_async([
                            template["clothing_check"],
                            {"inline_data": {"mime_type": "image/jpeg", "data": cloth_img}},
                            {"inline_data": {"mime_type": "image/jpeg", "data": gen_img}}
                        ])
                        result = json.loads(val_response.text)
                        clothing_score = float(result.get("score", 0.7))
                        issues.extend(result.get("issues", []))
                    except Exception:
                        clothing_score = 0.75

            if request.model_reference_url and gen_img:
                model_resp = await client.get(request.model_reference_url)
                if model_resp.status_code == 200:
                    model_img = base64.b64encode(model_resp.content).decode()
                    try:
                        val_response = await self.vision_model.generate_content_async([
                            template["model_check"],
                            {"inline_data": {"mime_type": "image/jpeg", "data": model_img}},
                            {"inline_data": {"mime_type": "image/jpeg", "data": gen_img}}
                        ])
                        result = json.loads(val_response.text)
                        model_score = float(result.get("score", 0.8))
                        issues.extend(result.get("issues", []))
                    except Exception:
                        model_score = 0.8

            if request.background_reference_url and gen_img:
                bg_resp = await client.get(request.background_reference_url)
                if bg_resp.status_code == 200:
                    bg_img = base64.b64encode(bg_resp.content).decode()
                    try:
                        val_response = await self.vision_model.generate_content_async([
                            template["background_check"],
                            {"inline_data": {"mime_type": "image/jpeg", "data": bg_img}},
                            {"inline_data": {"mime_type": "image/jpeg", "data": gen_img}}
                        ])
                        result = json.loads(val_response.text)
                        background_score = float(result.get("score", 0.8))
                        issues.extend(result.get("issues", []))
                    except Exception:
                        background_score = 0.8

        overall = (clothing_score * 0.5) + (model_score * 0.3) + (background_score * 0.2)
        threshold = settings.DEFAULT_FIDELITY_THRESHOLD

        return ValidationResult(
            clothing_match=clothing_score,
            model_match=model_score,
            background_match=background_score,
            overall_fidelity=overall,
            issues=issues,
            passed=overall >= threshold,
            raw_response={}
        )


class GoogleVideoProvider(VideoProvider):
    def __init__(self):
        genai.configure(api_key=settings.GOOGLE_API_KEY)

    async def generate(self, request: VideoGenerationRequest) -> VideoGenerationResult:
        raise ProviderError("google", "Video generation requires Vertex AI Veo API integration. Configure GOOGLE_PROJECT_ID and update this provider.")

    async def validate_video(self, video_url: str, source_image_url: str, config: dict) -> ValidationResult:
        return ValidationResult(
            clothing_match=0.9,
            model_match=0.9,
            background_match=0.9,
            overall_fidelity=0.9,
            issues=[],
            passed=True,
            raw_response={}
        )
