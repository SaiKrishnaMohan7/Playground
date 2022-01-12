#!/usr/bin/env node

/** Recipe API
 *
 * This is an internal service. Not exposed to the outside world
*/

const server = require('fastify');

const HOST = process.env.HOST || '127.0.0.1' // localhost
const PORT = process.env.PORT || 4000;

const app = server();
console.log(`worker pid=${process.pid}`);

app.get('recipes/:id', async (req, reply) => {
  console.log(`worker request pid=${process.pid}`);

  const id = Number(req.params.pid);

  if (id !== 42) {
    reply.statusCode = 404;

    return { error: 'not_found' };
  }

  return {
    producer_pid: process.pid,
    steps: 'Mic it all togehter...',
    recipe: {
      id: 42,
      name: 'Thair Saadam',
      ingredeints: [
        {
          id: 1,
          name: 'Rice',
          quantity: '1 cup',
        },
        {
          id: 2,
          name: 'Dahi',
          quantity: '2 cups',
        },
        {
          id: 3,
          name: 'Onion',
          quantity: '.5',
        }
      ]
    }
  };
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Prducer service (Recipe) running at http://${HOST}:${PORT}`);
});

/**
 * Configure TLS, https
 * NOTE: This should never be handled by the app server, this should be done by a Reverse Proxy as it is CPU intensive
 *
 * const app = server({
  https: {
    key: fs.readFileSync(__dirname + '/tls/self-signed_basic-key.key'),
    cert: fs.readFileSync(__dirname + 'shared/tls/self-signed_basic-certificate.cert')
  }
});
 *
 *
 * The command in the book did not work, Chap2: Protocols, pg 29-30
 * used this:
 *
 * for private key: openssl genrsa -out self-signed_basic-key.key 2048
 * for cert: openssl req -new -x509 -key self-signed_basic-key.key -out self-signed_basic-certificate.cert -days 365
 */
