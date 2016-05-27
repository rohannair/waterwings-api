const fetch = require('node-fetch');

// Email Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const emailController = () => {
  return {
    POST: function* () {
      try {
        const self = this;
        const company = yield this.models.Company.query().getCompanyBySubdomain(this.subdomain);
        const { name } = company[0];
        const { firstName, lastName, email, playbookId, emailTemplate } = this.request.body;

        yield fetch('http://localhost:3001/email/playbook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            companyName: name,
            companySubdomain: self.subdomain,
            firstName,
            lastName,
            email,
            playbookId,
            emailTemplate
          })
        })
        .then(resp => {
          if (!resp.ok) return self.throw(resp.statusText, resp.status);
          return resp.json();
        })
        .then(resp => self.body = resp);

        this.status = 201;
        this.body = {
          message: `Email has been sent to ${email}`
        };
      }
      catch(err) {
        this.log.info(err);
        this.status = 500;
        this.body = {
          message: 'Error sending email, please try again'
        };
      }
    }

  };
};

module.exports = emailController;
