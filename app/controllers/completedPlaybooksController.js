// Deps
const parse = require('co-body');

// Model
import { CompletedPlaybook, getCompletedPlaybook, postCompletedPlaybook, putCompletedPlaybook } from '../models/CompletedPlaybook';
import { getUser } from '../models/User';

// Controller
const completedPlaybooksController = (function() {

  function* GET() {
    try {
      const result = yield getCompletedPlaybook(this.query);
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
    // TODO: Need to figure out how playbook results will be sent back to database
    const payload = request.results;
    this.log.info('--- INCOMING REQUEST BODY', JSON.stringify(payload));
    try {
      const result = yield postCompletedPlaybook(payload);
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
      const result = yield putCompletedPlaybook(request, this.params.id);
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
    // TODO: Need to determine how we will pass in the id of the competed playbook to be deleted
    try {
      // TODO: need to check if user is an admin here. I can query them based on their ID,
      // which will be contained in the JSON web token
      const user = yield getUser( {id: 'Something'} );
      if (user.is_admin === true) {
        const result = yield deleteCompletedPlaybook('id of CompletedPlaybook to be deleted');
        this.status = 201;
        this.body = result;
      }
      else {
        throw 'Unauthorized user attempted to delete a completed playbook'
      }
    }
    catch(err) {
      this.log.info(err);
      this.status = 403;
      this.body = {
        message: 'You are not authorized to delete a completed playbook.'
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

module.exports = completedPlaybooksController;
