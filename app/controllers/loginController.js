// Dependencies
const bcrypt   = require('co-bcryptjs');
const bcryptjs = require('bcryptjs');
const co       = require('co');
const chalk    = require('chalk');
const jwt      = require('koa-jwt');
const parse    = require('co-body');
const R        = require('ramda');

// Models
// const Member   = require('../models/Members');

// Controller
const loginController = (function() {

  function* PUT() {
    const self    = this;
    const request = yield parse(this.req);
    const salt    = yield bcrypt.genSalt(10);
    const hash    = yield bcrypt.hash(request.password, salt);
    const payload = R.merge(request, {password: hash});

    yield Member
    .query()
    .insert(payload)
    .then(function(model) {
      console.log(chalk.green.bold('--- POST', JSON.stringify(model, null, 4)));
      self.body = {token: model.token};
    });
  }

  function* POST() {
    const self    = this;
    const request = yield parse(this.req);

    yield Member
    .query()
    .where('email', request.email)
    .then(function(response) {

      if (bcryptjs.compareSync(request.password, response[0].password)) {
        self.body = { token: jwt.sign(response[0], 'shared') };
      } else {
        self.status = 401;
        self.body = { status: 401, message: 'Wrong password' };
      }
    })
    .catch(function(err) {
      if (self.status === 404) {
        self.body = {
          message: 'Wrong username'
        };
      }
      console.log(chalk.red.bold(err));
    });
  }

  return {
    PUT: PUT,
    POST: POST,
  };
})();

module.exports = loginController;
