//
const knex = require('knex')({
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
    max: 7
  },
  debug: true,
});

const Model = require('objection').Model;
Model.knex(knex);

module.exports = Model;
