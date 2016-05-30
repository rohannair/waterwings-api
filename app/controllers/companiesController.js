// Deps
const ApiError = require('../utils/customErrors');

// Companies Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const companiesController = () => {
  return {
    GET: function* () {
      this.body = yield this.models.Company.query().getAll();
      this.status = 200;
    },

    POST: function* () {
      const result = yield this.models.Company.query().postCompany(this.request.body);
      this.status = 201;
      this.body = result;
    },

    PUT: function* () {
      const result = yield this.models.Company.query().putCompany(this.request.body, this.params.id);
      this.status = 200;
      this.body = result;
    },

    DELETE: function* () {
      throw new ApiError('Not Able to Delete', 403, 'User attempted to delete a company');
    }

  };
}

module.exports = companiesController;
