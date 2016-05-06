// Deps
const parse = require('co-body');
const isAdminCheck = require('./../utils/isAdminCheck');

// Controller
const completedPlaybooksController = (CompletedPlaybook, User) => {
  return {
    GET: function* () {
      try {
        const result = yield CompletedPlaybook.getCompletedPlaybook(this.query);
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
      // TODO: Need to figure out how playbook results will be sent back to database
      const payload = request.results;
      this.log.info('--- INCOMING REQUEST BODY', JSON.stringify(payload));
      try {
        const result = yield CompletedPlaybook.postCompletedPlaybook(payload);
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
        const result = yield CompletedPlaybook.putCompletedPlaybook(request, this.params.id);
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
          const result = yield CompletedPlaybook.putCompletedPlaybook({ deleted: true }, this.params.id);
          this.status = 201;
          this.body = result;
        }
        else {
          throw 'Unauthorized user attempted to delete a a Completed Playbook'
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

module.exports = completedPlaybooksController;
