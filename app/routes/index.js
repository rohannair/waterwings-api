// Router

// Middleware
const middleware = require('../utils/middleware/index');

// Controllers
const loginController  = require('../controllers/loginController')();
const registerController = require('../controllers/registerController')();
const companiesController = require('../controllers/companiesController')();
const usersController  = require('../controllers/usersController')();
const rolesController = require('../controllers/rolesController')();
const playbooksController = require('../controllers/playbooksController')();
const playbooksJoinsController = require('../controllers/playbookJoinsController')();
const fileServiceController = require('../controllers/fileServiceController')();
const emailController = require('../controllers/emailController')();

module.exports = function configure(router) {

  router

  // PUBLIC Routes

  // General Home Message
  .get('/', function* () {
    this.status = 200;
    this.body = {
      message: 'Welcome to the Quartermaster API'
    };
  })

  // Login
  .post('/login', loginController.LOGIN)

  // New Customer Registration
  .post('/register', registerController.REGISTER)

  // Forgotten Password Email
  .post('/forgotPassword/send', emailController.FORGOT_PASSWORD)

  // File Service
  .post('/upload', fileServiceController.UPLOAD)

  // Public Playbooks
  .get('/get_playbook/:id', playbooksController.PUBLIC_GET_ONE)
  .post('/playbooks', playbooksController.POST)
  .post('/playbooks/:id', playbooksController.PUT)
  .post('/playbooks/submit/:id', playbooksController.SUBMIT)
  .post('/playbooks/statusUpdate/:id', playbooksController.STATUS_UPDATE)

  // Playbooks
  .get('/playbooks/:id', middleware.tokenCheck, middleware.adminCheck,playbooksController.GET_ONE)
  .post('/playbooks/assign', middleware.tokenCheck, middleware.adminCheck,playbooksJoinsController.POST)
  .post('/playbooks/assign/delete', middleware.tokenCheck, middleware.adminCheck,playbooksJoinsController.DELETE)

  // Users
  .post('/users/resetPassword/:userId', usersController.RESET_PASSWORD)
  .get('/callback/auth/google', loginController.GOOGLE_AUTH_CODE)
  .get('/callback/auth/linkedIn', loginController.LINKEDIN_AUTH_CODE)
  .get('/callback/auth/slack', loginController.SLACK_AUTH_CODE)

  // Emails
  .post('/sparkpost/webhook/emailSent', emailController.SCHEDULED_PLAYBOOK_SENT)

  // TOKEN Routes (Require a Token)

  // Login to other Services
  .get('/auth/google', middleware.tokenCheck, loginController.GOOGLE_LOGIN)
  .get('/auth/slack', middleware.tokenCheck, loginController.SLACK_LOGIN)
  .get('/auth/linkedIn', middleware.tokenCheck, loginController.LINKEDIN_LOGIN)

  // Roles
  .get('/roles', middleware.tokenCheck, rolesController.GET)

  // Users
  .post('/users/changePassword', middleware.tokenCheck, usersController.CHANGE_PASSWORD)
  .get('/users/:id', middleware.tokenCheck, usersController.GET_ONE)

  // ADMIN Routes (Require a Token and admin privileges)

  // Companies
  .get('/companies', middleware.tokenCheck, middleware.adminCheck, companiesController.GET)
  .post('/companies/:id', middleware.tokenCheck, middleware.adminCheck, companiesController.PUT)

  // Roles
  .post('/roles', middleware.tokenCheck, middleware.adminCheck, rolesController.POST)
  .post('/roles/:id', middleware.tokenCheck, middleware.adminCheck, rolesController.PUT)
  .post('/roles/delete/:id', middleware.tokenCheck, middleware.adminCheck, rolesController.DELETE)

  // Users
  .get('/users', middleware.tokenCheck, middleware.adminCheck, usersController.GET)
  .post('/users', middleware.tokenCheck, middleware.adminCheck, usersController.POST)
  .post('/users/:id', middleware.tokenCheck, middleware.adminCheck, usersController.PUT)
  .post('/users/delete/:id', middleware.tokenCheck, middleware.adminCheck, usersController.DELETE)

  // Emails
  .post('/playbook/send', middleware.tokenCheck, middleware.adminCheck, emailController.SEND_PLAYBOOK)
  .post('/playbook/schedule', middleware.tokenCheck, middleware.adminCheck, emailController.SCHEDULE_PLAYBOOK)
  .post('/playbook/schedule/cancel', middleware.tokenCheck, middleware.adminCheck, emailController.CANCEL_SCHEDULED_PLAYBOOK)

  // Playbooks
  .get('/playbooks', middleware.tokenCheck, middleware.adminCheck, playbooksController.GET)
  .post('/playbooks/delete/:id', middleware.tokenCheck, middleware.adminCheck, playbooksController.DELETE)
  .post('/playbooks/duplicate', middleware.tokenCheck, middleware.adminCheck, playbooksController.DUPLICATE)
  .post('/playbooks/addNewSlide/:id', middleware.tokenCheck, middleware.adminCheck, playbooksController.INSERT_SLIDE)

};
