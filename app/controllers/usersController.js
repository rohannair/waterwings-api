// Deps
const chalk   = require('chalk');
const parse   = require('co-body');
const R       = require('ramda');

// Methods
const usersController = function() {

  function* GET() {
    const result = yield this.pg.db.client.query_('SELECT id, first_name, last_name, email, phone_number, company_id, package_id, is_admin FROM users');
    this.body = result.rows;
  }

  function* POST() {
    // Parse payload
    let payload = yield parse(this.req);

    // Build response
    console.log(payload);

    // Return response
    this.body = 'POST Users';
  }

  // Create a new user
  function* PUT() {

    // Parse payload
    let payload = yield parse(this.req);



    console.log(chalk.blue(this.vals));
    // DB.dosomething
    this.body = 'PUT Users';
  }

  function* DELETE() {
    this.status = 401;
    this.body = 'DELETE Users';
  }

  return {
    GET: GET,
    POST: POST,
    PUT: PUT,
    DELETE: DELETE
  };
};

module.exports = usersController;

function validateFields(required, payload) {
  let response = {};

  required.forEach(function(requiredValue) {
    if (!R.has(requiredValue)(payload)) {
      response = {
        error: true,
        message: requiredValue + ' is a required field'
      };
    }
  });

  return response;
}
