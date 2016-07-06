// Dependencies
const encrypt = require('../utils/encryption');
const token = require('../utils/token');
const ApiError = require('../utils/customErrors');
const googleAuth = require('../utils/auth/google');
const slackAuth = require('../utils/auth/slack');
const linkedInAuth = require('../utils/auth/linkedIn');

// Login Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const loginController = () => {
  return {
    LOGIN: function* () {
      // Find user in specific company
      const user = yield this.models.User.query().getUserwithPasswordByUsername(this.request.body.username);
      if(user.length === 0) throw new ApiError('Can not find a user with that username', 404, 'Cannot find a user with that username');

      // Use utility function to check a user's password and return a boolean
      const result = yield encrypt.checkPassword(this.request.body.password, user[0].password);
      if(result === false) throw new ApiError('Wrong Password', 401, 'Wrong Password');

      // If user has been succesfully authenticated return a token
      const new_token = yield token.genToken({userId: user[0].id, isAdmin: user[0].is_admin, companyId: user[0].company_id });
      this.status = 200;
      this.body = { token: new_token };
    },

    // 3rd Party Integrations

    GOOGLE_LOGIN: function* () {
      const url = yield googleAuth.urlGenerator(this.state.user.userId);
      this.status = 200;
      this.body = {
        message: url
      };
    },

    GOOGLE_AUTH_CODE: function* () {
      const token = yield googleAuth.getTokens(this.query.code);
      const result = yield this.models.User.query().putUser(
        {
          google_user_token: token.access_token,
          google_refresh_token: token.refresh_token,
          google_account_linked: true
        },
        this.query.state
      );
      const user = yield this.models.User.query().getUserById(this.query.state);
      this.status = 301;
      this.redirect(`http://${user.companyDomain}.${process.env.DOMAIN}/dashboard`);
    },


    LINKEDIN_LOGIN: function* () {
      const url = yield linkedInAuth.urlGenerator(this.state.user.userId);
      this.status = 200;
      this.body = {
        message: url
      };
    },

    LINKEDIN_AUTH_CODE: function* () {
      const token = yield linkedInAuth.getTokens(this.query.code);
      const result = yield this.models.User.query().putUser(
        {
          linkedin_user_token: token.access_token,
          linkedin_account_linked: true
        },
        this.query.state
      );
      const user = yield this.models.User.query().getUserById(this.query.state);
      this.status = 301;
      this.redirect(`http://${user.companyDomain}.${process.env.DOMAIN}/dashboard`);
    },

    SLACK_LOGIN: function* () {
      const url = yield slackAuth.urlGenerator(this.state.user.userId);
      this.status = 200;
      this.body = {
        message: url
      };
    },

    // TODO: Fix this up once we have a working slack bot
    SLACK_AUTH_CODE: function* () {
      const token = yield slackAuth.getTokens(this.request.body.authCode);
      const result = yield this.models.User.query().putUser({ slack_user_token: token.access_token, slack_account_linked: true }, this.request.body.userId);
      this.status = 201;
      this.body = {
        message: 'Slack Account Linked'
      };
    }

  }
}

module.exports = loginController;
