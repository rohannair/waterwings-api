const EmailClient = require('./mailerConfig');

module.exports = function (EmailToSend) {
  return new Promise((resolve, reject) => {
    EmailClient.transmissions.send(EmailToSend, (err, res) => {
      if (err)  { throw new ApiError('Error sending email, please try again', 400, 'danger', 'Email Failed to Send') }
      resolve();
    });
  });
}
