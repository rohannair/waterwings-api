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

  // Users
  .get('/users/:id', usersController.GET_ONE)

  // File Service
  .post('/upload', fileServiceController.UPLOAD)

  // Playbooks
  .get('/playbooks/:id', playbooksController.GET_ONE)
  .post('/playbooks', playbooksController.POST)
  .put('/playbooks/:id', playbooksController.PUT)
  .post('/playbooks/submit/:id', playbooksController.SUBMIT)
  .post('/playbooks/statusUpdate/:id', playbooksController.STATUS_UPDATE)

  // TOKEN Routes (Require a Token)

  // Roles
  .get('/roles', middleware.tokenCheck, rolesController.GET)

  // Users
  .post('/users/changePassword', middleware.tokenCheck, usersController.CHANGE_PASSWORD)

  // ADMIN Routes (Require a Token and admin privileges)

  // Companies
  .get('/companies', middleware.tokenCheck, middleware.adminCheck, companiesController.GET)
  .put('/companies/:id', middleware.tokenCheck, middleware.adminCheck, companiesController.PUT)

  // Roles
  .post('/roles', middleware.tokenCheck, middleware.adminCheck, rolesController.POST)
  .put('/roles/:id', middleware.tokenCheck, middleware.adminCheck, rolesController.PUT)
  .delete('/roles/:id', middleware.tokenCheck, middleware.adminCheck, rolesController.DELETE)

  // Users
  .get('/users', middleware.tokenCheck, middleware.adminCheck, usersController.GET)
  .post('/users', middleware.tokenCheck, middleware.adminCheck, usersController.POST)
  .put('/users/:id', middleware.tokenCheck, middleware.adminCheck, usersController.PUT)
  .delete('/users/:id', middleware.tokenCheck, middleware.adminCheck, usersController.DELETE)

  // Emails
  .post('/playbook/send', middleware.tokenCheck, middleware.adminCheck, emailController.POST)

  // Playbooks
  .get('/playbooks', middleware.tokenCheck, middleware.adminCheck, playbooksController.GET)
  .delete('/playbooks/:id', middleware.tokenCheck, middleware.adminCheck, playbooksController.DELETE)
  .post('/playbooks/duplicate', middleware.tokenCheck, middleware.adminCheck, playbooksController.DUPLICATE)

};
