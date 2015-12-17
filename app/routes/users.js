const route = function(router) {

  router.route('/')
  .get( function(req, res, next) {
    console.log('Method: GET');
    next();
  })
  .post( function(req, res, next) {
    console.log('Method: POST');
    next();
  });
}

export default route;
