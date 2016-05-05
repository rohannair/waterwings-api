// Dependencies
const chalk   = require('chalk');
const cors    = require('koa-cors');
const Koa     = require('koa');
const Router  = require('koa-router');
const bouncer = require('koa-bouncer');
const jwt     = require('koa-jwt');
const unless  = require('koa-unless');
const logger = require('./utils/logger');

// Instantiate app
const app     = module.exports = Koa();
const appPort = process.argv[2] || 3000;
app.poweredBy = false;
app.use(cors({
  origin: '*'
}));

// Configure router
const router  = new Router({
  prefix: '/api/v1'
});

// Configure DBs
app.context.db = require('./db.js');

// Add routes to router
const configureRoutes = require('./routes/');
configureRoutes(router);
console.log(chalk.green.bold('--- Routes configured'));

// Tell app to use router
app
  .use(router.routes())
  .use(router.allowedMethods());

// Logger

// Add logger to app
router.use(function* (next) {
  this.log = logger;
  yield* next;
});

// Log both incoming requests and outgoing responses
router.use(function* (next) {
  this.log.info('REQUEST: ' + this.request.method + ' ' + this.request.url);
  yield* next;
  this.log.info('RESPONSE: ' + this.response.status);
});

// Other middleware
router.use(bouncer.middleware());

// Error Handling
router.use(function* (next) {
  try {
    yield* next;
  } catch (err) {

    if (err.status === 401) {
      this.status = 401;
      this.body = {
        message: this.path + '- Protected resource, use Authorization header to get access\n'
      };
    } else {
      this.response.status = this.status || 500;
      this.response.body = err;
    }
    console.error(chalk.red.bold('--- ' + err));
  }
});

// JWT auth needed for API routes
// router.use(jwt({ secret: 'shared' }).unless({path: [/^\/api\/v1\/login|register|playbooks|submitPlaybook/]}));

// Generic Response
app.use(function* (next) {
  this.body = {
    message: 'Welcome to the Waterwings v1 API.'
  };
});

// Turn on the server
if (!module.parent) app.listen(appPort);
console.log(chalk.green.bold('--- Listening at port', appPort));
