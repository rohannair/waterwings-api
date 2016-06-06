// Uploads Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const multipart = require('co-multipart');
const fetch = require('node-fetch');
const fs = require('fs');
const R = require('ramda');
const ApiError = require('../utils/customErrors');

const uploadsController = (function() {

  // function to encode file data to base64 encoded string
  function* base64_encode(file) {
    return new Buffer(fs.readFileSync(file)).toString('base64');
  }

  return {
    POST: function* () {
      const parts = yield* multipart(this);
      const self = this;

      const file = parts.files[0];
      const fileName = file.filename
        .split('.')
        .map(str => str.toLowerCase())
        .map(str => str.split(' ').join('_'))
        .join('.');

      let base64File = yield base64_encode(file.path);

      yield fetch(process.env.FILE_SERVICE_LOCATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: fileName,
          file: base64File
        })
      })
      .then(resp => {
        if (!resp.ok) throw new ApiError('Error uploading image, please try again', resp.status, resp.statusText);
        return resp.json();
      })
      .then(resp => self.body = resp)
      .then(() => parts.dispose());

      this.status = 201;
    }
  }
})();

module.exports = uploadsController;
