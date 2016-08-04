// Helper functions for handling fetch responses
const ApiError = require('./customErrors');

module.exports = {

  checkStatus: (response) => {
    if (response.status >= 200 && response.status < 300) return response
    throw new ApiError('Problem with connection to 3rd Party', response.status, response.statusText);
  },

  parseJSON: (response) => response.json()
}
