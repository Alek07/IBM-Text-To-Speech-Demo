import os
from dotenv import load_dotenv
from ibm_watson import TextToSpeechV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

load_dotenv()


def text_to_speech_service() -> TextToSpeechV1:
    AUTH_API_KEY = os.getenv('TEXT_TO_SPEECH_API_KEY')
    SERVICES_URL = os.getenv('TEXT_TO_SPEECH_URL')

    authenticator = IAMAuthenticator(AUTH_API_KEY)
    text_to_speech = TextToSpeechV1(
        authenticator=authenticator
    )

    text_to_speech.set_service_url(SERVICES_URL)
    text_to_speech.set_disable_ssl_verification(True)

    return text_to_speech
