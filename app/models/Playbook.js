// Playbooks model
const Model = require('objection').Model;
const QueryBuilder = require('objection').QueryBuilder;
const uuid  = require('node-uuid');
const merge = require('ramda').merge;
const ApiError = require('../utils/customErrors');

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
    deleted     : { type: 'boolean' },
    collaborators : { type: 'array' },
    assigned    : { type: ['string', 'null'] },
    current_status : { type: 'string' },
    submitted_doc : {
                    type: 'object',
                    properties: {
                      body: 'string'
                    },
                    additionalProperties: true
                  },
    percent_submitted: { type: 'number' }
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
  }

};

// Custom Queries

// Set a limit of 1000 users per call if no limit is provided
// TODO: Need to figure out what limit we should use
MyQueryBuilder.prototype.getAll = function (companyId, offset = 0, limit = 1000) {
    return this
      .select(
        'playbooks.id', 'playbooks.name', 'playbooks.description', 'playbooks.company_id', 'playbooks.doc', 'playbooks.assigned', 'playbooks.submitted_doc', 'playbooks.updated_at','playbooks.current_status', 'playbooks.percent_submitted', 'users.first_name as firstName', 'users.last_name as lastName', 'email_messages.scheduled_for as scheduledFor'
      )
      .leftJoin('users', 'playbooks.assigned', 'users.id')
      .leftJoin('email_messages', 'playbooks.id', 'email_messages.playbook_id')
      .where('playbooks.deleted', '=', 'false')
      .where('playbooks.company_id', '=', `${companyId}`)
      .orderBy('playbooks.created_at', 'asc')
      .range(+offset, (+offset) + (+limit) - 1)
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.getPlaybookById = function (playbookId) {
    return this
      .select(
        'playbooks.id', 'playbooks.name', 'playbooks.description', 'playbooks.company_id', 'playbooks.doc', 'playbooks.assigned', 'playbooks.submitted_doc', 'playbooks.current_status', 'playbooks.percent_submitted',
        'users.id as userId', 'users.username', 'users.first_name as firstName', 'users.last_name as lastName', 'users.is_admin',
        'roles.name as rolename', 'email_messages.scheduled_for as scheduledFor'
      )
      .leftJoin('users', 'playbooks.assigned', 'users.id')
      .leftJoin('roles', 'users.role_id', 'roles.id')
      .leftJoin('email_messages', 'playbooks.id', 'email_messages.playbook_id')
      .where('playbooks.id', '=', `${playbookId}`)
      .where('playbooks.deleted', '=', 'false')
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.getPublishedPlaybookById = function (playbookId) {
    return this
      .select(
        'playbooks.id', 'playbooks.name', 'playbooks.doc', 'playbooks.assigned', 'playbooks.submitted_doc', 'playbooks.percent_submitted'
      )
      .where('playbooks.id', '=', `${playbookId}`)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.postPlaybook = function (data) {
    return this
      .insert(Object.assign(data, {id: uuid.v4()}))
      .returning('*')
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.putPlaybook = function (data, playbookId) {
    return this
      .where('current_status', '<', 'sent')
      .where({ id: playbookId })
      .patch(data)
      .returning('id')
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.duplicatePlaybook = function (playbookId) {
    return this
      .select(
        'playbooks.name', 'playbooks.description', 'playbooks.company_id', 'playbooks.doc'
      )
      .where('playbooks.id', '=', `${playbookId}`)
      .where('playbooks.deleted', '=', 'false')
      .then((data) => { return merge(data[0], { name: data[0].name + ' (Copy)' }) })
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.submitPlaybook = function (data, playbookId) {
    return this
      .where('current_status', '>=', 'sent')
      .where({ id: playbookId })
      .patch(data)
      .returning('id')
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

module.exports = Playbook;
