// Deps
const parse      = require('co-body');

// Models
import { Playbook, getPlaybook, postPlaybook, putPlaybook, deletePlaybook, duplicatePlaybook } from '../models/Playbook';
import { getUser } from '../models/User';

// Controller
const playbooksController = (function() {

  function* GET() {
    try {
      const result = yield getPlaybook(this.query);
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

  function* GET_ONE() {
    try {
      const result = yield getPlaybook({ id: this.params.id });
      this.status = 200;
      this.body = result[0];
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
    try {
      const result = yield postPlaybook(request);
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
    this.log.info(JSON.stringify(request));
    try {
      const result = yield putPlaybook(request, this.params.id);
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
    // TODO: Need to determine how we will pass in the id of the playbook to be deleted
    try {
      // TODO: need to check if user is an admin here. I can query them based on their ID,
      // which will be contained in the JSON web token
      const user = yield getUser( {id: 'Something'} );
      if (user.is_admin === true) {
        const result = yield deletePlaybook('id of playbook to be deleted');
        this.status = 201;
        this.body = result;
      }
      else {
        throw 'Unauthorized user attempted to delete a playbook'
      }
    }
    catch(err) {
      this.log.info(err);
      this.status = 403;
      this.body = {
        message: 'You are not authorized to delete a playbook.'
      };
    };

  }

  function* DUPLICATE() {
    try {
      const request = yield parse(this.req);
      const result = yield duplicatePlaybook({ id: request.id });
      this.status = 201;
      this.body = result;
    }
    catch(err) {
      this.log.info(err);
      this.status = 400;
      this.body = {
        message: 'An error has occured.'
      };
    };
  }

  return {
    GET       : GET,
    GET_ONE   : GET_ONE,
    POST      : POST,
    PUT       : PUT,
    DELETE    : DELETE,
    DUPLICATE : DUPLICATE
  };

})();

module.exports = playbooksController;
