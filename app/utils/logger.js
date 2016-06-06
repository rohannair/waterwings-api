// Import Logging Module
const bunyan = require('bunyan');

// Construct Logger
const logger = bunyan.createLogger({
  name: 'quartermaster-api',
  streams: [
    {
      // Log all errors,requests and responses to the console
      level: 'info',
      stream: process.stdout
    },
    {
      // Log all errors,requests and responses to the log file
      level: 'info',
      path: process.env.LOG_LOCATION
    }
  ],
  serializers: bunyan.stdSerializers, //Contains three serializers for errs, reqs and res'
  src: false //Don't use in production as it is very slow
});

module.exports = logger;
