// Playbooks model
const Model = require('objection').Model;
const QueryBuilder = require('objection').QueryBuilder;
const uuid  = require('node-uuid');
const merge = require('ramda').merge;

function Playbook() {
  Model.apply(this, arguments);
}

Model.extend(Playbook);
Playbook.tableName = 'playbooks';

function MyQueryBuilder() {
  QueryBuilder.apply(this, arguments);
}

QueryBuilder.extend(MyQueryBuilder);

// Instance of this is created when you call `query()` or `$query()`.
Playbook.QueryBuilder = MyQueryBuilder;
// Instance of this is created when you call `$relatedQuery()`.
Playbook.RelatedQueryBuilder = MyQueryBuilder;

// Custom Functions

// Timestamp functions
Playbook.prototype.$beforeInsert = function () {
  this.created_at = new Date().toUTCString();
  this.updated_at = new Date().toUTCString();
};

Playbook.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toUTCString();
};


// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
Playbook.jsonSchema = {
  type: 'object',
  require: ['doc'],

  properties: {
    id          : { type: 'string' },
    name        : { type: 'string', minLength: 1, maxLength: 100 },
    description : { type: 'string', minLength: 1, maxLength: 255 },
    company_id  : { type: 'string' },
    // role_id     : {type: 'integer' },
    doc         : {
                    type: 'object',
                    properties: {
                      body: 'string'
                    },
                    additionalProperties: true
                  },
    created_at  : { type: 'object' },
    updated_at  : { type: 'object' },
    deleted     : { type: 'boolean' }
  }
};

Playbook.relationMappings = {
  company: {
    relation: Model.OneToOneRelation,
    modelClass: __dirname + '/Company',
    join: {
      from: 'playbooks.company_id',
      to: 'companies.id'
    }
  },

  role: {
    relation: Model.OneToOneRelation,
    modelClass: __dirname + '/Role',
    join: {
      from: 'playbooks.role_id',
      to: 'roles.id'
    }
  },

  completed_playbooks: {
    relation: Model.OneToManyRelation,
    modelClass: __dirname + '/CompletedPlaybook',
    join: {
      from: 'playbooks.id',
      to: 'completed_playbooks.playbook_id'
    }
  }
};

// Custom Queries

MyQueryBuilder.prototype.getAll = function (companyId) {
    return this
              .select(
                'playbooks.id', 'playbooks.name', 'playbooks.description', 'playbooks.company_id', 'playbooks.doc'
              )
              .where('playbooks.deleted', '=', 'false')
              .where('playbooks.company_id', '=', `${companyId}`)
              .orderBy('playbooks.created_at', 'asc')
              .then((result) => result)
              .catch((err) => { throw err });
};

MyQueryBuilder.prototype.getPlaybookById = function (playbookId) {
    return this
              .select(
                'playbooks.id', 'playbooks.name', 'playbooks.description', 'playbooks.company_id', 'playbooks.doc'
              )
              .where('playbooks.id', '=', `${playbookId}`)
              .where('playbooks.deleted', '=', 'false')
              .then((result) => result)
              .catch((err) => { throw err });
};

MyQueryBuilder.prototype.postPlaybook = function (data) {
    return this
            .insert({ ...data, id: uuid.v4() } )
            .then((result) => result)
            .catch((err) => { throw err });
};

MyQueryBuilder.prototype.putPlaybook = function (data, playbookId) {
    return this
              .where({ id: playbookId })
              .patch(data)
              .returning('*')
              .then((result) => result)
              .catch((err) => { throw err });
};

MyQueryBuilder.prototype.duplicatePlaybook = function (playbookId) {
    return this
              .select(
                'playbooks.id', 'playbooks.name', 'playbooks.description', 'playbooks.company_id', 'playbooks.doc'
              )
              .where('playbooks.id', '=', `${playbookId}`)
              .where('playbooks.deleted', '=', 'false')
              .then((data) => { return merge(data[0], { name: data[0].name + ' (Copy)' }) })
              .catch((err) => { throw err });
};

module.exports = Playbook;
