const usersRoute = function(router) {
  router.route('/')
  .get(function(req, res, next) {
    console.log('Hi');
    next();
  })
  .post(function(req, res, next) {
    next();
  });
};

export default usersRoute;
