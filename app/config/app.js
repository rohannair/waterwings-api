module.exports = (function() {

  let jwtSecret = 'rohan 12345';

  function get(param) {
    if (param) return param;

    return 'Parameter doesn\'t exist';
  }

  return {
    get: get,
  };

})();
