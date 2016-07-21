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

      // If playbook is not assigned to a user then auto assign to user that playbook is currently being sent to
      const playbookToSend = yield this.models.Playbook.query().getPlaybookById(playbookId);
      if (playbookToSend[0].assigned === null) {
        yield this.models.Playbook.query().putPlaybook({assigned: userId}, playbookId);
      }

      // Create Email
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
      console.log('ISO TIME', normalizedSendTime);
      console.log('Human Time', moment(normalizedSendTime).format('MMM Do, h:mm A'));

      EmailToSend.transmissionBody.options = { start_time: normalizedSendTime};

      // Send Email
      const sparkPostRes = yield EmailSender(EmailToSend);
      console.log('Email Sent');

      // Create record in Email Messages table for newly scheduled email
      yield this.models.EmailMessage.query().createEmailMessage(
        {
          transmission_id: sparkPostRes.results.id,
          playbook_id: playbookId,
          user_id: userId,
          company_id: this.state.user.companyId,
          scheduled: true,
          scheduled_for: sendAt
        }
      );

      console.log('Created an email message Record');

      // Update the status of the playbook
      yield this.models.Playbook.query().putPlaybook({current_status: 'scheduled'}, playbookId);
      const result = yield this.models.Playbook.query().getPlaybookById(playbookId);

      this.status = 200;
      this.body = {
        result: result[0],
        message: `Email has been scheduled for ${moment(sendAt).format('MMM Do, h:mm A')}`
      };
    },

    CANCEL_SCHEDULED_PLAYBOOK: function* () {
      // This will remove a email from sparkpost
      const { playbookId } = this.request.body;

      // TODO: Create the function that will remove the email from the spark post tranmission queue
      // Then If successfull I can make the changes in the database

      // Now if we have sucessfully removed the email from the spark post schedule then
      // We can changes the status to canceled  in the email messages table
      yield this.models.EmailMessage.query().putEmailMessageByPlaybookId({canceled: true, scheduled: false}, playbookId);

      // Change the email status back to draft
      yield this.models.Playbook.query().putPlaybook({current_status: 'draft'}, playbookId);
      const result = yield this.models.Playbook.query().getPlaybookById(playbookId);

      this.status = 201;
      this.body = {
        result: result[0],
        message: `Email has been canceled`
      };
    },


    SCHEDULED_PLAYBOOK_SENT: function* () {
      // TODO Current testing checks
      console.log('Web hook incoming');
      console.log('Body of Webhook', this.request.body);
      console.log('Unix Time Stamp', this.request.body[0].msys.message_event.timestamp);
      console.log('ISO Time', moment.unix(this.request.body[0].msys.message_event.timestamp).format('YYYY-MM-DDTHH:MM:SSZ'));
      console.log('Human Time Stamp', moment.unix(this.request.body[0].msys.message_event.timestamp).format('MMM Do, h:mm A'))
      console.log('Transmission Id', this.request.body[0].msys.message_event.transmission_id);

      // Proper Function Starts Here

      const transmissionId = this.request.body[0].msys.message_event.transmission_id;
      const sent_at = parseInt(this.request.body[0].msys.message_event.timestamp);

      // Update the email_messages table to reflect that the email has now been sent
      yield this.models.EmailMessage.query().putEmailMessageByTransmissionId({sent: true, scheduled: false, sent_at}, transmissionId)

      console.log('Updated Email Message Table');
      // Retrieve the playbookid from the email messaging table

      console.log(transmissionId)

      const message = this.models.EmailMessage.query().getEmailByTransmissionId(transmissionId);

      console.log('Email MEssage record', message);

      // Create an empty submitted playbook and insert it into the database
      const playbook = yield this.models.Playbook.query().getPlaybookById(message[0].playbook_id);
      const newSubmittedDoc = yield createEmptySubmittedPlaybook(playbook[0]);

      console.log('Created submitted Doc');

      // Update the playbook in the playbooks table
      yield this.models.Playbook.query().putPlaybook({submitted_doc: newSubmittedDoc, current_status: 'sent'}, message[0].playbook_id);

      // Return Status and message
      this.status = 200;
      this.body = {
        message: `Email has been sent and playbook has been updated`
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
