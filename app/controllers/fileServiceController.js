// Deps
const AWS = require('aws-sdk');
const multipart = require('co-multipart');
const readFile = require('fs-readfile-promise');
const Jimp = require('jimp');
const crypto = require('crypto');

// Utils
const ApiError = require('../utils/customErrors');

// File Service Controller
const fileServiceController = () => {
  return {
    UPLOAD: function* () {
      const parts = yield* multipart(this);
      const file = parts.files[0];

      const fileType = file.mimeType.split('/');
      console.log(JSON.stringify(fileType, null, 4));

      if (fileType[0] !== 'image') {
        throw new ApiError('Forbidden file type!', 400, 'Only accepting images at this time');
      }

      const processedFile = yield readFile(file.path)
        .then(buffer => Jimp.read(buffer))
        .then(img => img.resize(450, 450))
        .then(img => img.quality(85))
        .then(img => new Promise((resolve, reject) =>
          img.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
            if (err) return reject(err);
            resolve(buffer);
          })
        ));

      const fileName = file.filename
        .toLowerCase()
        .split(' ').join('_');

      return;
        // .split('.')
        // .map(str => str.toLowerCase())
        // .map(str => str.split(' ').join('_'))
        // .join('.');

      // Now we construct the S3 bucket
      const s3 = new AWS.S3();
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: crypto.createHash('md5').update(fileName).digest('hex'),
        Body: processedFile,
        ContentType: processedFile._originalMime
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
