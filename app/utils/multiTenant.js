function* getSubdomain(url) {
  // TODO: Need to check that the subdomin belongs to a authorized Company
  if(url.split('.').length < 2) throw 'Incorrect SubDomain';
  return url.split('.')[0].toLowerCase();
}

module.exports = {
  getSubdomain: getSubdomain
};
