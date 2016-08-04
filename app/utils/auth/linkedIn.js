// Functions to authenticate with LinkedIn OAuth2 Scheme
const querystring = require('querystring');
const ApiError = require('../customErrors');
const fetch = require('isomorphic-fetch');
const fetchHelpers = require('./../http-helpers');

function urlGenerator(userId) {
  return new Promise((resolve, reject) => {
    const url = `
                  https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&state=${userId}
                `
    resolve(url);
  })
}

function getTokens(code) {

  const formData = querystring.stringify({
    'grant_type' : 'authorization_code',
    'code' : code,
    'redirect_uri' : process.env.LINKEDIN_REDIRECT_URI,
    'client_id' : process.env.LINKEDIN_CLIENT_ID,
    'client_secret' : process.env.LINKEDIN_CLIENT_SECRET
  });

  return fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(formData),
      },
      body: formData
    })
    .then(fetchHelpers.checkStatus)
    .then(fetchHelpers.parseJSON)
    .then(res => res)
    .catch(err => new ApiError('Problem connecting to LinkedIn', 500, err) );
}

module.exports = {
  urlGenerator,
  getTokens
}
