const fs = require('fs');

const writeToFile = (filename, text) => {
  fs.writeFileSync(filename, text, (err) => {
    if (err) {
      throw Error(err);
    }
  });
};

exports.writeToFile = writeToFile;
