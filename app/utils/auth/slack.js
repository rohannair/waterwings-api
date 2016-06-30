// Functions to authenticate with Slack OAuth2 Scheme
const https = require('https');

function urlGenerator(userId) {
  return new Promise((resolve, reject) => {
    const url = `
                  https://slack.com/oauth/authorize?
                  client_id=${process.env.SLACK_CLIENT_ID}
                  &scope=${process.env.SLACK_SCOPE}
                  &redirect_uri=${process.env.SLACK_REDIRECT_URI}
                  &state=${userId}
                `
    resolve(url);
  })
}

function getTokens(code) {
  const url = `
                https://slack.com/api/oauth.access?
                client_id=${process.env.SLACK_CLIENT_ID}
                &client_secret=${process.env.SLACK_CLIENT_SECRET}
                &code=${code}
                $redirect_uri=${process.env.SLACK_REDIRECT_URI}
              `;

  return new Promise((resolve, reject) => {
    https.get( url, (res) => {
      res.on('data', (d) => {
        resolve(d);
      });

    }).on('error', (err) => {
      reject( new ApiError('Problem linking Slack Account', 500, err));
    });
  })
}

module.exports = {
  urlGenerator,
  getTokens
}
