// Role model
const db = require('../db');
const uuid = require('node-uuid');

export function Role() {
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
    name          : { type: 'string' },
    company_id    : { type: 'string' },
    created_at    : { type: 'object' },
    updated_at    : { type: 'object' },
    deleted       : { type: 'boolean' }
  }
};

Role.relationMappings = {
  // employees: {
  //   relation: db.OneToManyRelation,
  //   modelClass: require('./User.js'),
  //   join: {
  //     from: 'roles.id',
  //     to: 'users.role_id'
  //   }
  // },
  //
  // playbooks: {
  //   relation: db.OneToManyRelation,
  //   modelClass: require('./Playbook.js'),
  //   join: {
  //     from: 'roles.id',
  //     to: 'playbooks.role_id'
  //   }
  // },
  //
  // company: {
  //   relation: db.OneToOneRelation,
  //   modelClass: require('./Company.js'),
  //   join: {
  //     from: 'roles.company_id',
  //     to: 'companies.id'
  //   }
  // }
};

// Database Queries

export function getRole(queryData) {
  return Role
          .query()
          .where(queryData)
          .where('roles.deleted', '=', 'false')
          .then((result) => result)
          .catch((err) => { throw err });
}

export function postRole(data) {
  return Role
          .query()
          .insert(data)
          .then((result) => result )
          .catch((err) => { throw err });
}

export function putRole(data, roleId) {
  return Role
          .query()
          .where({ id: roleId })
          .patch(data)
          .then((result) => result)
          .catch((err) => { throw err });
}
