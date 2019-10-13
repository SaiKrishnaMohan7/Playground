const https = require('https');

const start = Date.now();

// For making network calls node intefaces with libuv that inturn interface with the lower level OS APIs to fire off the request
function doReq() {
  https.request('https://www.google.com', res => {
    // res is a low level object that emits events as we receive data and not the whole repsonse object
  
    res.on('data', () => {});
  
    res.on('end', () => {
      console.log(Date.now() - start);
    });
  }).end();
}

doReq();

doReq();