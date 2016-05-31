// Deps
const encrypt = require('../utils/encryption');
const ApiError = require('../utils/customErrors');

// Users Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const usersController = () => {

  return {
    GET: function* () {
      this.body = yield this.models.User.query().getAll(this.state.user.companyId);
      this.status = 200;
    },

    POST: function* () {
      // TODO: Consider moving the password hashing into the model
      const hash = yield encrypt.encryptPassword(this.request.body.password);
      this.request.body.password = hash
      const newUser = yield this.models.User.query().postUser({ ...this.request.body, company_id: this.state.user.companyId });
      const result = yield this.models.User.query().getUserById(newUser.id, this.state.user.companyId);
      this.status = 201;
      this.body = result;
    },

    GET_ONE: function* () {
      const result = yield this.models.User.query().getUserById(this.params.id, this.state.user.companyId);
      this.status = 200;
      this.body = result;
    },

    PUT: function* () {
      const updatedUser = yield this.models.User.query().putUser(this.request.body, this.params.id);
      const result = yield this.models.User.query().getUserById(this.params.id, this.state.user.companyId);
      this.status = 200;
      this.body = result;
    },

    DELETE: function* () {
      if(this.state.user.isAdmin) {
        const result = yield this.models.User.query().putUser({ deleted: true }, this.params.id);
        this.status = 201;
        this.body = {
          message: 'User has been deleted'
        };
      }
      else {
        throw new ApiError('Not Able to Delete', 403, 'Unauthorized user attempted to delete another user');
      }
    }

  };
};

module.exports = usersController;
