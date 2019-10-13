process.env.UV_THREADPOOL_SIZE = 5;

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

// For making network calls node intefaces with libuv that inturn interface with the lower level OS APIs to fire off the request
// https module doesn't use the threadPool
function doReq() {
  https.request('https://www.google.com', res => {
    // res is a low level object that emits events as we receive data and not the whole repsonse object
  
    res.on('data', () => {});
  
    res.on('end', () => {
      console.log(Date.now() - start);
    });
  }).end();
}

// Crypto and FS use thread pool
function doHash() {
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log(`Hash: ${Date.now() - start}`);
});
}

doReq();

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS:', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();