import async from 'async';
import server from './config/initializers/server';
import winston from 'winston';

async.series([
  function startServer(callback) {
    server(3000, callback);
  }],

  function(err) {
    if (err) return winston.error('[SERVER] initialization failed:', err);
  }
);
