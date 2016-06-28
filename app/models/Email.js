// Email model
const Model = require('objection').Model;
const QueryBuilder = require('objection').QueryBuilder;
const uuid = require('node-uuid');
const ApiError = require('../utils/customErrors');

function Email() {
  Model.apply(this, arguments);
}

Model.extend(Email);
Email.tableName = 'emails';

function MyQueryBuilder() {
  QueryBuilder.apply(this, arguments);
}

QueryBuilder.extend(MyQueryBuilder);

// Instance of this is created when you call `query()` or `$query()`.
Email.QueryBuilder = MyQueryBuilder;
// Instance of this is created when you call `$relatedQuery()`.
Email.RelatedQueryBuilder = MyQueryBuilder;

// Timestamp functions
Email.prototype.$beforeInsert = function () {
  this.created_at = new Date().toUTCString();
};

Email.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toUTCString();
};

Email.jsonSchema = {
  type: 'object',
  require: ['name'],

  properties: {
    name: { type: 'string', minLength: 1, maxLength: 50},
    description: { type: 'string', minLength: 1, maxLength: 255},
    body: {
      type: 'object',
      properties: {
        body: 'string'
      },
      additionalProperties: true
    },

    company_id : { type: 'string' },
    created_at: { type: 'object' },
    updated_at: { type: 'object' },
  }
};

Email.relationMappings = {
  company: {
    relation: Model.OneToOneRelation,
    modelClass: __dirname + '/Company',
    join: {
      from: 'emails.company_id',
      to: 'companies.id'
    }
  },

  role: {
    relation: Model.OneToOneRelation,
    modelClass: __dirname + '/Role',
    join: {
      from: 'emails.role_id',
      to: 'roles.id'
    }
  }
};


MyQueryBuilder.prototype.getAll = function (companyId, offset = 0, limit = 1000) {
    return this
      .select('id', 'name', 'description', 'company_id', 'updated_at')
      .where('emails.company_id', '=', companyId)
      .orderBy('emails.created_at', 'asc')
      .range(+offset, (+offset) + (+limit) - 1)
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.getOne = function (emailId) {
    return this
      .select('id', 'name', 'description', 'company_id', 'body', 'updated_at')
      .where('emails.company_id', '=', companyId)
      .where('emails.id', '=', emailId)
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

module.exports = Email;
