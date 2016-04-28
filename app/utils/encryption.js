const bcrypt = require('bcrypt');

// Async functon to encryt a password, given the password and a saltRound value
// A good default for saltRounds is 10
function encryptPassword(password, saltRounds) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if(err !== null) return reject(err);
      resolve(hash);
    });
  });
}

module.exports = encryptPassword;
