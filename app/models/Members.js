// Member model
const db = require('../db');

function Member() {
  db.apply(this, arguments);
}

db.extend(Member);
Member.tableName = 'members';

Member.jsonSchema = {
  type: 'object',
  require: ['email', 'password'],

  properties: {
    id      : { type: 'integer' },
    email   : { type: 'string' },
    password: { type: 'string', minLength: 6 },
    token   : { type: 'string'}
  }
};

Member.relationMappings = {};

module.exports = Member;
