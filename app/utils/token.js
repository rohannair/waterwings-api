const jwt = require('jsonwebtoken');

// Utility function to create a jwt, accepts the user details to be included as the payload
function genToken(userDetails) {
  const playload = Object.assign({}, userDetails);
  return jwt.sign(
    // Payload
    payload,
    // Secret Key
    process.env.JWT_SECRET,
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
