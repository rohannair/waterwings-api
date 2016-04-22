// Role model
const db = require('../db');

function Role() {
  db.apply(this, arguments);
}

db.extend(Role);
Role.tableName = 'roles';

Role.prototype.$beforeInsert = function () {
  this.created_at = new Date().toUTCString();
};

Role.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toUTCString();
};

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
Role.jsonSchema = {
  type: 'object',
  require: [],

  properties: {
    id            : { type: 'integer' },
    role_name_id  : { type: 'integer' },
    company_id    : { type: 'string' },
    created_at    : { type: 'object' },
    updated_at    : { type: 'object' }
  }
};

Role.relationMappings = {
  employees: {
    relation: db.OneToManyRelation,
    modelClass: require('./User.js'),
    join: {
      from: 'roles.id',
      to: 'users.role_id'
    }
  },

  names: {
    relation: db.OneToOneRelation,
    modelClass: require('./RoleName.js'),
    join: {
      from: 'roles.role_name_id',
      to: 'role_names.id'
    }
  },

  surveys: {
    relation: db.OneToManyRelation,
    modelClass: require('./Survey.js'),
    join: {
      from: 'roles.id',
      to: 'surveys.role_id'
    }
  },

  company: {
    relation: db.OneToOneRelation,
    modelClass: require('./Company.js'),
    join: {
      from: 'roles.company_id',
      to: 'companies.id'
    }
  }
};

module.exports = Role;
