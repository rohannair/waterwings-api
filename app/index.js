// Dependencies
const chalk   = require('chalk');
const koa     = require('koa');
const logger  = require('koa-logger');
const Router  = require('koa-router');
const bouncer = require('koa-bouncer');
const jwt     = require('koa-jwt');
const unless  = require('koa-unless');

// Instantiate app
const app     = module.exports = koa();
const appPort = process.argv[2] || 3000;
app.poweredBy = false;

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
app.use(logger());
router.use(logger());

// Other middleware
router.use(bouncer.middleware());

// Error Handling
router.use(function* (next) {
  try {
    yield* next;
  } catch (err) {

    if (err.status === 401) {
      this.status = 401;
      this.body = this.path + '- Protected resource, use Authorization header to get access\n';
    } else {
      this.response.status = this.status || 500;
      this.response.body = err;
    }
    console.error(chalk.red.bold('--- ' + err));
  }
});

// JWT auth needed for API routes
router.use(jwt({ secret: 'shared' }).unless({path: [/^\/api\/v1\/login|register/]}));

// Generic Response
app.use(function* (next) {
  this.body = {
    message: 'Welcome to the Waterwings v1 API.'
  };
});

// Turn on the server
if (!module.parent) app.listen(appPort);
console.log(chalk.green.bold('--- Listening at port', appPort));
