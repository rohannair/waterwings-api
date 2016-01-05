// Dependencies
const chalk  = require('chalk');
const koa     = require('koa');
const logger  = require('koa-logger');
const Router  = require('koa-router');
const koaPg   = require('koa-pg');
const bouncer = require('koa-bouncer');

// Instantiate app
const app     = module.exports = koa();
const appPort = process.argv[2] || 3000;
app.poweredBy = false;

// Configure router
const router  = new Router({
  prefix: '/api/v1'
});

// Configure DBs
app.use(koaPg('postgress://root@localhost:5432/waterwings'));

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
// app.use(bouncer.middleware());
router.use(bouncer.middleware());

// Error Handling
router.use(function* (next) {
  try {
    yield* next;
  } catch (err) {
    console.error(chalk.red.bold('--- ' + err));
    this.response.status = this.status || 500;
    this.response.body = err;
  }
});

// Generic Response
app.use(function* (next) {
  this.body = {
    message: 'Welcome to the Waterwings v1 API.'
  };
});

// Turn on the server
if (!module.parent) app.listen(appPort);
console.log(chalk.green.bold('--- Listening at port', appPort));
