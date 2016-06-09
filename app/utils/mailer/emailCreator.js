const EmailTemplates = require('./emailTemplates/index.js');
const LinkCreator = require('./linkCreator.js');

function emailCreator( { firstName, lastName, email, companyName, playbookId, emailTemplate } ) {

  // Now select a template from the list of templates, based on the requested playbook type
  const selectedTemplate = EmailTemplates.filter((item) => item.name === emailTemplate);

  // Create the custom link to send in the email
  const linkToSend = LinkCreator(playbookId, email);

  // Now Passing in variables in order to fill in the email template
  const completedEmail = selectedTemplate[0].template(firstName, lastName, companyName, email, linkToSend );

  return completedEmail;
}

module.exports = emailCreator;
