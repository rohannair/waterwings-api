// File to collect all the current templates and add them to a list
// Eventually will grab templates from the database instead of locally
// Email list has the form [{name: , template: {} }, {name: , template: {}}]

const welcomeEmail = require('./welcomeEmail.js');
const Emails = []
Emails.push({
  name: 'welcomeEmail',
  template: welcomeEmail
});

module.exports = Emails;
