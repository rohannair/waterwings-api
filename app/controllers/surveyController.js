// Deps
const chalk      = require('chalk');
const parse      = require('co-body');

// Models
import { Survey, getSurvey, postSurvey, putSurvey, deleteSurvey } from '../models/Survey';
import { getUser } from '../models/User';

// Controller
const surveysController = (function() {

  function* GET() {
    try {
      const result = yield getSurvey(this.query);
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

  function* GET_ONE() {
    try {
      const result = yield getSurvey({ id: this.params.id });
      console.log(chalk.green.bold('--- GET_ONE', JSON.stringify(result, null, 4)));
      this.status = 200;
      this.body = result[0];
    }
    catch(err) {
      console.error(chalk.red.bold('--- GET_ONE', JSON.stringify(err, null, 4)));
      this.status = 400;
      this.body = {
        mesage: 'An error has occured, please try again.'
      };
    }
  }

  function* POST() {
    const request = yield parse(this.req);
    try {
      const result = yield postSurvey(request);
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
    console.log(chalk.blue.bold(JSON.stringify(request, null, 4)));
    try {
      const result = yield putSurvey(request, this.params.id);
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
    // TODO: Need to determine how we will pass in the id of the survey to be deleted
    try {
      // TODO: need to check if user is an admin here. I can query them based on their ID,
      // which will be contained in the JSON web token
      const user = yield getUser( {id: 'Something'} );
      if (user.is_admin === true) {
        const result = yield deleteSurvey('id of survey to be deleted');
        console.log(chalk.green.bold('--- DELETE', JSON.stringify(result, null, 4)));
        this.status = 201;
        this.body = result;
      }
      else {
        throw 'Unauthorized user attempted to delete a survey'
      }
    }
    catch(err) {
      console.error(chalk.red.bold('--- DELETE', JSON.stringify(err, null, 4)));
      this.status = 403;
      this.body = {
        message: 'You are not authorized to delete a survey.'
      };
    };

  }

  return {
    GET       : GET,
    GET_ONE   : GET_ONE,
    POST      : POST,
    PUT       : PUT,
    DELETE    : DELETE
  };

})();

module.exports = surveysController;
