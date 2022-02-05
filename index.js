const { convertTextToSpeech } = require('./helpers/convert-text-to-speech');
const { convertTextToSpeechFromFile } = require('./helpers/convert-text-to-speech-from-file');
const { CONFIG } = require('./config');
let { help, convert, input, output, token } = require('minimist')(process.argv.slice(2));

// Argument: help
if (help) {
  console.log('v0.1.0');
  console.log('text-to-speech: Converts given text or file to audio file(s) using Google Cloud Text-to-Speech.');
  console.log('');
  console.log('Arguments:');
  console.log('  --convert : (Required) Has two options: file | text');
  console.log('  --input   : (Required) Expects either a filename or a string depending on the convert argument.');
  console.log('  --output  : (Optional) Output filename without extension. Default: audio');
  console.log('  --token   : (Required) The demo token from Google demo page https://cloud.google.com/text-to-speech#section-2');
  console.log('                         You can use an .env file to not pass it as an argument.');
  console.log('                         Please see .env.example file.');
  console.log('');
  console.log('Example usages:');
  console.log('  node index.js --convert text --input "This is a sentence." --output sentence1 --token "YOUR_TOKEN"');
  console.log('  node index.js --convert text --input "This is a sentence." // If you use an .env file for the token');
  console.log('  node index.js --convert file --input example-sentences.txt --output sentence1 --token "YOUR_TOKEN"');
  console.log('');
  console.log('Please see README.md file or https://github.com/pemre/text-to-speech for more info.');
  return;
}

// Argument: convert
if (typeof convert !== 'string' || convert === '') {
  console.log('Missing or empty argument: convert.');
  return;
}

if (!(convert === 'file' || convert === 'text')) {
  console.log('Argument "convert" should either be "file" or "text". Received: \'' + convert + '\'.');
  return;
}

// Argument: input
if (typeof input !== 'string' || input === '') {
  console.log('Missing or empty argument: input.');
  return;
}

// Argument: output
const outputFilename = output || CONFIG.OUTPUT_FILENAME;

// Argument: token
if (typeof token !== 'string' || token === '') {
  require('dotenv').config();
  if (!process.env.hasOwnProperty('TOKEN') || process.env.TOKEN === '') {
    console.log('Missing or empty argument: token. Either pass it as an argument or via an .env file.');
    return;
  }
  token = process.env.TOKEN;
}

switch (convert) {
  case 'file':
    convertTextToSpeechFromFile({
      inputFilename: input,
      token,
      outputFilename
    });
    break;
  case 'text':
    convertTextToSpeech({
      text: input,
      token,
      outputFilename
    });
    break;
  default:
    throw Error('There is something wrong with this code.');
}
