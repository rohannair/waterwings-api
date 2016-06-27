const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const ApiError = require('../customErrors');

function urlGenerator(userId) {
  return new Promise((resolve, reject) => {

    const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_AUTH_CALLBACK_URL);

    // generate a url that asks permissions for Google+ and Google Calendar scopes
    const scopes = [
      'https://www.googleapis.com/auth/calendar'
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
      scope: scopes, // If you only need one scope you can pass it as string
      state: userId
    });
    resolve(url);
  })
}

function getTokens(code) {
  console.log('Here with token', code);
  return new Promise((resolve, reject) => {
    console.log(code);
    const oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_AUTH_CALLBACK_URL);
    oauth2Client.getToken(code, function(err, tokens) {
      console.log('Got user tokens', tokens);
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
