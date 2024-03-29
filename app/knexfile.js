const knex = require('knex');

module.exports = function () {
  return knex(
    {
      client: 'pg',
      connection: {
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        charset  : 'utf8',
        ssl : process.env.NODE_ENV === 'production'
      },
      pool: {
        min: 0,
        max: 10
      }
    }
  )
}
