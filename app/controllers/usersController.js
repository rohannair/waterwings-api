// Deps
const chalk = require('chalk');
const parse = require('co-body');
const R     = require('ramda');

// Models
const User  = require('../models/Users.js');

// Controller
const usersController = (function() {

  function* GET() {
    const self = this;

    yield User
    .query()
    .where(this.query)
    .select(
      'id', 'email', 'first_name', 'last_name', 'isAdmin', 'company_id'
    )
    .then(function(resp) {
      console.log(chalk.green.bold('--- GET', JSON.stringify(resp, null, 4)));
      self.body = resp;
    });
  }

  function* PUT() {
    const self = this;

    const request = yield parse(this.req);
    const payload = R.merge(request, returnDate());

    yield User
    .query()
    .patch(payload)
    .where({ id: parseInt(this.params.id) })
    .then(function(model) {
      console.log(chalk.green.bold('--- PUT', JSON.stringify(model, null, 4)));
      self.body = model;
    });
  }

  function* POST() {
    const self = this;

    const request = yield parse(this.req);
    const payload = R.merge(request, returnDate());

    yield User
    .query()
    .insert(payload)
    .then(function(model) {
      console.log(chalk.green.bold('--- POST', JSON.stringify(model, null, 4)));

      self.status = 201;
      self.body = {
        id: model.id,
        email: model.email,
      };
    });
  }


  function* DELETE() {
    this.status = 401;
    this.body = 'Not allowed to DELETE User';
  }

  return {
    GET: GET,
    POST: POST,
    PUT: PUT,
    DELETE: DELETE
  };
})();

module.exports = usersController;

function returnDate() {
  // Parse payload
  return {
    created_at: new Date,
    updated_at: new Date
  };
}
