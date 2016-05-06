// Deps
const parse = require('co-body');

// Models and queries
import { Role, getRole, postRole, putRole } from '../models/Role';
import { getUserByQuery } from '../models/User';

const isAdminCheck = require('./../utils/isAdminCheck');

// Controller
const rolesController = (function() {

  function* GET() {
    try {
      const result = yield getRole(this.query);
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
    try {
      const result = yield postRole(request);
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
      const result = yield putRole(request, this.params.id);
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
        const result = yield putRole({ deleted: true }, this.params.id);
        this.status = 201;
        this.body = result;
      }
      else {
        throw 'Unauthorized user attempted to delete a a role'
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

  return {
    GET         : GET,
    POST        : POST,
    PUT         : PUT,
    DELETE      : DELETE
  };
})();

module.exports = rolesController;
