// Deps
const parse = require('co-body');

// Controller
const companiesController = (Company, User) => {
  return {

    GET: function* () {
      try {
        const result = yield Company.getCompany(this.query);
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
    },

    POST: function* () {
      const request = yield parse(this.req);
      try {
        const result = yield Company.postCompany(request);
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
    },

    PUT: function* () {
      const request = yield parse(this.req);
      try {
        const result = yield Company.putCompany(request, this.params.id);
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
    },

    DELETE: function* () {
      // No one should be able to delete a company
      this.log.info('User attempted to delete a company');
      this.status = 403;
      this.body = {
        message: 'Not Able to Delete'
      };
    }

  };
}

module.exports = companiesController;
