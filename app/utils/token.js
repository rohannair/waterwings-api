const jwt      = require('jsonwebtoken');
// Secret key contained in the config files
const config = require('../config/app.js');

// Utility function to create a jwt, accepts the user details to be included as the payload
function genToken(userDetails) {
  return jwt.sign({ ...userDetails }, 'shared');
}

module.exports = genToken;
