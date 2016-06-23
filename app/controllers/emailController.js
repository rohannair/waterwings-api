const ApiError = require('../utils/customErrors');
const EmailCreator = require('../utils/mailer/emailCreator');
const EmailSender = require('../utils/mailer/emailSender');
const createEmptySubmittedPlaybook = require('../utils/createEmptySubmittedPlaybook');

// Email Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const emailController = () => {
  return {
    PLAYBOOK: function* () {
      const company = yield this.models.Company.query().getCompanyById(this.state.user.companyId);
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
          firstName,
          lastName,
          email,
          playbookId,
          emailTemplate
        });

      // Send the email through SparkPost with the correct template
      yield EmailSender(EmailToSend);

      // Create an empty submitted playbook and insert it into the database
      const PlaybookToBeSent = yield this.models.Playbook.query().getPlaybookById(playbookId);
      const newSubmittedDoc = yield createEmptySubmittedPlaybook(PlaybookToBeSent[0]);
      yield this.models.Playbook.query().putPlaybook({submitted_doc: newSubmittedDoc }, playbookId);


      yield this.models.Playbook.query().putPlaybook({current_status: 'sent'}, playbookId);
      const result = yield this.models.Playbook.query().getPlaybookById(playbookId);

      this.status = 200;
      this.body = {
        result: result[0],
        newSubmittedDoc,
        message: `Email has been sent to ${email}`
      };
    },

    FORGOT_PASSWORD: function* () {
      const {email, emailTemplate} = this.request.body;
      // Need to check that the username is in the database
      const user = yield this.models.User.query().getUserwithPasswordByUsername(email);
      if(user.length === 0) throw new ApiError('Can not find a user with that username', 404, 'Cannot find a user with that username');
      const {firstName, lastName } = user[0];

      const EmailToSend = yield EmailCreator({
        firstName,
        lastName,
        email,
        emailTemplate
      });

      yield EmailSender(EmailToSend);

      this.status = 200;
      this.body = {
        message: `Password reset email has been sent to ${email}`
      };

    }

  };
};

module.exports = emailController;
