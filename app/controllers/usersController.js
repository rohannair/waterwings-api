// Deps
const encrypt = require('../utils/encryption');

// Users Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const usersController = () => {

  return {
    GET: function* () {
      try {
        const result = yield this.models.User.query().getAll(this.state.user.companyId);
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
      try {
        // TODO: Consider moving the password hashing into the model
        const hash = yield encrypt.encryptPassword(this.request.body.password);
        this.request.body.password = hash
        const newUser = yield this.models.User.query().postUser({ ...this.request.body, company_id: this.state.user.companyId });
        const result = yield this.models.User.query().getUserById(newUser.id, this.state.user.companyId);
        this.status = 201;
        this.body = result[0];
      }
      catch(err) {
        this.log.info(err);
        this.status = 400;
        this.body = {
          message: 'An error has occured, please try again.'
        };
      }
    },

    GET_ONE: function* () {
      try {
        const result = yield this.models.User.query().getUserById(this.params.id);
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

    PUT: function* () {
      try {
        const result = yield this.models.User.query().putUser(this.request.body, this.params.id);
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
        if(this.state.user.isAdmin) {
          const result = yield this.models.User.query().putUser({ deleted: true }, this.params.id);
          this.status = 201;
          this.body = {
            message: 'User has been deleted'
          };
        }
        else {
          throw 'Unauthorized user attempted to delete another user';
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
};

module.exports = usersController;
