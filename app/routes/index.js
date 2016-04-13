// Controllers
const usersController  = require('../controllers/usersController');
const loginController  = require('../controllers/loginController');
const surveyController = require('../controllers/surveyController');

module.exports = function configure(router) {

  // Users
  router
  .get('/users', usersController.GET)
  .post('/users', usersController.POST)
  .put('/users/:id', usersController.PUT)
  .delete('/users/:id', usersController.DELETE)

  // Login
  .put('/register', loginController.PUT)
  .post('/login', loginController.POST)

  // Surveys
  .get('/surveys', surveyController.GET)
  .get('/surveys/:id', surveyController.GET_ONE)
  .post('/surveys/:id', surveyController.POST)
  .put('/surveys', surveyController.PUT)

  // Survey Results
  .post('/submitSurvey', usersController.PUT_RESULT);
};
