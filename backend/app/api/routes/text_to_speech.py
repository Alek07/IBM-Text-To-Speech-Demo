import os
from fastapi import APIRouter, HTTPException
from ibm_watson import ApiException
from fastapi.responses import FileResponse
from app.api.models.Synthesize import Synthesize

from app.services.text_to_speech import text_to_speech_service
from app.services.language_translate import translate_text, create_language_translate

router = APIRouter()


@router.get("/voice_list")
def get_voices_list():
    text_to_speech = text_to_speech_service()

    try:
        request = text_to_speech.list_voices().get_result()
    except ApiException as ex:
        raise HTTPException(status_code=ex.code, detail=ex.message)

    return request


@router.get("/models_list")
def get_models_list():
    translator = create_language_translate()

    try:
        request = translator.list_models().get_result()
    except ApiException as ex:
        raise HTTPException(status_code=ex.code, detail=ex.message)

    return request


@router.post("/synthesize")
async def convert_text_to_speech(data: Synthesize):
    text_to_speech = text_to_speech_service()

    text = data.text
    model = 'es-' + data.language

    try:
        if data.language != 'es' and data.language != 'pt':
            translation = await translate_text(data.text, model)
            text = translation
        elif data.language == 'pt':
            en_translation = await translate_text(data.text, 'es-en')
            pt_translation = await translate_text(en_translation, 'en-pt')
            text = pt_translation

        res = text_to_speech.synthesize(
            text, accept="audio/mp3", voice=data.voice).get_result()

        if os.path.exists('assets/test3.mp3'):
            os.remove('assets/test3.mp3')

        audio_file = open('assets/test3.mp3', 'wb')
        audio_file.write(res.content)
        audio_file.close()

    except ApiException as ex:
        raise HTTPException(status_code=ex.code, detail=ex.message)

    return {"path": "/get_audio"}


@router.get("/get_audio")
def get_audio():
    return FileResponse('assets/test3.mp3')
