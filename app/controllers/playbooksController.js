// Playbooks Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const playbooksController = () => {
  return {
    GET: function* () {
      try {
        const result = yield this.models.Playbook.query().getAll(this.state.user.companyId);
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
        const result = yield this.models.Playbook.query().getPlaybookById(this.params.id);
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
      try {
        const result = yield this.models.Playbook.query().postPlaybook({ ...this.request.body, company_id: this.state.user.companyId });
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
      this.log.info(JSON.stringify(this.request.body));
      try {
        const result = yield this.models.Playbook.query().putPlaybook(this.request.body, this.params.id);
        this.status = 200;
        this.body = {
          result: result[0],
          message: 'Successfully updated playbook.'
        };
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
            const result = yield this.models.Playbook.query().putPlaybook({ deleted: true }, this.params.id);
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
        const playbookCopy = yield this.models.Playbook.query().duplicatePlaybook(this.request.body.id);
        const result = yield this.models.Playbook.query().postPlaybook(playbookCopy);
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
