const knex = require('knex')
// const hostLocation = process.env.NODE_ENV === 'production' ? '172.31.20.4' : 'localhost';

function* getSubdomain(url) {
  // TODO: Need to check that the subdomin belongs to a authorized Company
  if(url.split('.').length < 2) throw 'Incorrect SubDomain';
  return url.split('.')[0].toLowerCase();
}

function* clientCreator() {
  return knex(
    {
      client: 'pg',
      connection: {
        host     : '172.31.20.4',
        user     : `root`,
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
