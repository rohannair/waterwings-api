// Controllers
const usersController = require('../controllers/usersController')();
module.exports = function configure(router) {

  // Users
  router
    .get('/users', usersController.GET)
    .post('/users', usersController.POST)
    .put('/users', usersController.PUT)
    .delete('/users', usersController.DELETE);
};

