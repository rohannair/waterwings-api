// Deps
const parse = require('co-body');

// Models
import { Company, getCompany, postCompany, putCompany, deleteCompany } from '../models/Company';
import { getUser } from '../models/User';

// Controller
const companiesController = (function() {

  function* GET() {
    try {
      const result = yield getCompany(this.query);
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
      const result = yield postCompany(request);
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
      const result = yield putCompany(request, this.params.id);
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
      //  Currently for delete requests we need the UI to send the user's id in the request body
      // But in the future we can use the token as it will contain the information
      // About whether a user is an admin or not
      const user = yield getUser({id: request.userId });
      if (user.is_admin === true) {
        const result = yield deleteCompany({id: this.params.id});
        this.status = 201;
        this.body = result;
      }
      else {
        throw 'Unauthorized user attempted to delete a company'
      }
    }
    catch(err) {
      this.log.info(err);
      this.status = 403;
      this.body = {
        message: 'You are not authorized to delete a company.'
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

module.exports = companiesController;
