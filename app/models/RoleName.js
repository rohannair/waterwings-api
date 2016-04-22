// RoleName model
const db = require('../db');

function RoleName() {
  db.apply(this, arguments);
}

db.extend(RoleName);
RoleName.tableName = 'role_names';

RoleName.prototype.$beforeInsert = function () {
  this.created_at = new Date().toISOString();
};

RoleName.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toISOString();
};

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
RoleName.jsonSchema = {
  type: 'object',
  require: ['name'],

  properties: {
    id            : { type: 'integer' },
    name          : { type: 'string' },
    created_at    : { type: 'string' },
    updated_at    : { type: 'string' }
  }
};

RoleName.relationMappings = {
  roles: {
    relation: db.OneToManyRelation,
    modelClass: __dirname + '/Role',
    join: {
      from: 'role_names.id',
      to: 'roles.role_name_id'
    }
  }
};

module.exports = RoleName;
