// Router

// Controllers
const loginController  = require('../controllers/loginController');
const companiesController = require('../controllers/companiesController')();
const usersController  = require('../controllers/usersController')();
const rolesController = require('../controllers/rolesController')();
const playbooksController = require('../controllers/playbooksController')();
const completedPlaybooksController = require('../controllers/completedPlaybooksController')();

module.exports = function configure(router) {

  router

  // Login
  .put('/register', loginController.PUT)
  .post('/login', loginController.POST)

  // Companies
  .get('/companies', companiesController.GET)
  .post('/companies', companiesController.POST)
  .put('/companies/:id', companiesController.PUT)
  .delete('/companies/:id', companiesController.DELETE)

  // Users
  .get('/users', usersController.GET)
  .get('/users/:id', usersController.GET_ONE)
  .post('/users', usersController.POST)
  .put('/users/:id', usersController.PUT)
  .delete('/users/:id', usersController.DELETE)

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

  // Completed Playbooks
  .get('/completedPlaybooks', completedPlaybooksController.GET)
  .post('/completedPlaybooks', completedPlaybooksController.POST)
  .put('/completedPlaybooks/:id', completedPlaybooksController.PUT)
  .delete('/completedPlaybooks/:id', completedPlaybooksController.DELETE);

};
