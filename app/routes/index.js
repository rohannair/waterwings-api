// Router

// Middleware
const authorize = require('../utils/middleware/authorize');

// Controllers
const loginController  = require('../controllers/loginController')();
const companiesController = require('../controllers/companiesController')();
const usersController  = require('../controllers/usersController')();
const rolesController = require('../controllers/rolesController')();
const playbooksController = require('../controllers/playbooksController')();
const uploadsController = require('../controllers/uploadsController');
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

  // Companies
  .get('/companies', authorize, companiesController.GET)
  .post('/companies', authorize, companiesController.POST)
  .put('/companies/:id', authorize, companiesController.PUT)

  // Users
  .get('/users', authorize, usersController.GET)
  .get('/users/:id', usersController.GET_ONE)
  .post('/users', authorize, usersController.POST)
  .put('/users/:id', authorize, usersController.PUT)
  .delete('/users/:id', authorize, usersController.DELETE)

  // Roles
  .get('/roles', authorize, rolesController.GET)
  .post('/roles', authorize, rolesController.POST)
  .put('/roles/:id', authorize, rolesController.PUT)
  .delete('/roles/:id', authorize, rolesController.DELETE)

  // Playbooks
  .get('/playbooks', authorize, playbooksController.GET)
  .get('/playbooks/:id', playbooksController.GET_ONE)
  .post('/playbooks', playbooksController.POST)
  .put('/playbooks/:id', playbooksController.PUT)
  .delete('/playbooks/:id', authorize, playbooksController.DELETE)
  .post('/playbooks/duplicate', authorize, playbooksController.DUPLICATE)
  .post('/playbooks/submit/:id', playbooksController.SUBMIT)
  .post('/playbooks/statusUpdate/:id', playbooksController.STATUS_UPDATE)


  // Uploads
  .post('/upload', uploadsController.POST)

  // Emails
  .post('/playbook/send', authorize, emailController.POST)

};
