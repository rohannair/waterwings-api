const EmailClient = require('./mailerConfig');
const ApiError = require('./../customErrors');

module.exports = emailToSchedule => {
  return new Promise((resolve, reject) => {
    EmailClient.transmissions.send(emailToSchedule, (err, res) => {
      if (err)  reject( new ApiError('Error sending email, please try again', 400, err) );
      resolve();
    });
  });
}
