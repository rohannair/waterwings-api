// Configs
require('dotenv').config();
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
const multiTenant = require('./utils/multiTenant');
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

// Helmet
app.use(helmet());

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

// Subdomain catching
// Grabs the subdomin of the incoming request in order to properly identify to which company
// the request should be routed too
app.use(function* (next) {
    this.subdomain = yield multiTenant.getSubdomain(this.request.header.host);
    yield* next;
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

// Configure router
const router  = new Router({
  prefix: '/api/v1'
});

router.use(cors({
  origin: '*'
}));

// Add routes to router
const configureRoutes = require('./routes/');
configureRoutes(router);

// Tell app to use router
app
  .use(router.routes())
  .use(router.allowedMethods());

// Middleware

// Validation
router.use(bouncer.middleware());

// Body Parser
router.use(bodyParser());

// JWT auth needed for API routes
// TODO: change this asap once we have user registration working
router.use(jwt({ secret: process.env.JWT_SECRET }).unless(function () {
  if(this.url === '/api/v1/login' && this.method === 'POST') {
    return true;
  } else if ( this.url.match(/\/api\/v1\/playbooks\/.*/) && this.method === 'GET') {
    return true
  } else if ( this.url.match(/\/api\/v1\/playbooks\/.*/) && this.method === 'PUT') {
    return true
  }
   else {
    return false
  }
}));

// Ensure that a user's token and subdomain match
router.use(function* (next) {
    // Only check if the user has a valid token
    if(this.state.user) {
      const company = yield this.models.Company.query().getCompanyBySubdomain(this.subdomain)
      if ( (company.length <= 0) || (company[0].id !== this.state.user.companyId) )  {
        throw new ApiError('Token and company do not match, please login to your company', 403, 'Mismatched token and subdomain');
      }
    }
    yield* next;
})

// Generic Response
app.use(function* (next) {
  this.body = {
    message: 'Welcome to the Waterwings v1 API.'
  };
});

// Turn on the server
if (!module.parent) app.listen(appPort);
console.log('--- Listening at port', appPort);
