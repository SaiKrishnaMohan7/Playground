process.env.UV_THREADPOOL_SIZE = 5;
const crypto = require('crypto');

const start = Date.now();

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log(`Frist Now: ${Date.now() - start}`);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log(`Second Now: ${Date.now() - start}`);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log(`Third Now: ${Date.now() - start}`);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log(`Fourth Now: ${Date.now() - start}`);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log(`Fifth Now: ${Date.now() - start}`);
});