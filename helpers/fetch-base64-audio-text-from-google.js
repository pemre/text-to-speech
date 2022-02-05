const axios = require('axios');
const { CONFIG } = require('../config');
const {
  URL,
  AUDIO_ENCODING,
  AUDIO_PITCH,
  AUDIO_SPEAKING_RATE,
  VOICE_LANGUAGE_CODE,
  VOICE_NAME,
} = CONFIG.GOOGLE_CLOUD_TTS;

const fetchBase64AudioTextFromGoogle = (text, token) => {
  const url = URL + token;
  // See method: text.synthesize https://cloud.google.com/text-to-speech/docs/reference/rest/v1/text/synthesize
  const data = {
    audioConfig: {
      audioEncoding: AUDIO_ENCODING,
      pitch: AUDIO_PITCH,
      speakingRate: AUDIO_SPEAKING_RATE,
    },
    input: {
      text: text,
    },
    voice: {
      languageCode: VOICE_LANGUAGE_CODE,
      name: VOICE_NAME,
    },
  };

  return axios
    .post(url,data)
    .then((res) => {
      if (
        !res.hasOwnProperty('data') ||
        !res.data.hasOwnProperty('audioContent')
      ) {
        throw Error('Received no audioContent from Google.')
      }

      return res.data.audioContent;
    })
    .catch((error) => {
      throw Error(error);
    });
};

exports.fetchBase64AudioTextFromGoogle = fetchBase64AudioTextFromGoogle;
