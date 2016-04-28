// Dependencies
const jwt      = require('koa-jwt');

// Models
import { User } from '../models/User';

// Controller
const loginController = (function() {

  function* REGISTER() {
    const self    = this;
    const request = yield parse(this.req);
    const salt    = yield bcrypt.genSalt(10);

    const hash    = yield bcrypt.hash(request.password, salt);
    const payload = { ...request, password: hash };

    yield User
    .query()
    .insert(payload)
    .then(function(model) {
      console.log(chalk.green.bold('--- POST', JSON.stringify(model, null, 4)));
      self.body = {token: model.token};
    });
  }

  function* LOGIN() {
    const self    = this;
    const request = yield parse(this.req);


    yield User
    .query()
    .where('email', request.email)
    .then(function(response) {

      if (bcryptjs.compareSync(request.password, response[0].password)) {
        self.body = { token: jwt.sign(response[0], 'shared') };
      } else {
        self.status = 401;
        self.body = { status: 401, message: 'Wrong password' };
      }
    })
    .catch(function(err) {
      if (self.status === 404) {
        self.body = {
          message: 'Wrong username'
        };
      }
      console.log(chalk.red.bold(err));
    });
  }

  return {
    REGISTER: REGISTER,
    LOGIN: LOGIN
  };
})();

module.exports = loginController;
