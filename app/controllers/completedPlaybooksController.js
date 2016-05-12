// Completed Playbook Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const completedPlaybooksController = () => {
  return {
    GET: function* () {
      try {
        const result = yield this.models.CompletedPlaybook.query().getAll();
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
      // TODO: Need to figure out how playbook results will be sent back to database
      this.log.info('--- INCOMING REQUEST BODY', JSON.stringify(this.request.body.results));
      try {
        const result = yield this.models.CompletedPlaybook.query().postCompletedPlaybook(this.request.body.results);
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
      try {
        const result = yield this.models.CompletedPlaybook.query().putCompletedPlaybook(this.request.body, this.params.id);
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
      try {
        const user = yield this.models.User.query().getUserById(this.request.body.userId);
        if(user[0].is_admin) {
          const result = yield this.models.CompletedPlaybook.query().putCompletedPlaybook({ deleted: true }, this.params.id);
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
