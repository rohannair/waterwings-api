const fetch = require('node-fetch');
const ApiError = require('../utils/customErrors');

// Email Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const emailController = () => {
  return {
    POST: function* () {
      const self = this;
      const company = yield this.models.Company.query().getCompanyBySubdomain(this.subdomain);
      const { name } = company[0];
      const { userId, firstName, lastName, email, playbookId, emailTemplate } = this.request.body;

      // If playbook is not assigned to a user then auto assign to user that playbook is currently being
      // sent to 
      const playbookToSend = yield this.models.Playbook.query().getPlaybookById(playbookId);
      if (playbookToSend[0].assigned === null) {
        yield this.models.Playbook.query().putPlaybook({assigned: userId}, playbookId);
      }

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
        if (!resp.ok) throw new ApiError('Error sending email, please try again', resp.status, resp.statusText);
        return resp.json();
      })
      .then(resp => self.body = resp);

      yield this.models.Playbook.query().putPlaybook({current_status: 'sent'}, playbookId);
      const result = yield this.models.Playbook.query().getPlaybookById(playbookId);
      this.status = 200;
      this.body = {
        result: result[0],
        message: `Email has been sent to ${email}`
      };
    }

  };
};

module.exports = emailController;
