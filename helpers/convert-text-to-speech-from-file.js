const fs = require('fs');
const readline = require('readline');
const { convertTextToSpeech } = require('./convert-text-to-speech');
const { CONFIG } = require('../config');

const convertTextToSpeechFromFile = async ({
  inputFilename,
  token,
  outputFilename
}) => {
  if (typeof inputFilename !== 'string' || inputFilename === '') {
    throw Error('Missing or empty parameter: inputFilename.');
  }

  if (typeof token !== 'string' || token === '') {
    throw Error('Missing or empty parameter: token.');
  }

  if (typeof outputFilename !== 'string' || outputFilename === '') {
    throw Error('Missing or empty parameter: outputFilename.');
  }

  const TIMEOUT = CONFIG.TIMEOUT;
  const countLine = ((i = 0) => () => ++i)();

  const readInterface = readline.createInterface({
    input: fs.createReadStream(inputFilename),
    output: process.stdout,
    console: false,
    terminal: false,
  });

  readInterface.on('line', async (text, index = countLine()) => {
    // console.log(index + ') ' + text);
    await new Promise(resolve => setTimeout(resolve, TIMEOUT));
    await convertTextToSpeech({
      text,
      token,
      outputFilename: `${outputFilename} ${index} ${text.substring(0,20)}`
    });
    await new Promise(resolve => setTimeout(resolve, TIMEOUT));
  });
};

exports.convertTextToSpeechFromFile = convertTextToSpeechFromFile;
