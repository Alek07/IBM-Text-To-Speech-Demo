import os
import json
from fastapi import HTTPException
from dotenv import load_dotenv
from ibm_watson import LanguageTranslatorV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson import ApiException

load_dotenv()


def create_language_translate() -> LanguageTranslatorV3:
    AUTH_API_KEY = os.getenv('TRANSLATOR_API_KEY')
    SERVICES_URL = os.getenv('TRANSLATOR_URL')
    SERVICES_VERSION = os.getenv('TRANSLATOR_VERSION')

    authenticator = IAMAuthenticator(AUTH_API_KEY)
    language_translator = LanguageTranslatorV3(
        version=SERVICES_VERSION,
        authenticator=authenticator
    )

    language_translator.set_service_url(SERVICES_URL)

    language_translator.set_disable_ssl_verification(True)

    return language_translator


async def translate_text(text: str, model: str):
    translator = create_language_translate()
    words = []

    try:
        request = translator.translate(
            text=text, model_id=model).get_result()
    except ApiException as ex:
        raise HTTPException(status_code=ex.code, detail=ex.message)

    for translation in request['translations']:
        words.append(translation['translation'])

    return " ".join(words)
