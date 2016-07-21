const ApiError = require('../utils/customErrors');
const EmailCreator = require('../utils/mailer/emailCreator');
const EmailSender = require('../utils/mailer/emailSender');
const createEmptySubmittedPlaybook = require('../utils/createEmptySubmittedPlaybook');

const moment = require('moment');

// Email Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const emailController = () => {
  return {
    SEND_PLAYBOOK: function* () {
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

    SCHEDULE_PLAYBOOK: function* () {

      const company = yield this.models.Company.query().getCompanyById(this.state.user.companyId);
      const { name } = company[0];
      const { userId, firstName, lastName, email, playbookId, emailTemplate, sendAt } = this.request.body;

      // If playbook is not assigned to a user then auto assign to user that playbook is currently being
      // sent to

      // const playbookToSend = yield this.models.Playbook.query().getPlaybookById(playbookId);
      // if (playbookToSend[0].assigned === null) {
      //   yield this.models.Playbook.query().putPlaybook({assigned: userId}, playbookId);
      // }

      const EmailToSend = yield EmailCreator({
          companyName: name,
          firstName,
          lastName,
          email,
          playbookId,
          emailTemplate
        });

        // Add Schedule Date to the emailer
        // Assume that incoming start time will be a unix time stamp in (milli seconds)

        // Format of the start time that spark post accepts
        // Format YYYY-MM-DDTHH:MM:SS±HH:MM,  Example: ‘2015-02-11T08:00:00-04:00’.

      const normalizedSendTime = moment(sendAt).format('YYYY-MM-DDTHH:MM:SSZ');
      console.log(normalizedSendTime);

      EmailToSend.transmissionBody.options = { start_time: normalizedSendTime};

      const sparkPostRes = yield EmailSender(EmailToSend);

      console.log('Spark Post Respone', sparkPostRes);
      // Then I need to update the email_messages tabel

      this.status = 200;
      this.body = {
        // result: result[0],
        message: `Email has been scheduled for ${moment(sendAt).format('MMM Do, h:mm A')}`
      };

    },


    CANCEL_SCHEDULED_PLAYBOOK: function* () {
      // This will remove a email from sparkpost

      // Now if we have sucessfully removed the email from the spark post schedule then
      // We can changes the status to canceled  in the email messages table

      // Then we can change the status of the playbook to draft


    },


    SCHEDULED_PLAYBOOK_SENT: function* () {

      console.log('Web hook incoming');

      console.log('Body of Webhook', this.request.body);
      console.log('Unix Time Stamp', this.request.body[0].msys.message_event.timestamp);
      console.log('Human Time Stamp', moment.unix(this.request.body[0].msys.message_event.timestamp).format('MMM Do, h:mm A'))
      console.log('Transmission Id', this.request.body[0].msys.message_event.transmission_id);
      // This function will recieve the webhook from spark post and then update the db
      // For the speicific email

      // Update the email_messages table to reflect that the email has now been sent
      // yield this.models.email_message.query().putEmailTransaction('the transcation id', {sent: true})

      // Retrieve the playbook from the table
      // const email = this.models.email_messages.query().getEmailByTransactionId('the transaction id');

      // Now I need to change the status in the playbooks table
      // yield this.models.Playbook.query().putPlaybook({current_status: 'sent'}, email[0].playbook_id);


      // Instead

      this.status = 200;
      this.body = {
        // result: result[0],
        message: `Email hook has been hit`
      };


    },

    FORGOT_PASSWORD: function* () {
      const {email, emailTemplate} = this.request.body;
      // Need to check that the username is in the database
      const user = yield this.models.User.query().getUserwithPasswordByUsername(email);
      if(user.length === 0) throw new ApiError('Can not find a user with that username', 404, 'Cannot find a user with that username');
      const {firstName, lastName, id } = user[0];

      const EmailToSend = yield EmailCreator({
        userId: id,
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
