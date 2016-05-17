// Role model
const Model = require('objection').Model;
const QueryBuilder = require('objection').QueryBuilder;
const uuid = require('node-uuid');

function Role() {
  Model.apply(this, arguments);
}

Model.extend(Role);
Role.tableName = 'roles';

function MyQueryBuilder() {
  QueryBuilder.apply(this, arguments);
}

QueryBuilder.extend(MyQueryBuilder);

// Instance of this is created when you call `query()` or `$query()`.
Role.QueryBuilder = MyQueryBuilder;
// Instance of this is created when you call `$relatedQuery()`.
Role.RelatedQueryBuilder = MyQueryBuilder;

// Timestamp functions
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
  users: {
    relation: Model.OneToManyRelation,
    modelClass: __dirname + '/User',
    join: {
      from: 'roles.id',
      to: 'users.role_id'
    }
  },

  playbooks: {
    relation: Model.OneToManyRelation,
    modelClass: __dirname + '/Playbook',
    join: {
      from: 'roles.id',
      to: 'playbooks.role_id'
    }
  },

  company: {
    relation: Model.OneToOneRelation,
    modelClass: __dirname + '/Company',
    join: {
      from: 'roles.company_id',
      to: 'companies.id'
    }
  }
};

// Custom Queries

MyQueryBuilder.prototype.getAll = function (companyId) {
    return this
              .select(
                'roles.id', 'roles.name'
              )
              .where('roles.deleted', '=', 'false')
              .where('roles.company_id', '=', `${companyId}`)
              .then((result) => result)
              .catch((err) => { throw err });
};

MyQueryBuilder.prototype.postRole = function (data) {
    return this
            .insert(data)
            .then((result) => result)
            .catch((err) => { throw err });
};

MyQueryBuilder.prototype.putRole = function (data, roleId) {
    return this
              .where({ id: roleId })
              .patch(data)
              .then((result) => result)
              .catch((err) => { throw err });
};

module.exports = Role;
