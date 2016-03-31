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
      'users.id', 'users.email', 'users.first_name', 'users.last_name', 'users.isAdmin', 'c.name as company_name', 'd.name as department_name'
    )
    .leftJoin('companies as c', 'users.company_id', 'c.id')
    .where({'c.id': 1})
    .leftJoin('departments as d', 'users.department_id', 'd.id')
    .where({'d.company_id': 1})
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

  function* PUT_RESULT() {
    const self = this;
    const body = yield parse(this.req);
    const payload = R.merge(
      {
        survey_results: JSON.parse(JSON.stringify(body.survey_results)),
      },
      returnDate(true)
    );

    console.log(chalk.cyan.bold('body:\n', JSON.stringify(payload, null, 4)), chalk.bgCyan('ID', body.id));

    yield User
    .query()
    .patchAndFetchById(body.id, payload)
    .then(function(model) {
      console.log(chalk.green.bold('--- POST', JSON.stringify(model, null, 4)));
      self.body = {
        message: model
      };
    });

  }

  return {
    GET       : GET,
    POST      : POST,
    PUT       : PUT,
    DELETE    : DELETE,
    PUT_RESULT: PUT_RESULT
  };
})();

module.exports = usersController;

function returnDate(update) {
  if (update) {
    return {
      updated_at: new Date,
    };
  }

  // Parse payload
  return {
    created_at: new Date,
    updated_at: new Date
  };
}
