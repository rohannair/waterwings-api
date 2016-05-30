// Deps
const ApiError = require('../utils/customErrors');

// Completed Playbook Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const completedPlaybooksController = () => {
  return {
    GET: function* () {
      this.body = yield this.models.CompletedPlaybook.query().getAll(this.state.user.companyId);
      this.status = 200;
    },

    POST: function* () {
      // TODO: Need to figure out how playbook results will be sent back to database
      this.log.info('--- INCOMING COMPLETED PLAYBOOK', JSON.stringify(this.request.body.results));
      const result = yield this.models.CompletedPlaybook.query().postCompletedPlaybook({ ...this.request.body.results, company_id: this.state.user.companyId });
      this.status = 201;
      this.body = result;
    },

    PUT: function* () {
      const result = yield this.models.CompletedPlaybook.query().putCompletedPlaybook(this.request.body, this.params.id);
      this.status = 200;
      this.body = result;
    },

    DELETE: function* () {
      const user = yield this.models.User.query().getUserById(this.request.body.userId);
      if(user[0].is_admin) {
        const result = yield this.models.CompletedPlaybook.query().putCompletedPlaybook({ deleted: true }, this.params.id);
        this.status = 201;
        this.body = result;
      }
      else {
        throw new ApiError('Not Able to Delete', 403, 'Unauthorized user attempted to delete a Completed Playbook');
      }
    }

  };
}

module.exports = completedPlaybooksController;
