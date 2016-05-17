// Dependencies
const encrypt = require('../utils/encryption');
const genToken = require('../utils/token');

// Login Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const loginController = () => {
  return {
    LOGIN: function* () {
      try {
        // Find the company based on the incoming subdomain
        const company = yield this.models.Company.query().getCompanyBySubdomain(this.subdomain);
        if(company.length === 0) throw { status: 404, message: 'Can not find company'};

        // Find user in specific company
        const user = yield this.models.User.query().getUserwithPasswordByUsername(this.request.body.username, company[0].id);
        if(user.length === 0) throw { status: 404, message: 'Can not find a user with that username within this company'};

        // Use utility function to check a user's password and return a boolean
        const result = yield encrypt.checkPassword(this.request.body.password, user[0].password);
        if(result === false) throw { status: 401, message: 'Wrong password'};

        // If user has been succesfully authenticated return a token
        const token = genToken({userId: user[0].id, isAdmin: user[0].is_admin, companyId: user[0].company_id });
        this.status = 200;
        this.body = { token };
      }
      catch(err) {
        this.log.info(err);
        this.status = err.status;
        this.body = err.message;
      }
    }
  }
}

module.exports = loginController;
