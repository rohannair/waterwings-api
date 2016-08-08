const EmailTemplates = require('./emailTemplates/index.js');
const ApiError = require('./../customErrors');

module.exports = (payload) => {
  // Get email template from request
  const { emailTemplate } = payload;

  // Select template based on the requested playbook type
  const selectedTemplate = EmailTemplates.filter((item) => item.name === emailTemplate);

  switch(emailTemplate) {
    case 'welcomeEmail':
      // Create link
      let welcomeLink = `http://${process.env.DOMAIN}/playbook/${payload.playbookId}?from_email=${payload.email}`;
      // Construct email
      return selectedTemplate[0].template(payload.firstName, payload.lastName, payload.companyName, payload.email, welcomeLink );

    case 'forgotPasswordEmail':
      // Create link
      let forgotPasswordLink = `http://${process.env.DOMAIN}/users/resetPassword/${payload.userId}`;
      // Construct Email
      return selectedTemplate[0].template(payload.firstName, payload.lastName, payload.email, forgotPasswordLink);

    case 'generalEmail':
      // Create link
      let generalLink = `http://${process.env.DOMAIN}/playbook/${payload.playbookId}?from_email=${payload.email}`;
      // Construct Email
      return selectedTemplate[0].template(payload.firstName, payload.lastName, payload.companyName, payload.email, generalLink);

    case 'newAdminEmail':
      // Create link
      let adminLink = `http://${payload.companyDomain}.${process.env.DOMAIN}/login`;
      // Construct Email
      return selectedTemplate[0].template(payload.firstName, payload.lastName, payload.email, payload.password, payload.companyName, payload.senderFirstName, payload.senderLastName, adminLink);

    default:
      throw new ApiError('Error sending email', 400, 'Selected Email template does not exist');
  }

}
