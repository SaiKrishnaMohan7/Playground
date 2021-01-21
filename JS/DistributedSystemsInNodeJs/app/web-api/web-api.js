#!/usr/bin/env node

/** Web API
 *
 * Faces the outside world
*/

const server = require('fastify');
const fetch = require('node-fetch');

const HOST = process.env.HOST || '127.0.0.1' // localhost
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || 'locahost:4000';

// Initialize server
const app = server();

server.get('/', async () => {
  const req = await fetch(`http://${TARGET}/recipes/42`);
  const producerData = await req.json();

  return {
    consumerId: process.pid,
    producerData,
  };
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Consuer service (Web API) running at http://${HOST}:${PORT}`);
});

/**
 * Talking to a service that has https enabled
 *
 * const options = {
  agent: new https.Agent({
    ca: fs.readFileSync(__dirname + 'shared/tls/self-signed_basic-certificate.cert'),
  })
};
 * server.get('/', async () => {
  const req = await fetch(`http://${TARGET}/recipes/42`, options);
  const producerData = await req.json();

  return {
    consumerId: process.pid,
    producerData,
  };
});
 */
