// Deps
const AWS = require('aws-sdk');
const crypto = require('crypto');
const Jimp = require('jimp');
const multipart = require('co-multipart');
const readFile = require('fs-readfile-promise');
const sanitize = require('sanitize-filename');

// Utils
const ApiError = require('../utils/customErrors');

// File Service Controller
const fileServiceController = () => {
  return {
    UPLOAD: function* () {
      const parts = yield* multipart(this);
      const file = parts.files[0];
      const fileType = file.mimeType.split('/');

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

      // Sanitize
      const fileNameArray = file.filename
        .toLowerCase()
        .replace(/ /g, '_')
        .split('.')
        .map(str => sanitize(str));

      // Adding hash to title for caching reasons
      const fileName = [
        ...fileNameArray.slice(0, fileNameArray.length - 1),
        (crypto.createHash('md5').update((new Date()).toString()).digest('hex')),
        ...fileNameArray.slice(fileNameArray.length - 1)
      ].join('.');

      const s3 = new AWS.S3();
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileName,
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
