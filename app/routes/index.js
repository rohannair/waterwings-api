// Controllers
const usersController = require('../controllers/usersController')();
const loginController = require('../controllers/loginController');

module.exports = function configure(router) {

  // Users
  router
  .get('/users', usersController.GET)
  .post('/users', usersController.POST)
  .put('/users/:id', usersController.PUT)
  .delete('/users/:id', usersController.DELETE)

  // Login
  .post('/login', loginController.POST);
};



