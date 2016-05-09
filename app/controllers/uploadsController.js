const chalk = require('chalk');
const multipart = require('co-multipart');
const fetch = require('node-fetch');
const fs = require('fs');
const R = require('ramda');

const uploadsController = (function() {

  // function to encode file data to base64 encoded string
  function* base64_encode(file) {
    return new Buffer(fs.readFileSync(file)).toString('base64');
  }

  return {
    POST: function* () {
      try {
        const parts = yield* multipart(this);
        const self = this;

        const file = parts.files[0];
        const fileName = file.filename
          .split('.')
          .map(str => str.toLowerCase())
          .map(str => str.split(' ').join('_'))
          .join('.');

        let base64File = yield base64_encode(file.path);

        yield fetch('http://localhost:3002/upload', {
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
          if (!resp.ok) return self.throw(resp.statusText, resp.status);
          return resp.json();
        })
        .then(resp => self.body = resp)
        .then(() => parts.dispose());

        this.status = 201;
      } catch (e) {
        console.log(chalk.red.bold(JSON.stringify(e, null, 4)));
        this.status = e.status || 400;
        this.body = {
          message: e.message,
          error: JSON.stringify(e)
        }
      }
    }
  }
})();

module.exports = uploadsController;
