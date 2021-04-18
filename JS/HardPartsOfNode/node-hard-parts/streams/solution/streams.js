/*
  Copy over to streams.js to test
*/

const fs = require('fs');
const through = require('through2');

const readPoemStream = fs.createReadStream('on-joy-and-sorrow-emoji.txt');
const writePoemStream = fs.createWriteStream('on-joy-and-sorrow-fixed.txt');

function write(buffer, encoding, next) {
  let text = buffer.toString()
  text = text.replace(/:\)/gi, 'joy');
  text = text.replace(/:\(/gi, 'sorrow');
  this.push(text);
  next();
}

const transformStream = through(write);

readPoemStream.pipe(transformStream).pipe(writePoemStream);