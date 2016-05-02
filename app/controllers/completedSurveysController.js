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
      this.status = 200;
      this.body = result;
    }
    catch(err) {
      this.log.info(err);
      this.status = 400;
      this.body = {
        mesage: 'An error has occured, please try again.'
      };
    }
  }

  function* POST() {
    const request = yield parse(this.req);
    // TODO: Need to figure out how survey results will be sent back to database
    const payload = request.results;
    console.log(chalk.cyan.bold('--- INCOMING REQUEST BODY', JSON.stringify(payload, null, 4)));
    try {
      const result = yield postCompletedSurvey(payload);
      this.status = 201;
      this.body = result;
    }
    catch(err) {
      this.log.info(err);
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
      this.status = 200;
      this.body = result;
    }
    catch(err) {
      this.log.info(err);
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
        this.status = 201;
        this.body = result;
      }
      else {
        throw 'Unauthorized user attempted to delete a completed survey'
      }
    }
    catch(err) {
      this.log.info(err);
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
