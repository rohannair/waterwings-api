const ApiError = require('./customErrors');
const jwt = require('jsonwebtoken');

// Function to generate a JWT, with the user details to be included as the payload
function genToken(userDetails) {
  return new Promise((resolve, reject) => {
    jwt.sign(Object.assign({}, userDetails), process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: 5184000,
        audience: 'user',
        issuer: 'qrtrmstr',
        subject: 'user-token'
      },
      (err, decoded) => {
        if(err) reject(new ApiError('Error with JWT', 400, err));
        resolve (decoded);
    });
  })
}

// Function to verify an incoming JWT
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        audience: 'user',
        issuer: 'qrtrmstr',
        subject: 'user-token',
        clockTolerance: 60
     },
     (err, decoded) => {
       if(err) reject (new ApiError('Error with JWT', 400, err));
       resolve(decoded);
    });
  })
}

module.exports = {
  genToken: genToken,
  verifyToken: verifyToken
}
