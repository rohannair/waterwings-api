// Deps
const parse      = require('co-body');

// Models
import { Playbook, getPlaybook, postPlaybook, putPlaybook, duplicatePlaybook } from '../models/Playbook';
import { getUserByQuery } from '../models/User';

const isAdminCheck = require('./../utils/isAdminCheck');

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
    const request = yield parse(this.req);
    try {
      const userIsAdmin = yield isAdminCheck(request.userId);
      if (userIsAdmin) {
        const result = yield putPlaybook({ deleted: true }, this.params.id);
        this.status = 201;
        this.body = result;
      }
      else {
        throw 'Unauthorized user attempted to delete a a playbook'
      }
    }
    catch(err) {
      this.log.info(err);
      this.status = 403;
      this.body = {
        message: 'Not Able to Delete'
      };
    }
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
