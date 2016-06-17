// Company model
const Model = require('objection').Model;
const QueryBuilder = require('objection').QueryBuilder;
const uuid = require('node-uuid');
const ApiError = require('../utils/customErrors');

function Company() {
  Model.apply(this, arguments);
}

Model.extend(Company);
Company.tableName = 'companies';

function MyQueryBuilder() {
  QueryBuilder.apply(this, arguments);
}

QueryBuilder.extend(MyQueryBuilder);

// Instance of this is created when you call `query()` or `$query()`.
Company.QueryBuilder = MyQueryBuilder;
// Instance of this is created when you call `$relatedQuery()`.
Company.RelatedQueryBuilder = MyQueryBuilder;

// Timestamp functions
Company.prototype.$beforeInsert = function () {
  this.created_at = new Date().toUTCString();
};

Company.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toUTCString();
};

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
Company.jsonSchema = {
  type: 'object',
  require: ['name'],

  properties: {
    id            : { type: 'string' },
    name          : { type: 'string', minLength: 1, maxLength: 255},
    address       : {
                      type: 'object',
                      additionalProperties: true
                    },
    created_at    : { type: 'object' },
    updated_at    : { type: 'object' },
    deleted       : { type: 'boolean' },
    subdomain     : { type: 'string' },
    database_host   : { type: 'string' }
  }
};

Company.relationMappings = {
  users: {
    relation: Model.OneToManyRelation,
    modelClass: __dirname + '/User',
    join: {
      from: 'companies.id',
      to: 'users.company_id'
    }
  },

  roles: {
    relation: Model.OneToManyRelation,
    modelClass: __dirname + '/Role',
    join: {
      from: 'companies.id',
      to: 'roles.company_id'
    }
  },

  playbooks: {
    relation: Model.OneToManyRelation,
    modelClass: __dirname + '/Playbook',
    join: {
      from: 'companies.id',
      to: 'playbooks.company_id'
    }
  }

};

// Custom Queries

MyQueryBuilder.prototype.getAll = function () {
    return this
      .select(
        'companies.id', 'companies.name'
      )
      .where('companies.deleted', '=', 'false')
      .orderBy('companies.created_at', 'asc')
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.getCompanyById = function (id) {
    return this
      .where('companies.deleted', '=', 'false')
      .where('companies.id', '=', `${id}`)
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};


MyQueryBuilder.prototype.postCompany = function (data) {
    return this
      .insert(Object.assign(data, {id: uuid.v4()}))
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.putCompany = function (data, companyId) {
    return this
      .where({ id: companyId })
      .patch(data)
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

module.exports = Company;
