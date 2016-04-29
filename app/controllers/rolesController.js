// Deps
const chalk = require('chalk');
const parse = require('co-body');

// Models and queries
import { Role, getRole, postRole, putRole, deleteRole } from '../models/Role';
import { getUser } from '../models/User';

// Controller
const rolesController = (function() {

  function* GET() {
    try {
      const result = yield getRole(this.query);
      console.log(chalk.green.bold('--- GET', JSON.stringify(result, null, 4)));
      this.status = 200;
      this.body = result;
    }
    catch(err) {
      console.error(chalk.red.bold('--- GET', JSON.stringify(err, null, 4)));
      this.status = 400;
      this.body = {
        mesage: 'An error has occured, please try again.'
      };
    }
  }

  function* POST() {
    const request = yield parse(this.req);
    try {
      const result = yield postRole(request);
      console.log(chalk.green.bold('--- POST', JSON.stringify(result, null, 4)));
      this.status = 201;
      this.body = result;
    }
    catch(err) {
      console.error(chalk.red.bold('--- POST', JSON.stringify(err, null, 4)));
      this.status = 400;
      this.body = {
        message: 'An error has occured, please try again.'
      };
    }
  }

  function* PUT() {
    const request = yield parse(this.req);
    try {
      const result = yield putRole(request, this.params.id);
      console.log(chalk.green.bold('--- PUT', JSON.stringify(result, null, 4)));
      this.status = 200;
      this.body = result;
    }
    catch(err) {
      console.error(chalk.red.bold('--- PUT', JSON.stringify(err, null, 4)));
      this.status = 400;
      this.body = {
        message: 'An error has occured, please try again.'
      };
    }
  }

  function* DELETE() {
    // TODO: Need to determine how we will pass in the id of the role to be deleted
    try {
      // TODO: need to check if user is an admin here. I can query them based on their ID,
      // which will be contained in the JSON web token
      const user = yield getUser( {id: 'Something'} );
      if (user.is_admin === true) {
        const result = yield deleteRole('id of role to be deleted');
        console.log(chalk.green.bold('--- DELETE', JSON.stringify(result, null, 4)));
        this.status = 201;
        this.body = result;
      }
      else {
        throw 'Unauthorized user attempted to delete a role'
      }
    }
    catch(err) {
      console.error(chalk.red.bold('--- DELETE', JSON.stringify(err, null, 4)));
      this.status = 403;
      this.body = {
        message: 'You are not authorized to delete a role.'
      };
    };
  }

  return {
    GET         : GET,
    POST        : POST,
    PUT         : PUT,
    DELETE      : DELETE
  };
})();

module.exports = rolesController;