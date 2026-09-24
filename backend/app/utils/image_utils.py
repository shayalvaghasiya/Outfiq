import hashlib
import io
from PIL import Image

def compute_file_hash(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def create_thumbnail(image_data: bytes, max_size: tuple = (400, 400)) -> bytes:
    with Image.open(io.BytesIO(image_data)) as img:
        img.thumbnail(max_size, Image.Resampling.LANCZOS)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        output = io.BytesIO()
        img.save(output, format="JPEG", quality=85)
        return output.getvalue()

def get_image_dimensions(image_data: bytes) -> tuple[int, int]:
    with Image.open(io.BytesIO(image_data)) as img:
        return img.size  # (width, height)

def validate_image_format(data: bytes, allowed_types: list = None) -> str:
    if allowed_types is None:
        allowed_types = ["JPEG", "PNG", "WEBP"]
    with Image.open(io.BytesIO(data)) as img:
        if img.format not in allowed_types:
            raise ValueError(f"Unsupported image format: {img.format}")
        return img.format
