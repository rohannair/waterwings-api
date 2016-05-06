// Deps
const parse = require('co-body');

// Models and queries
import { User, getUsers, getUserByQuery, postUser, putUser } from '../models/User';

const isAdminCheck = require('./../utils/isAdminCheck');

// Controller
const usersController = (function() {

  function* GET() {
    try {
      const result = yield getUsers();
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
      const result = yield getUserByQuery(this.params.id);
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
      const result = yield postUser(request);
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
      const result = yield putUser(request, this.params.id);
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
        const result = yield putUser({ deleted: true }, this.params.id);
        this.status = 201;
        this.body = result;
      }
      else {
        throw 'Unauthorized user attempted to delete another user'
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
    GET_ONE     : GET_ONE,
    POST        : POST,
    PUT         : PUT,
    DELETE      : DELETE
  };
})();

module.exports = usersController;
