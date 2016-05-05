// Deps
const parse = require('co-body');

// Models
import { Company, getCompany, postCompany, putCompany } from '../models/Company';
import { getUserByQuery } from '../models/User';

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
    // No one should be able to delete a company
    this.log.info('User attempted to delete a company');
    this.status = 403;
    this.body = {
      message: 'You are not authorized to delete a company.'
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
