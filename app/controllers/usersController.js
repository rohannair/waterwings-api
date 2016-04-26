// Deps
const chalk = require('chalk');
const parse = require('co-body');
const uuid = require('node-uuid');

// Models
const User  = require('../models/User.js');

// Controller
const usersController = (function() {

  function* GET() {
    const user = yield getUser(this.query);
    console.log(chalk.green.bold('--- GET', JSON.stringify(user, null, 4)));
    this.body = user;
  }

  function* PUT() {
    const request = yield parse(this.req);
    const model = yield putUser(request, this.params.id);
    console.log(chalk.green.bold('--- PUT', JSON.stringify(model, null, 4)));
    this.body = model;
  }

  function* POST() {
    const request = yield parse(this.req);
    const result = yield postUser(request);
    console.log(chalk.green.bold('--- POST', JSON.stringify(result, null, 4)));
    this.status = 201;
    this.body = {
      ...result
    };
  }

  function* DELETE() {
    this.status = 401;
    this.body = 'Not allowed to DELETE User';
  }

  function* PUT_RESULT() {
    const self = this;
    const body = yield parse(this.req);
    const payload = { survey_results: JSON.parse(JSON.stringify(body.survey_results)) };
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

function getUser(queryData) {
  return User
          .query()
          .where(queryData)
          .select(
            'users.id', 'users.username', 'users.first_name', 'users.last_name', 'users.is_admin'
          );

          //   , 'users.isAdmin', 'c.name as company_name', 'd.name as department_name'
          // )
          // .leftJoin('companies as c', 'users.company_id', 'c.id')
          // .where({'c.id': 1})
          // .leftJoin('departments as d', 'users.department_id', 'd.id')
          // .where({'d.company_id': 1})
}

function putUser(payload, userId) {
  return User
          .query()
          .patch(payload)
          .where({ id: userId });
}

function postUser(payload) {
  return User
          .query()
          .insert({ id: uuid.v4(), ...payload } )
          .then((model) => { return ({ message: 'User has been added'}) } )
          .catch((err) => {
            console.error(err);
            return { message: 'An Error has occured please try to add user again'};
          });
}
