const EmailClient = require('./mailerConfig');
const ApiError = require('./../customErrors');

// Function to delete a scheduled email transmission
module.exports = (transmissionId) => {

  // Request Options
  const options = {
    hostname: 'api.sparkpost.com',
    path: `/api/v1/transmissions/${transmissionId}`,
    method: 'DELETE',
    headers: {
      'Authorization': process.env.SPARK_POST_API_KEY,
      'Accept': 'application/json'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', (data) => resolve(JSON.parse(data)));
    });
    req.end();

    req.on('error', (err) => reject( new ApiError('Error attempting to delete transmission', 500, err)));
  })
}
