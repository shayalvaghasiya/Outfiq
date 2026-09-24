from app.providers.base import ImageProvider, ValidationRequest, ValidationResult
from app.models.generation import Generation

class ValidationService:
    def __init__(self, provider: ImageProvider):
        self.provider = provider

    async def validate_image(self, generation: Generation, assets: dict) -> ValidationResult:
        request = ValidationRequest(
            generation_id=str(generation.id),
            generated_image_url=generation.output_image_url,
            clothing_reference_urls=[],
            clothing_metadata=[],
            model_reference_url=None,
            background_reference_url=None,
            configuration=generation.configuration
        )
        return await self.provider.validate(request)
