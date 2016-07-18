const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const ApiError = require('../customErrors');
const https = require('https');

// Create Google Auth Client
const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_AUTH_CALLBACK_URL);

// Set the auth client for all future requests
// Need to see if these are useful or if I need a new client on each request for a user
// google.options({ auth: oauth2Client });


function urlGenerator(userId = '') {
  return new Promise((resolve, reject) => {
    // generate a url that asks permissions for Google Calendar scopes
    // as we need we can increase the scope of the tokens
    const scopes = [
      // OAuth2 User Profile information
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      // Gmail
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.modify',
      'https://www.googleapis.com/auth/gmail.compose',
      // Google Calendar
      'https://www.googleapis.com/auth/calendar'
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
      scope: scopes,
      state: userId
    });
    resolve(url);
  })
}

function getTokens(code) {
  return new Promise((resolve, reject) => {
    const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_AUTH_CALLBACK_URL);
    oauth2Client.getToken(code, function(err, tokens) {
      if(err) reject( new ApiError('Google Auth Error', 500, err));
      resolve(tokens);
      }
    );
  });
}

function googleClient(tokens) {
  return new Promise((resolve, reject) => {
    // Create a new Oauth client
    // Insert users tokens into client
    resolve(oauth2Client.setCredentials(tokens));
  })
}

function getUserGoogleInfo(token) {

  let options = {
    hostname: 'googleapis.com',
    path: '/oauth2/v2/userinfo',
    method: 'GET',
    headers: {
      'Content-length': '0',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  return new Promise(function(resolve, reject) {
    https.request( options, (res) => {
      res.on('data', (d) =>  { resolve(JSON.parse(d)) } );
    }).on('error', (err) => { reject( new ApiError('Problem connecting to Google', 500, err)) });
  });
}

module.exports = {
  urlGenerator,
  getTokens,
  googleClient,
  getUserGoogleInfo
}
