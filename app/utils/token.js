const jwt      = require('jsonwebtoken');
// Secret key contained in the config files
const config = require('../config/app.js');

// Utility function to create a jwt, accepts the user details to be included as the payload
function genToken(userDetails) {
  return jwt.sign(
    // Payload
    { ...userDetails },
    // Secret Key
    'shared',
    { algorithm: 'HS256'}
    // TODO: Fill in the rest of these options
    // { expiresIn: "2 days"},
    // {notBefore: '1 days'},
    // {audience: } ,
    // {issuer: } ,
    // {jwtid: } ,
    // {subject: } ,
    // {header: }
  );
}

// TODO: add a JWT verify function

module.exports = genToken;
