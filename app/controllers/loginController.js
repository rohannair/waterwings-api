const passport = require('koa-passport');

// Module pattern to inject authentication lib
module.exports = (function(auth) {
  function* POST() {
    this.status = 404;
  }

  return {
    POST: POST,
  };
})();
