// Roles Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const rolesController = () => {
  return {
    GET: function* () {
      try {
        const result = yield this.models.Role.query().getAll(this.state.user.companyId);
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
        const result = yield this.models.Role.query().postRole({ ...this.request.body, company_id: this.state.user.companyId });
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
        const result = yield this.models.Role.query().putRole(this.request.body, this.params.id);
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
          const result = yield this.models.Role.query().putRole({ deleted: true }, this.params.id);
          this.status = 201;
          this.body = {
            message: 'Role has been deleted'
          };
        }
        else {
          throw 'Unauthorized user attempted to delete a role'
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
}

module.exports = rolesController;
