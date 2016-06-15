// Router

// Middleware
const middleware = require('../utils/middleware/index');

// Controllers
const loginController  = require('../controllers/loginController')();
const companiesController = require('../controllers/companiesController')();
const usersController  = require('../controllers/usersController')();
const rolesController = require('../controllers/rolesController')();
const playbooksController = require('../controllers/playbooksController')();
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

  // File Service
  .post('/upload', fileServiceController.UPLOAD)

  .get('/playbooks/:id', playbooksController.GET_ONE)
  .post('/playbooks', playbooksController.POST)
  .post('/playbooks/:id', playbooksController.PUT)
  .post('/playbooks/submit/:id', playbooksController.SUBMIT)
  .post('/playbooks/statusUpdate/:id', playbooksController.STATUS_UPDATE)

  // TOKEN Routes (Require a Token)

  // Roles
  .get('/roles', middleware.tokenCheck, rolesController.GET)

  // Users
  .post('/users/changePassword', middleware.tokenCheck, usersController.CHANGE_PASSWORD)
  .get('/users/:id', middleware.tokenCheck, usersController.GET_ONE)

  // ADMIN Routes (Require a Token and admin privileges)

  // Companies
  .get('/companies', middleware.tokenCheck, middleware.adminCheck, companiesController.GET)
  .post('/companies', middleware.tokenCheck, middleware.adminCheck, companiesController.POST)
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
  .post('/playbook/send', middleware.tokenCheck, middleware.adminCheck, emailController.POST)

  // Playbooks
  .get('/playbooks', middleware.tokenCheck, middleware.adminCheck, playbooksController.GET)
  .post('/playbooks/delete/:id', middleware.tokenCheck, middleware.adminCheck, playbooksController.DELETE)
  .post('/playbooks/duplicate', middleware.tokenCheck, middleware.adminCheck, playbooksController.DUPLICATE)

};
