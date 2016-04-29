// Deps
const chalk = require('chalk');
const parse = require('co-body');

// Models
import { Company, getCompany, postCompany, putCompany, deleteCompany } from '../models/Company';
import { getUser } from '../models/User';

// Controller
const companiesController = (function() {

  function* GET() {
    try {
      const result = yield getCompany(this.query);
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
      const result = yield postCompany(request);
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
      const result = yield putCompany(request, this.params.id);
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
    // TODO: Need to determine who can delete companies
    try {
      // TODO: need to check if user is an admin here. I can query them based on their ID,
      // which will be contained in the JSON web token
      const user = yield getUser( {id: 'Something'} );
      if (user.is_admin === true) {
        const result = yield deleteCompany('id of company to be deleted');
        console.log(chalk.green.bold('--- DELETE', JSON.stringify(result, null, 4)));
        this.status = 201;
        this.body = result;
      }
      else {
        throw 'Unauthorized user attempted to delete a company'
      }
    }
    catch(err) {
      console.error(chalk.red.bold('--- DELETE', JSON.stringify(err, null, 4)));
      this.status = 403;
      this.body = {
        message: 'You are not authorized to delete a company.'
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

module.exports = companiesController;
