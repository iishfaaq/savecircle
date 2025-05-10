from google.cloud import texttospeech

def synthesize_speech(text, lang_code="en-US"):
    client = texttospeech.TextToSpeechClient()
    input_text = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(language_code=lang_code)
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
    response = client.synthesize_speech(input=input_text, voice=voice, audio_config=audio_config)
    path = "output.mp3"
    with open(path, "wb") as out:
        out.write(response.audio_content)
    return path
