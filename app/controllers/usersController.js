// Deps
const encrypt = require('../utils/encryption');
const bcrypt = require('bcrypt');

// Users Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const usersController = () => {

  return {
    GET: function* () {
      try {
        const result = yield this.models.User.query().getAll();
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

    POST: function* () {
      try {
        // TODO: Consider moving the password hashing into the model
        const request = this.request.body;
        const hash = yield encrypt.encryptPassword(request.password);
        request.password = hash
        const result = yield this.models.User.query().postUser(request);
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
        const user = yield this.models.User.query().getUserById(this.request.body.userId);
        if(user[0].is_admin) {
          const result = yield this.models.User.query().putUser({ deleted: true }, this.params.id);
          this.status = 201;
          this.body = result;
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
