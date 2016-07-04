const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const ApiError = require('../customErrors');

function urlGenerator() {
  return new Promise((resolve, reject) => {
    const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_LOGIN_CALLBACK_URL);

    // generate a url that asks permissions for Google Calendar scopes
    // as we need we can increase the scope of the tokens
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
      scope: scopes
    });
    resolve(url);
  })
}

function getTokens(code) {
  return new Promise((resolve, reject) => {
    const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_LOGIN_CALLBACK_URL);
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
    const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_AUTH_CALLBACK_URL);
    // Insert users tokens into client
    resolve(oauth2Client.setCredentials(tokens));
  })
}

module.exports = {
  urlGenerator,
  getTokens,
  googleClient
}
