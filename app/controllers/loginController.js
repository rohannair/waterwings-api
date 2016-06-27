// Dependencies
const encrypt = require('../utils/encryption');
const token = require('../utils/token');
const ApiError = require('../utils/customErrors');
const googleAuth = require('../utils/auth/google');



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

    GOOGLE_LOGIN: function* () {
      const googleUrl = yield googleAuth.urlGenerator(this.state.user.userId);
      this.status = 200;
      this.body = {
        message: googleUrl
      };
    },

    GOOGLE_AUTH_CODE: function* () {
      const { userId, authCode } = this.request.body
      // I know have the user's Id and So I Can add there google id to the database as well as the tokens
      const user = yield this.models.User.query().getUserwithPasswordById(userId);
      const userTokens = yield googleAuth.getTokens(authCode);
      const result = yield this.models.User.query().putUser({ google_user_token: userTokens.access_token }, userId);
      this.status = 201;
      this.body = {
        message: 'Google Account Linked'
      };
    }

  }
}

module.exports = loginController;
