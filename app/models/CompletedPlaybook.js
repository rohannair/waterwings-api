// Completed Playbooks model
const Model = require('objection').Model;
const QueryBuilder = require('objection').QueryBuilder;
const uuid = require('node-uuid');

function CompletedPlaybook() {
  Model.apply(this, arguments);
}

Model.extend(CompletedPlaybook);
CompletedPlaybook.tableName = 'completed_playbooks';

function MyQueryBuilder() {
  QueryBuilder.apply(this, arguments);
}

QueryBuilder.extend(MyQueryBuilder);

// Instance of this is created when you call `query()` or `$query()`.
CompletedPlaybook.QueryBuilder = MyQueryBuilder;
// Instance of this is created when you call `$relatedQuery()`.
CompletedPlaybook.RelatedQueryBuilder = MyQueryBuilder;

// Timestamp functions
CompletedPlaybook.prototype.$beforeInsert = function () {
  this.created_at = new Date().toUTCString();
};

CompletedPlaybook.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toUTCString();
};

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
CompletedPlaybook.jsonSchema = {
  type: 'object',
  require: ['doc'],

  properties: {
    id          : { type: 'string' },
    playbook_id   : { type: 'string' },
    user_id     : { type: 'string' },
    company_id  : { type: 'integer' },
    results     : {
                    type: 'object',
                    properties: {
                      body: 'string'
                    },
                    additionalProperties: true
                  },
    created_at    : { type: 'object' },
    updated_at    : { type: 'object' },
    deleted       : { type: 'boolean' }
  }
};

CompletedPlaybook.relationMappings = {
  playbook: {
    relation: Model.OneToOneRelation,
    modelClass: __dirname + '/Playbook',
    join: {
      from: 'completed_playbooks.playbook_id',
      to: 'playbooks.id'
    }
  },

  company: {
    relation: Model.OneToOneRelation,
    modelClass: __dirname + '/Company',
    join: {
      from: 'completed_playbooks.company_id',
      to: 'companies.id'
    }
  },

  user: {
    relation: Model.OneToOneRelation,
    modelClass: __dirname + '/User',
    join: {
      from: 'completed_playbooks.user_id',
      to: 'users.id'
    }
  }
};

// Custom Queries

MyQueryBuilder.prototype.getAll = function () {
    return this
              .select(
                'completed_playbooks.id', 'completed_playbooks.playbook_id', 'completed_playbooks.user_id', 'completed_playbooks.company_id', 'completed_playbooks.results'
              )
              .where('completed_playbooks.deleted', '=', 'false')
              .orderBy('completed_playbooks.created_at', 'asc')
              .then((result) => result)
              .catch((err) => { throw err });
};

MyQueryBuilder.prototype.getCompletedPlaybookById = function (completedPlaybookId) {
    return this
              .select(
                'completed_playbooks.id', 'completed_playbooks.playbook_id', 'completed_playbooks.user_id', 'completed_playbooks.company_id', 'completed_playbooks.results'
              )
              .where('completed_playbooks.id', '=', `${completedPlaybookId}`)
              .where('completed_playbooks.deleted', '=', 'false')
              .then((result) => result)
              .catch((err) => { throw err });
};

MyQueryBuilder.prototype.postCompletedPlaybook = function (data) {
    return this
            .insert({ ...data, id: uuid.v4() } )
            .then((result) => result)
            .catch((err) => { throw err });
};

MyQueryBuilder.prototype.putCompletedPlaybook = function (data, completedPlaybookId) {
    return this
              .where({ id: completedPlaybookId })
              .patch(data)
              .then((result) => result)
              .catch((err) => { throw err });
};

module.exports = CompletedPlaybook;
