from app.utils.prompt_templates import PROMPT_VERSIONS
from app.core.config import settings
from typing import Tuple, Dict, Any

class PromptService:
    def build_image_prompt(self, clothing_metadata: list, model_metadata: Dict, background_metadata: Dict, config: Dict) -> Tuple[str, str, str]:
        version_data = PROMPT_VERSIONS.get(settings.PROMPT_VERSION, PROMPT_VERSIONS["image_generation_v1"])
        system_prompt = version_data["system"]
        negative_prompt = version_data["negative"]
        
        user_prompt = "REFERENCE CLOTHING: {}\nMODEL: {}\nBACKGROUND: {}\nUSER CONFIGURATION: {}".format(
            clothing_metadata, model_metadata, background_metadata, config
        )
        return system_prompt, user_prompt, negative_prompt

    def build_video_prompt(self, animation_type: str, config: Dict) -> Tuple[str, str]:
        version_data = PROMPT_VERSIONS.get(settings.VIDEO_PROMPT_VERSION, PROMPT_VERSIONS["video_generation_v1"])
        return version_data["system"], f"Animation Type: {animation_type}\nConfig: {config}"
