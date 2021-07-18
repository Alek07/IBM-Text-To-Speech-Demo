from pydantic import BaseModel


class Synthesize(BaseModel):
    text: str
    language: str
    voice: str
