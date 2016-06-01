// Deps
const ApiError = require('../utils/customErrors');

// Playbooks Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const playbooksController = () => {
  return {
    GET: function* () {
      this.body = yield this.models.Playbook.query().getAll(this.state.user.companyId);
      this.status = 200;
    },

    GET_ONE: function* () {
      const result = yield this.models.Playbook.query().getPlaybookById(this.params.id);
      this.status = 200;
      this.body = result[0];
    },

    POST: function* () {
      const result = yield this.models.Playbook.query().postPlaybook({ ...this.request.body, company_id: this.state.user.companyId });
      this.status = 201;
      this.body = result;
    },

    PUT: function* () {
      yield this.models.Playbook.query().putPlaybook(this.request.body, this.params.id);
      const result = yield this.models.Playbook.query().getPlaybookById(this.params.id);
      this.status = 200;
      this.body = {
        result: result[0],
        message: 'Successfully updated playbook.'
      };
    },

    DELETE: function* () {
      if(this.state.user.isAdmin) {
        const result = yield this.models.Playbook.query().putPlaybook({ deleted: true }, this.params.id);
        this.status = 201;
        this.body = {
          message: 'Playbook has been deleted'
        };
      }
      else {
        throw new ApiError('Not Able to Delete', 403, 'Unauthorized user attempted to delete a playbook');
      }
    },

    DUPLICATE: function* () {
      const playbookCopy = yield this.models.Playbook.query().duplicatePlaybook(this.request.body.id);
      const result = yield this.models.Playbook.query().postPlaybook(playbookCopy);
      this.status = 201;
      this.body = result;
    }
  };
}

module.exports = playbooksController;
