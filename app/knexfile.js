const hostLocation = process.env.NODE_ENV === 'production' ? '172.31.20.4' : 'localhost';
const knex = require('knex');

module.exports = function () {
  console.log(hostLocation);
  return knex(
    {
      client: 'pg',
      connection: {
        host     : hostLocation,
        user     : 'root',
        password : 'password',
        database : 'quartermasterdb',
        charset  : 'utf8'
      },
      pool: {
        min: 0,
        max: 7
      }
    }
  )
}
