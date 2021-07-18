from fastapi import APIRouter

from app.api.routes import text_to_speech

router = APIRouter()

router.include_router(text_to_speech.router, tags=["text to speech"], prefix="/text_to_speech")