from fastapi import HTTPException

class NotFoundError(HTTPException):
    def __init__(self, resource: str, id: str):
        super().__init__(status_code=404, detail=f"{resource} with id '{id}' not found")

class ForbiddenError(HTTPException):
    def __init__(self):
        super().__init__(status_code=403, detail="Access forbidden")

class ValidationError(HTTPException):
    def __init__(self, detail: str):
        super().__init__(status_code=422, detail=detail)

class GenerationError(Exception):
    def __init__(self, message: str, generation_id: str = None):
        self.message = message
        self.generation_id = generation_id
        super().__init__(message)

class FidelityError(Exception):
    def __init__(self, score: float, threshold: float, issues: list):
        self.score = score
        self.threshold = threshold
        self.issues = issues
        super().__init__(f"Fidelity score {score:.2f} below threshold {threshold:.2f}")

class ProviderError(Exception):
    def __init__(self, provider: str, message: str):
        self.provider = provider
        super().__init__(f"[{provider}] {message}")
