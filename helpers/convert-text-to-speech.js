const { CONFIG } = require('../config');

const convertTextToSpeech = async ({
  text,
  token,
  outputFilename
}) => {
  if (typeof text !== 'string' || text === '') {
    throw Error('Missing or empty parameter: text.');
  }

  if (typeof token !== 'string' || token === '') {
    throw Error('Missing or empty parameter: token.');
  }

  if (typeof outputFilename !== 'string' || outputFilename === '') {
    throw Error('Missing or empty parameter: outputFilename.');
  }

  try {
    const { convertBase64TextToBinary } = require('./convert-base64-text-to-binary');
    const { fetchBase64AudioTextFromGoogle } = require('./fetch-base64-audio-text-from-google');
    const { writeToFile } = require('./write-to-file');

    const base64AudioText = await fetchBase64AudioTextFromGoogle(text, token);
    const binary = convertBase64TextToBinary(base64AudioText);

    writeToFile(outputFilename + '.' + CONFIG.OUTPUT_EXTENSION, binary);

    console.log(`Converted text into audio file: ${outputFilename}.${CONFIG.OUTPUT_EXTENSION}`);
  } catch (err) {
    console.log(err.message);
  }
};

exports.convertTextToSpeech = convertTextToSpeech;
