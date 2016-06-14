// Configs
if( process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
global.Promise = require('bluebird');

// Dependencies
const cors       = require('koa-cors');
const Koa        = require('koa');
const Router     = require('koa-router');
const bouncer    = require('koa-bouncer');
const bodyParser = require('koa-bodyparser');
const helmet     = require('koa-helmet');
const jwt        = require('koa-jwt');
const unless     = require('koa-unless');
const logger     = require('./utils/logger');
const chalk      = require('chalk');
const db         = require('./knexfile');
const ApiError   = require('./utils/customErrors');
const fs         = require('fs');
const http       = require('http');
const Promise    = require('bluebird').Promise;

// Instantiate app
const app     = module.exports = Koa();
const appPort = process.env.PORT || 3000;
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

// Collect token from request headers
app.use(function* (next) {
  this.state.user = { userId: null, companyId: null, isAdmin: null};
  this.token = this.request.header.authorization ? this.request.header.authorization.slice(7) : null;
  yield* next;
});

// Configure router
const router = new Router({ prefix: process.env.ROUTER_PREFIX });

// Add routes to router
const configureRoutes = require('./routes/');
configureRoutes(router);

// Tell app to use router
app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(function* () {
  this.status = 200;
  this.body = {
    ctx: this,
    message: 'Welcome to the Quartermaster API'
  };
});

// Generic 404 Response
app.use(function* (next) {
  this.status = 404;
  this.body = {
    message: 'Are you lost? There is no information here'
  };
});

app.listen(process.env.PORT || '3000', function() {
  console.log("Listening at port 3000");
});
