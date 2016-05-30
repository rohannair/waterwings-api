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
      const result = yield this.models.Role.query().postRole({ ...this.request.body, company_id: this.state.user.companyId });
      this.status = 201;
      this.body = result;
    },

    PUT: function* () {
      const result = yield this.models.Role.query().putRole(this.request.body, this.params.id);
      this.status = 200;
      this.body = result;
    },

    DELETE: function* () {
      const user = yield this.models.User.query().getUserById(this.request.body.userId);
      if(user[0].is_admin) {
        const result = yield this.models.Role.query().putRole({ deleted: true }, this.params.id);
        this.status = 201;
        this.body = result;
      }
      else {
        throw new ApiError('Not Able to Delete', 403, 'Unauthorized user attempted to delete a role');
      }
    }

  };
}

module.exports = rolesController;
