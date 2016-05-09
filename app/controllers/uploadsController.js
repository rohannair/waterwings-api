const multipart = require('co-multipart');
const fetch = require('node-fetch');

const uploadsController = (function() {
  return {
    POST: function* () {
      try {
        const parts = yield* multipart(this);
        let self = this;

        // do stuff with the body parts
        parts.files.forEach(function(file) {
          console.log(file.fileName || file.filename)
          // yield fetch('localhost:3002', {
          //   method: 'POST',
          //   body: file
          // })
          // .then(resp => resp.json)
          // .then(resp => {
          //   this.body = resp;
          // });
        });

        // delete all the files when you're done
        parts.dispose();

      } catch (e) {
        console.log(chalk.red.bold(JSON.stringify(e, null, 4)));
      }
    }
  }
})();

module.exports = uploadsController;
