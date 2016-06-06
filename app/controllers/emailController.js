const ApiError = require('../utils/customErrors');
const EmailCreator = require('../mailers/emailCreator');
const EmailSender = require('../mailers/emailSender');

// Email Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const emailController = () => {
  return {
    POST: function* () {
      const company = yield this.models.Company.query().getCompanyBySubdomain(this.subdomain);
      const { name } = company[0];
      const { userId, firstName, lastName, email, playbookId, emailTemplate } = this.request.body;

      // If playbook is not assigned to a user then auto assign to user that playbook is currently being
      // sent to
      const playbookToSend = yield this.models.Playbook.query().getPlaybookById(playbookId);
      if (playbookToSend[0].assigned === null) {
        yield this.models.Playbook.query().putPlaybook({assigned: userId}, playbookId);
      }

      const EmailToSend = yield EmailCreator({
          companyName: name,
          companySubdomain: this.subdomain,
          firstName,
          lastName,
          email,
          playbookId,
          emailTemplate
        });

      // Send the email through SparkPost with the correct template
      yield EmailSender(EmailToSend);

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
