process.env.UV_THREADPOOL_SIZE = 1;

const express = require('express');
const app = express();
const cluster = require('cluster');
const crypto = require('crypto');

if (cluster.isMaster) {
  // index.js is executed again but in as a child
  // all child instances work as normal express app
  // Every child has its own thread pool
  cluster.fork();
  cluster.fork();
} else {
  app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('root');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('Page loads fast');
  });
  
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}
