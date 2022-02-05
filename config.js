const CONFIG = {
  // See demo page for options: https://cloud.google.com/text-to-speech#section-2
  GOOGLE_CLOUD_TTS: {
    URL: 'https://cxl-services.appspot.com/proxy?url=https://texttospeech.googleapis.com/v1beta1/text:synthesize&token=',
    AUDIO_ENCODING: 'LINEAR16',
    AUDIO_PITCH: 0,
    AUDIO_SPEAKING_RATE: 1,
    VOICE_LANGUAGE_CODE: 'en-US',
    VOICE_NAME: 'en-US-Wavenet-H',
  },
  OUTPUT_FILENAME: 'audio',
  OUTPUT_EXTENSION: 'wav',
  TIMEOUT: 1000, // In miliseconds
};

exports.CONFIG = CONFIG;
