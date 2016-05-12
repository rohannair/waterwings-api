// Dependencies
const cors       = require('koa-cors');
const Koa        = require('koa');
const Router     = require('koa-router');
const bouncer    = require('koa-bouncer');
const bodyParser = require('koa-bodyparser');
const jwt        = require('koa-jwt');
const unless     = require('koa-unless');
const logger     = require('./utils/logger');
const chalk       = require('chalk');
const multiTenant = require('./utils/multiTenant');
const configs    = require('./config/app')();


// Instantiate app
const app     = module.exports = Koa();
const appPort = process.argv[2] || 3000;
app.poweredBy = false;
app.use(cors({
  origin: '*'
}));

// Logger

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

// Subdomain catching
// Grabs the subdomin of the incoming request in order to properly identify to which
// database the request should be routed too
app.use(function* (next) {
  try {
      this.subdomain = yield multiTenant.getSubdomain(this.request.header.host);
      yield* next;
  }
  catch(err) {
    this.log.info(err);
    this.status = 404;
    this.body = {
      message: 'Incorrect subdomin, this company does not exist'
    };
  }
});

// Database routing
app.use(function* (next) {
  // Determine the database to connect to based on the subdomain of the request
  const knex = yield multiTenant.clientCreator(this.subdomain);
  // Models are added on each incoming request since a different database may be accessed on
  // each request due to multi tenancy
  this.models = {
    Company: require('./models/Company').bindKnex(knex),
    User: require('./models/User').bindKnex(knex),
    Role: require('./models/Role').bindKnex(knex),
    Playbook: require('./models/Playbook').bindKnex(knex),
    CompletedPlaybook: require('./models/CompletedPlaybook').bindKnex(knex)
  };
  yield* next;
});

// Configure router
const router  = new Router({
  prefix: '/api/v1'
});

router.use(cors({
  origin: '*'
}));

// Configure DBs
app.context.db = require('./db.js');

// Add routes to router
const configureRoutes = require('./routes/');
configureRoutes(router);
console.log('--- Routes configured');

// Tell app to use router
app
  .use(router.routes())
  .use(router.allowedMethods());

// Middleware

// Validation
router.use(bouncer.middleware());

// Body Parser
router.use(bodyParser());

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
    this.log.info(err);
  }
});

// JWT auth needed for API routes
router.use(jwt({ secret: configs.getJWT() }).unless({path: [/^\/api\/v1\/login|playbooks|submitPlaybook/]}));

// Generic Response
app.use(function* (next) {
  this.body = {
    message: 'Welcome to the Waterwings v1 API.'
  };
});

// Turn on the server
if (!module.parent) app.listen(appPort);
console.log('--- Listening at port', appPort);
