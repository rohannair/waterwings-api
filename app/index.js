// Configs
if( process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
global.Promise = require('bluebird');

// Dependencies
const cors        = require('koa-cors');
const Koa         = require('koa');
const Router      = require('koa-router');
const bouncer     = require('koa-bouncer');
const bodyParser  = require('koa-bodyparser');
const helmet      = require('koa-helmet');
const jwt         = require('koa-jwt');
const unless      = require('koa-unless');
const logger      = require('./utils/logger');
const chalk       = require('chalk');
const db          = require('./knexfile');
const ApiError    = require('./utils/customErrors');

// Instantiate app
const app     = module.exports = Koa();
const appPort = process.argv[2] || 3000;
app.poweredBy = false;
app.use(cors({
  origin: '*'
}));

// Add database connection
app.context.db = db();

// App Middleware
app.use(helmet());
app.use(bodyParser());
app.use(bouncer.middleware());

// Add logger to app
app.use(function* (next) {
  this.log = logger;
  yield* next;
});

// Log both incoming requests and outgoing responses
app.use(function* (next) {
  this.log.info('REQUEST: ' + this.request.method + ' ' + this.request.url);
  yield* next;
  this.log.info('RESPONSE: ' + this.response.status);
});

// Central Error Handling
app.use(function* (next) {
  try {
    yield* next;
  }
  catch(err) {
    this.log.info('ERROR: ' + err.systemError );
    this.status = err.status || 500;
    this.body = {
      message: err.message || 'Internal Server Error'
    };
  }
});

// Database routing
app.use(function* (next) {
  // Models are added on each incoming request
  this.models = {
    Company: require('./models/Company').bindKnex(this.db),
    User: require('./models/User').bindKnex(this.db),
    Role: require('./models/Role').bindKnex(this.db),
    Playbook: require('./models/Playbook').bindKnex(this.db)
  };
  yield* next;
});

// JWT auth needed for API routes
// TODO: change this asap once we have user registration working
app.use(jwt({ secret: process.env.JWT_SECRET }).unless(function () {
  if(this.url === '/api/v1/login' && this.method === 'POST') {
    return true;
  } else if ( this.url.match(/\/api\/v1\/playbooks\/.*/) && this.method === 'GET') {
    return true
  } else if ( this.url.match(/\/api\/v1\/playbooks\/.*/) && this.method === 'PUT') {
    return true
  } else if ( this.url.match(/\/api\/v1\/playbooks\/submit\/.*/) && this.method === 'POST' ) {
    return true
  } else if ( this.url.match(/\/api\/v1\/playbooks\/statusUpdate\/.*/) && this.method === 'POST' ) {
    return true
  }
  return false
}));

// Configure router
const router  = new Router({ prefix: '/api/v1' });

// Add routes to router
const configureRoutes = require('./routes/');
configureRoutes(router);

// Tell app to use router
app
  .use(router.routes())
  .use(router.allowedMethods());

// Generic 404 Response
app.use(function* (next) {
  this.status = 404;
  this.body = {
    message: 'Are you lost? There is no information here'
  };
});

// Turn on the server
if (!module.parent) app.listen(appPort);
console.log('--- Listening at port', appPort);
