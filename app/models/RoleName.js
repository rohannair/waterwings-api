// Role Name model
const db = require('../db');

function RoleName() {
  db.apply(this, arguments);
}

db.extend(RoleName);
RoleName.tableName = 'role_names';

RoleName.prototype.$beforeInsert = function () {
  this.created_at = new Date().toUTCString();
};

RoleName.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toUTCString();
};

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
RoleName.jsonSchema = {
  type: 'object',
  require: ['name'],

  properties: {
    id            : { type: 'integer' },
    name          : { type: 'string' },
    created_at    : { type: 'object' },
    updated_at    : { type: 'object' }
  }
};

RoleName.relationMappings = {
  roles: {
    relation: db.OneToManyRelation,
    modelClass: require('./Role.js'),
    join: {
      from: 'role_names.id',
      to: 'roles.role_name_id'
    }
  }
};

module.exports = RoleName;
