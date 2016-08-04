// PlaybookJoin Model
const Model = require('objection').Model;
const QueryBuilder = require('objection').QueryBuilder;

const ApiError = require('../utils/customErrors');

function PlaybookJoin() {
  Model.apply(this, arguments);
}

Model.extend(PlaybookJoin);
PlaybookJoin.tableName = 'playbook_joins';

function MyQueryBuilder() {
  QueryBuilder.apply(this, arguments);
}

QueryBuilder.extend(MyQueryBuilder);

// Instance of this is created when you call `query()` or `$query()`.
PlaybookJoin.QueryBuilder = MyQueryBuilder;
// Instance of this is created when you call `$relatedQuery()`.
PlaybookJoin.RelatedQueryBuilder = MyQueryBuilder;

// Timestamp functions
PlaybookJoin.prototype.$beforeInsert = function () {

  this.created_at = new Date().toUTCString();
};

PlaybookJoin.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toUTCString();
};

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
PlaybookJoin.jsonSchema = {
  type: 'object',
  require: [],

  properties: {
    id          : { type: 'integer' },
    playbook_id : { type: 'string' },
    user_id     : { type: 'string' },
    role_id     : { type: 'integer' },
    created_at  : { type: 'object' }
  }
};

PlaybookJoin.relationMappings = {
  users: {
    relation: Model.OneToManyRelation,
    modelClass: __dirname + '/User',
    join: {
      from: 'playbook_joins.user_id',
      to: 'users.id'
    }
  },

  playbooks: {
    relation: Model.OneToManyRelation,
    modelClass: __dirname + '/Playbook',
    join: {
      from: 'playbook_joins.playbook_id',
      to: 'playbooks.id'
    }
  },

  company: {
    relation: Model.OneToOneRelation,
    modelClass: __dirname + '/Company',
    join: {
      from: 'playbook_joins.company_id',
      to: 'companies.id'
    }
  }
};

// Custom Queries
MyQueryBuilder.prototype.post = function(data) {
  return this
    .insert(data)
    .catch((err) => {
      console.error(err.stack);
      throw new ApiError('Database Error', 500, err);
    });
};

MyQueryBuilder.prototype.destroy = function(id) {
  return this
    .del()
    .where('playbook_id', '=', id)
    .catch((err) => {
      console.error(err.stack);
      throw new ApiError('Database Error', 500, err);
    });
};

module.exports = PlaybookJoin;
