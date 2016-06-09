// Deps
const AWS = require('aws-sdk');
const multipart = require('co-multipart');
const fs = require('fs');
const ApiError = require('../utils/customErrors');

// File Service Controller
// Individual Controller functions are wrapped in a larger function so that they can
// can be exported using modules.exports and then easily imported into the routes file
const fileServiceController = () => {
  return {
    UPLOAD: function* () {
      const parts = yield* multipart(this);
      const file = parts.files[0];
      const fileName = file.filename
        .split('.')
        .map(str => str.toLowerCase())
        .map(str => str.split(' ').join('_'))
        .join('.');

      // Now we construct the S3 bucket
      const s3 = new AWS.S3();
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileName,
        Body: new Buffer(fs.readFileSync(file.path)),
        ContentType: 'image/jpeg'
      };

      // Wrap image upload in a promise
      const imageUpload = () => {
        return (new Promise((resolve, reject) => {
          s3.upload(params, function(err, data) {
            parts.dispose();
            if (err) reject(new ApiError('Error Uploading Image', 500, err));
            resolve(data);
          });
        }))
      }

      // Upload image to S3 bucket
      const result = yield imageUpload();

      this.status = 201;
      this.body = {
        url: result.Location
      };
    }

  }
};

module.exports = fileServiceController;
