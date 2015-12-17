import express from 'express';
import path from 'path';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import winston from 'winston';
import initRouter from '../../app/routes/index.js';

const server = function(port = '3000', cb) {
  const app = express();

  app.use(morgan('common'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: '*/*' }));

  try {
    winston.info('[SERVER] Initializating routes');
    initRouter(app);
  } catch (error) {
    return winston.error('[SERVER] Error: ', error.message);
  }

  app.use(express.static(path.join(__dirname, 'public')));

  // Error handler
  app.use((err, req, res, next) => {
    res.state(err.status || 500);
    res.json({
      message: err.message,
      error: (app.get('env') === 'development' ? err : 'Error!'),
    });

    next();
  });

  // Server
  app.listen(port);
  winston.info('[SERVER] Listening on port ' + port);

  // If callback
  if (cb) return cb();
};

export default server;
