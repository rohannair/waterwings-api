// Router

// Middleware
const authorize = require('../utils/middleware/authorize');

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

  // Companies
  .get('/companies', companiesController.GET)
  .put('/companies/:id', companiesController.PUT)

  // Users
  .get('/users', usersController.GET)
  .get('/users/:id', usersController.GET_ONE)
  .post('/users', usersController.POST)
  .put('/users/:id', usersController.PUT)
  .delete('/users/:id', usersController.DELETE)
  .post('/users/changePassword', usersController.CHANGE_PASSWORD)

  // Roles
  .get('/roles', rolesController.GET)
  .post('/roles', rolesController.POST)
  .put('/roles/:id', rolesController.PUT)
  .delete('/roles/:id', rolesController.DELETE)

  // Playbooks
  .get('/playbooks', playbooksController.GET)
  .get('/playbooks/:id', playbooksController.GET_ONE)
  .post('/playbooks', playbooksController.POST)
  .put('/playbooks/:id', playbooksController.PUT)
  .delete('/playbooks/:id', playbooksController.DELETE)
  .post('/playbooks/duplicate', playbooksController.DUPLICATE)
  .post('/playbooks/submit/:id', playbooksController.SUBMIT)
  .post('/playbooks/statusUpdate/:id', playbooksController.STATUS_UPDATE)

  // File Service
  .post('/upload', fileServiceController.UPLOAD)

  // Emails
  .post('/playbook/send', emailController.POST)

};
