// Controllers
const loginController  = require('../controllers/loginController');
const companiesController = require('../controllers/companiesController');
const usersController  = require('../controllers/usersController');
const rolesController = require('../controllers/rolesController');
const surveysController = require('../controllers/surveyController');
const completedSurveysController = require('../controllers/completedSurveysController');


module.exports = function configure(router) {

  router

  // Login
  .put('/register', loginController.PUT)
  .post('/login', loginController.POST)

  // Companies
  .get('/companies', companiesController.GET)
  .post('/companies', companiesController.POST)
  .put('/companies', companiesController.PUT)
  .delete('/companies/:id', companiesController.DELETE)

  // Users
  .get('/users', usersController.GET)
  .post('/users', usersController.POST)
  .put('/users/:id', usersController.PUT)
  .delete('/users/:id', usersController.DELETE)

  // Roles
  .get('/roles', rolesController.GET)
  .post('/roles', rolesController.POST)
  .put('/roles/:id', rolesController.PUT)
  .delete('/roles/:id', rolesController.DELETE)

  // Surveys
  .get('/surveys', surveysController.GET)
  .get('/surveys/:id', surveysController.GET_ONE)
  .post('/surveys', surveysController.POST)
  .put('/surveys/:id', surveysController.PUT)
  .delete('/surveys/:id', surveysController.DELETE)
  .post('/surveys/duplicate', surveysController.DUPLICATE)

  // Completed Surveys
  .get('/completedSurveys', completedSurveysController.GET)
  .post('/completedSurveys', completedSurveysController.POST)
  .put('/completedSurveys/:id', completedSurveysController.PUT)
  .delete('/completedSurveys/:id', completedSurveysController.DELETE);

};
