// Controller
const companiesController = () => {
  return {
    GET: function* () {
      try {
        console.log(this.models.User);
        console.log(this.models.Company);
        const result = yield this.models.Company.query().getAll();
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
        const result = yield this.models.Company.query().postCompany(this.request.body);
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
        const result = yield this.models.Company.query().putCompany(this.request.body, this.params.id);
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
      // No one should be able to delete a company
      this.log.info('User attempted to delete a company');
      this.status = 403;
      this.body = {
        message: 'Not Able to Delete'
      };
    }

  };
}

module.exports = companiesController;
