// Deps
const parse = require('co-body');

// Models and queries
import { User, getUser, postUser, putUser, deleteUser } from '../models/User';

// Controller
const usersController = (function() {

  function* GET() {
    try {
      const result = yield getUser(this.query);
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
      const newUser = yield getUser(result.id)
      this.status = 201;
      this.body = newUser;
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
    // TODO: Need to determine how we will pass in the id of the user to be deleted
    try {
      // TODO: need to check if user is an admin here. I can query them based on their ID,
      // which will be contained in the JSON web token
      const user = yield getUser( {id: 'Something'} );
      if (user.is_admin === true) {
        const result = yield deleteUser('id of user to be deleted');
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
        message: 'You are not authorized to delete a user.'
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

module.exports = usersController;
