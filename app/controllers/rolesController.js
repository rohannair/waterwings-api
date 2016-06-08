// Deps
const ApiError = require('../utils/customErrors');

// Roles Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const rolesController = () => {
  return {
    GET: function* () {
        this.body = yield this.models.Role.query().getAll(this.state.user.companyId);
        this.status = 200;
    },

    POST: function* () {
      const result = yield this.models.Role.query().postRole(Object.assign(this.request.body, {company_id: this.state.user.companyId}));
      this.status = 201;
      this.body = result;
    },

    PUT: function* () {
      const result = yield this.models.Role.query().putRole(this.request.body, this.params.id);
      this.status = 200;
      this.body = result;
    },

    DELETE: function* () {
      const result = yield this.models.Role.query().putRole({ deleted: true }, this.params.id);
      this.status = 201;
      this.body = {
        message: 'Role has been deleted'
      };
    }

  };
}

module.exports = rolesController;
