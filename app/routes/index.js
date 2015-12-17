import changeCase from 'change-case';
import express from 'express';

const routes = {'users': 'users'} // Need to glob import all routes in here...

const initRouter = function(app) {

  // Initialize routes
  Object.keys(routes).forEach( function(routeName) {

    // Initialize route
    let router = express.Router();
    require('./' + routeName + '.js')(router);

    // Set app to use routes
    app.use('/' + changeCase.paramCase(routeName), router);
  });
}

export default initRouter;
