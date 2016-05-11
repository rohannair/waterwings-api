// Dependencies
const co       = require('co');
const chalk    = require('chalk');
const parse    = require('co-body');
const encrypt = require('../utils/encryption');
const genToken = require('../utils/token');

// Controller
const loginController = (function() {

// Not used as now we are assuming that an admin will be placed into the database by us
// And then they will login. No users/admins will be able to register themselves at this point
  // function* REGISTER() {
  //   const self    = this;
  //   const request = yield parse(this.req);
  //   const salt    = yield bcrypt.genSalt(10);
  //
  //   const hash    = yield bcrypt.hash(request.password, salt);
  //   const payload = { ...request, password: hash };
  //
  //   yield this.models.User
  //   .query()
  //   .insert(payload)
  //   .then(function(model) {
  //     console.log(chalk.green.bold('--- POST', JSON.stringify(model, null, 4)));
  //     self.body = {token: model.token};
  //   });
  // }

  function* LOGIN() {
    try {
      const user = yield this.models.User.query().getUserwithPasswordByUsername(this.request.body.username);
      if(user.length === 0) throw { status: 404, message: 'Can not find a user with that username'};

      // Use utility function to check a user's password and return a boolean
      const result = yield encrypt.checkPassword(this.request.body.password, user[0].password);
      if(result === false) throw { status: 401, message: 'Wrong password'};
      console.log(result);
      // If user has been succesfully authenticated return a token
      const token = genToken({userId: user[0].id, isAdmin: user[0].is_admin, companyId: user[0].company_id });
      this.status = 200;
      this.body = token;
    }
    catch(err) {
      this.log.info(err);
      this.status = err.status;
      this.body = err.message;
    }
  }

  return {
    // REGISTER: REGISTER,
    LOGIN: LOGIN
  };
})();

module.exports = loginController;
