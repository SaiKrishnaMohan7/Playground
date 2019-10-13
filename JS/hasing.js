const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const brcrypt = require('bcrypt');

// Hashing
let pass = 'abc123';
let salt = brcrypt.genSalt(10, (err, salt) => {
  brcrypt.hash(pass, salt, (err, hash) => {
    saveHashToDb(hash);
  });
});

let hashedPass = 'someHahedPass';

// if cb omitted Promise returned
brcrypt.compare(pass, hashedPass, (err, res) => {
  // Login user
});
// Hashing
var data = {
  id: 10
};

var token = jwt.sign(data, '123abc'); //hashing with salt
console.log(token);

var decoded = jwt.verify(token, '123abc'); //verify hash
console.log('decoded', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Do not trust!');
// }
