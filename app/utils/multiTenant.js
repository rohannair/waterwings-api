const ApiError = require('./customErrors');

function* getSubdomain(url) {
  // TODO: Need to check that the subdomin belongs to a authorized Company
  if(url.split('.').length < 2) throw new ApiError('No subdomain was provided for request', 404, 'Request is missing subdomain');
  return url.split('.')[0].toLowerCase();
}

module.exports = {
  getSubdomain: getSubdomain
};
