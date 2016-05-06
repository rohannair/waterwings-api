// Deps
const parse      = require('co-body');
const isAdminCheck = require('./../utils/isAdminCheck');

// Controller
const playbooksController = (Playbook, User) => {
  return {

    GET: function* () {
      try {
        const result = yield Playbook.getPlaybook(this.query);
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

    GET_ONE: function* () {
      try {
        const result = yield Playbook.getPlaybook({ id: this.params.id });
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
    },

    POST: function* () {
      const request = yield parse(this.req);
      try {
        const result = yield Playbook.postPlaybook(request);
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
      this.log.info(JSON.stringify(request));
      try {
        const result = yield Playbook.putPlaybook(request, this.params.id);
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
          const result = yield Playbook.putPlaybook({ deleted: true }, this.params.id);
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
    },

    DUPLICATE: function* () {
      try {
        const request = yield parse(this.req);
        const result = yield Playbook.duplicatePlaybook({ id: request.id });
        this.status = 201;
        this.body = result;
      }
      catch(err) {
        this.log.info(err);
        this.status = 400;
        this.body = {
          message: 'An error has occured.'
        };
      }
    }

  };
}

module.exports = playbooksController;
