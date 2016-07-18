// Functions to authenticate with LinkedIn OAuth2 Scheme
const https = require('https');
const querystring = require('querystring');
const ApiError = require('../customErrors');

function urlGenerator(userId) {
  return new Promise((resolve, reject) => {
    const url = `
                  https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&state=${userId}
                `
    resolve(url);
  })
}

function getTokens(code) {

  const payload = querystring.stringify({
    'grant_type' : 'authorization_code',
    'code' : code,
    'redirect_uri' : process.env.LINKEDIN_REDIRECT_URI,
    'client_id' : process.env.LINKEDIN_CLIENT_ID,
    'client_secret' : process.env.LINKEDIN_CLIENT_SECRET
  });

  const options = {
    hostname: 'www.linkedin.com',
    path: '/oauth/v2/accessToken',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (data) => {
        resolve(JSON.parse(data));
      });
      res.on('end', () => {
      })
    });

    req.on('error', (err) => {
      reject( new ApiError('Error accessing Linked In', 500, err));
    })

    req.write(payload);
    req.end();
  })
}

module.exports = {
  urlGenerator,
  getTokens
}
