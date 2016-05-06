// Deps
const parse = require('co-body');
const isAdminCheck = require('./../utils/isAdminCheck');

// Controller
const rolesController = (Role, User) => {
  return {
    GET: function* () {
      try {
        const result = yield Role.getRole(this.query);
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
        const result = yield Role.postRole(request);
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
        const result = yield Role.putRole(request, this.params.id);
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
      const request = yield parse(this.req);
      try {
        const userIsAdmin = yield isAdminCheck(request.userId);
        if (userIsAdmin) {
          const result = yield Role.putRole({ deleted: true }, this.params.id);
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

  };
}

module.exports = rolesController;
