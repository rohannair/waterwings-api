// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host     : 'localhost',
      user     : 'root',
      password : 'password',
      database : 'waterwings',
      charset  : 'utf8'
    },
    pool: {
      min: 0,
      max: 1
    },
  }

};
