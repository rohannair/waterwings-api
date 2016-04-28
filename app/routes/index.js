// Import Models
const Company = require('../models/Company');
const User = require('../models/User');
const Role = require('../models/Role');
const Playbook = require('../models/Playbook');
const CompletedPlaybook = require('../models/CompletedPlaybook');

// Import Controllers and load models into them
const loginController  = require('../controllers/loginController');
const companiesController = require('../controllers/companiesController')(Company, User);
const usersController  = require('../controllers/usersController')(User);
const rolesController = require('../controllers/rolesController')(Role, User);
const playbooksController = require('../controllers/playbooksController')(Playbook, User);
const completedPlaybooksController = require('../controllers/completedPlaybooksController')(CompletedPlaybook, User);
const uploadsController = require('../controllers/uploadsController');

module.exports = function configure(router) {

  router

  // Login
  .post('/register', loginController.REGISTER)
  .post('/login', loginController.LOGIN)

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
  .delete('/completedPlaybooks/:id', completedPlaybooksController.DELETE)

  // Uploads
  .post('/upload', uploadsController.POST)

  /**
   * Dear team,
   *
   * LEAVE THE DAMN SEMI-COLON OFF IN THIS FILE
   *
   *                                  <3 Rohan
   */
};
