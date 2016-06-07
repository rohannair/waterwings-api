const EmailClient = require('./mailerConfig');
const ApiError = require('../customErrors');

module.exports = emailToSend => {
  return new Promise((resolve, reject) => {
    EmailClient.transmissions.send(emailToSend, (err, res) => {
      if (err)  {
        throw new ApiError(
          'Error sending email, please try again',
          400,
          'danger',
          'Email Failed to Send'
        );
      }

      resolve();
    });
  });
}
