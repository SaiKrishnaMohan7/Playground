#!/usr/bin/env node

/**
 * Compression in HTTP
 *
 * Trade off CPU load for payload size
 *
 * Client sets Accept-Encoding HTTP header to indicate what compression algo the server should use (gzip is the most common or brotli)
 *
 * The server replies with Content-Encoding set to the algorithm used by the server
 */

const zlib = require('zlib');
const http = require('http');
const fs = require('fs');

// Create server instance
const server = http.createServer((request, response) => {
  const raw = fs.createReadStream(__dirname + 'index.html');
  const acceptEncoding = request.headers['accept-encoding'] || '';

  response.setHeader('Content-Type', 'text/plain');
  console.log(acceptEncoding);

  if (acceptEncoding.includes('gzip')) {
    console.log('Encoding with gzip');
    response.setHeader('Content-Encoding', 'gzip');
    // Compress
    raw.pipe(zlib.createGzip()).pipe(response);
  } else {
    console.log('no encoding');
    raw.pipe(response)
  }
});

server.listen(process.env.PORT || 1337)