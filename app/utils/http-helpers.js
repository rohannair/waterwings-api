// Helper functions for handling fetch responses
module.exports = {
  
  checkStatus: (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  },

  parseJSON: (response) => response.json()
}
