// Deps
const chalk = require('chalk');
const parse = require('co-body');

// Model
import { CompletedSurvey, getCompletedSurvey, postCompletedSurvey, putCompletedSurvey } from '../models/CompletedSurvey';
import { getUser } from '../models/User';

// Controller
const completedSurveysController = (function() {

  function* GET() {
    try {
      const result = yield getCompletedSurvey(this.query);
      console.log(chalk.green.bold('--- GET', JSON.stringify(result, null, 4)));
      this.status = 200;
      this.body = result;
    }
    catch(err) {
      console.error(chalk.red.bold('--- POST', JSON.stringify(err, null, 4)));
      this.status = 400;
      this.body = {
        mesage: 'An error has occured, please try again.'
      };
    }
  }

  function* POST() {
    const request = yield parse(this.req);
    // TODO: Need to figure out how survey results will be sent back to database
    const payload = { survey_results: JSON.parse(JSON.stringify(request.survey_results)) };
    console.log(chalk.cyan.bold('body:\n', JSON.stringify(payload, null, 4)));
    try {
      const result = yield postCompletedSurvey(payload);
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
      const result = yield putCompletedSurvey(request, this.params.id);
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
    // TODO: Need to determine how we will pass in the id of the competed survey to be deleted
    try {
      // TODO: need to check if user is an admin here. I can query them based on their ID,
      // which will be contained in the JSON web token
      const user = yield getUser( {id: 'Something'} );
      if (user.is_admin === true) {
        const result = yield deleteCompletedSurvey('userid of user to be deleted');
        console.log(chalk.green.bold('--- DELETE', JSON.stringify(result, null, 4)));
        this.status = 201;
        this.body = result;
      }
      else {
        throw 'Unauthorized user attempted to delete a completed survey'
      }
    }
    catch(err) {
      console.error(chalk.red.bold('--- DELETE', JSON.stringify(err, null, 4)));
      this.status = 403;
      this.body = {
        message: 'You are not authorized to delete a completed survey.'
      };
    };
  }

  return {
    GET  : GET,
    POST : POST,
    PUT  : PUT,
    DELETE : DELETE
  };
})();

module.exports = completedSurveysController;
