import changeCase from 'change-case';
import express from 'express';

// User routes
import usersRoute from './users.js';

const initRouter = function(app) {
  // Initialize route
  const router = express.Router();
  usersRoute(router);

  // Set app to use routes
  app.use('/' + changeCase.paramCase('users'), router);
};

export default initRouter;
