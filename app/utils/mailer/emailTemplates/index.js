// File to collect all the current templates and add them to a list
// Eventually will grab templates from remote source instead of locally
// Email list has the form [{name: , template: {} }, {name: , template: {}}]

const welcomeEmail = require('./welcomeEmail');
const forgotPasswordEmail = require('./forgotPasswordEmail');
let Emails = []
Emails.push(
  {
    name: 'welcomeEmail',
    template: welcomeEmail
  },
  {
    name: 'forgotPasswordEmail',
    template: forgotPasswordEmail
  }
);

module.exports = Emails;
