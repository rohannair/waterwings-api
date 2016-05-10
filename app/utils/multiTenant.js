const knex = require('knex')

function* getSubdomain(url) {
  let subdomain = url.split('.');
  if(subdomain.length < 2) throw 'Incorrect SubDomain';
  return subdomain[0].toLowerCase();
}

function* clientCreator(user) {
    return knex(
      {
      client: 'pg',
      connection: {
        host     : 'localhost',
        user     : `${user}`,
        password : 'password',
        database : 'quartermasterdb',
        charset  : 'utf8'
      },
      pool: {
        min: 0,
        max: 7
      },
      // debug: true
    }
  )
}

module.exports = {
  getSubdomain: getSubdomain,
  clientCreator: clientCreator
};
