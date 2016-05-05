// Deps
const parse = require('co-body');

// Models and queries
import { User, getUsers, getUserByQuery, postUser, putUser, deleteUser } from '../models/User';

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
    //  Currently for delete requests we need the UI to send the user's id in the request body
    // But in the future we can use the token as it will contain the information
    // About whether a user is an admin or not
    const request = yield parse(this.req);
    try {
      const user = yield getUser({id: request.userId });
      if (user.is_admin === true) {
        const result = yield deleteUser({id: this.params.id});
        this.status = 201;
        this.body = result;
      }
      else {
        throw 'Unauthorized user attempted to delete a a user'
      }
    }
    catch(err) {
      this.log.info(err);
      this.status = 403;
      this.body = {
        message: 'You are not authorized to delete a user.'
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
