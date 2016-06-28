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
      const welcomeLink = `http://www.${process.env.DOMAIN}/playbook/${payload.playbookId}?from_email=${payload.email}`;
      // Construct email
      return selectedTemplate[0].template(payload.firstName, payload.lastName, payload.companyName, payload.email, welcomeLink );

    case 'forgotPasswordEmail':
      // Create link
      const forgotPasswordLink = `http://www.${process.env.DOMAIN}/users/resetPassword/${payload.userId}`;
      // Construct Email
      return selectedTemplate[0].template(payload.firstName, payload.lastName, payload.email, forgotPasswordLink);

    default:
      throw new ApiError('Error sending email', 400, 'Selected Email template does not exist');
  }

  // return completedEmail;
}
