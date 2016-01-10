// User model
const db = require('../db');

function User() {
  db.apply(this, arguments);
}

db.extend(User);
User.tableName = 'users';

User.jsonSchema = {
  type: 'object',
  require: ['email'],

  properties: {
    id          : { type: 'integer' },
    first_name  : { type: 'string' },
    last_name   : { type: 'string' },
    email       : { type: 'string' },
    is_admin    : { type: 'boolean' },
    company_id  : { type: 'integer' },
    package_id  : { type: 'integer' },
    work_email  : { type: 'string' },
    created_at  : { },
    updated_at  : { },
  }
};

User.relationMappings = {};

module.exports = User;
