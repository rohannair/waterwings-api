// Dependencies
const encrypt = require('../utils/encryption');
const genToken = require('../utils/token');
const ApiError = require('../utils/customErrors');

// Login Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const loginController = () => {
  return {
    LOGIN: function* () {
      // Find the company based on the incoming subdomain
      const company = yield this.models.Company.query().getCompanyBySubdomain(this.subdomain);
      if(company.length === 0) throw new ApiError('Can not find company', 404, 'Can not find company');

      // Find user in specific company
      const user = yield this.models.User.query().getUserwithPasswordByUsername(this.request.body.username, company[0].id);
      if(user.length === 0) throw new ApiError('Can not find a user with that username within this company', 404, 'Can not find a user with that username within this company');

      // Use utility function to check a user's password and return a boolean
      const result = yield encrypt.checkPassword(this.request.body.password, user[0].password);
      if(result === false) throw new ApiError('Wrong Password', 401, 'Wrong Password');

      // If user has been succesfully authenticated return a token
      const token = genToken({userId: user[0].id, isAdmin: user[0].is_admin, companyId: user[0].company_id });
      this.status = 200;
      this.body = { token };
    }
  }
}

module.exports = loginController;
