// Deps
const isAdminCheck = require('./../utils/isAdminCheck');

// Controller
const usersController = (User) => {
  return {
    GET: function* () {
      try {
        const result = yield User.getUsers();
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
        const result = yield User.getUserByQuery(this.params.id);
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
        const result = yield User.postUser(this.request.body);
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
        const result = yield User.putUser(this.request.body, this.params.id);
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

    function* DELETE() {
      const request = yield parse(this.req);
      try {
          const userIsAdmin = yield isAdminCheck(request.userId);
          if (userIsAdmin) {
            const result = yield User.deleteUser('id of user to be deleted');
            this.status = 201;
            this.body = result;
          }
          else {
            throw 'Unauthorized user attempted to delete another user'
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
