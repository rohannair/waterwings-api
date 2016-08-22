// User model
const knex = require('knex');
const Model = require('objection').Model;
const QueryBuilder = require('objection').QueryBuilder;
const uuid = require('node-uuid');
const encrypt = require('../utils/encryption');
const ApiError = require('../utils/customErrors');

function User() {
  Model.apply(this, arguments);
}

Model.extend(User);
User.tableName = 'users';

function MyQueryBuilder() {
  QueryBuilder.apply(this, arguments);
}

QueryBuilder.extend(MyQueryBuilder);

// Instance of this is created when you call `query()` or `$query()`.
User.QueryBuilder = MyQueryBuilder;
// Instance of this is created when you call `$relatedQuery()`.
User.RelatedQueryBuilder = MyQueryBuilder;

// Timestamp functions
User.prototype.$beforeInsert = function () {
  this.created_at = new Date().toUTCString();
};

User.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toUTCString();
};

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
User.jsonSchema = {
  type: 'object',
  required: ['username', 'password'],

  properties: {
    id             : { type: 'string' },
    username       : { type: 'string', minLength: 1, maxLength: 50 },
    password       : { type: 'string', minLength: 6, maxLength: 100 },
    is_admin       : { type: 'boolean' },
    first_name     : { type: 'string', minLength: 1, maxLength: 50 },
    last_name      : { type: 'string', minLength: 1, maxLength: 50 },
    personal_email : { type: 'string', minLength: 1, maxLength: 50 },
    profile_img    : { type: 'string' },
    bio            : { type: 'string' },
    social_media   : {
                        type: 'object',
                        properties: {
                          facebook: { type: 'string' },
                          twitter : { type: 'string' },
                          linkedIn : { type: 'string' }
                        },
                        additionalProperties: true
                      },
    company_id     : { type: 'string' },
    role_id        : { type: 'integer' },
    created_at     : { type: 'object' },
    updated_at     : { type: 'object' },
    deleted        : { type: 'boolean' },
    google_user_token : { type: 'string' },
    google_refresh_token : { type: 'string' },
    google_account_linked : { type: 'boolean' },
    slack_user_token : { type: 'string' },
    slack_account_linked : { type: 'boolean' },
    linkedin_user_token : { type: 'string' },
    linkedin_account_linked : { type: 'boolean' },
    start_date: { type: 'integer' }
  }
};

User.relationMappings = {
  company: {
    relation: Model.OneToOneRelation,
    modelClass: __dirname + '/Company',
    join: {
      from: 'users.company_id',
      to: 'companies.id'
    }
  },

  role: {
    relation: Model.OneToOneRelation,
    modelClass: __dirname + '/Role',
    join: {
      from: 'users.role_id',
      to: 'roles.id'
    }
  },

  email_messages: {
    relation: Model.OneToManyRelation,
    modelClass: __dirname + '/EmailMessage',
    join: {
      from: 'users.id',
      to: 'email_messages.user_id'
    }
  }

};

// Custom Queries

// Set a limit of 1000 users per call if no limit is provided
// TODO: Need to figure out what limit we should use
MyQueryBuilder.prototype.getAll = function (companyId, offset = 0, limit = 1000) {
  return this
    .select(
      'users.id',
      'users.username',
      'users.first_name as firstName',
      'users.last_name as lastName',
      'users.profile_img',
      'users.is_admin',
      'users.google_account_linked',
      'r.name as rolename',
      knex.raw(`
        (SELECT ARRAY
          (
            SELECT row_to_json(r)
            FROM (
              SELECT p.id, p.name
              FROM playbook_joins pj
              LEFT JOIN playbooks p
              ON pj.playbook_id = p.id
            ) r
          )
        as assigned_playbooks)
      `)
    )
    .leftJoin('roles as r', 'users.role_id', 'r.id')
    .where('users.deleted', '=', 'false')
    .where('users.company_id', '=', companyId)
    .orderBy('users.updated_at', 'desc')
    .range(+offset, (+offset) + (+limit) - 1)
    .then((result) => result)
    .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.getUserById = function (userId) {
    return this
      .select(
        'users.id', 'users.username', 'users.first_name as firstName', 'users.last_name as lastName', 'users.is_admin', 'users.google_account_linked', 'r.name as rolename', 'c.id as companyId', 'c.name as companyName', 'c.subdomain as companyDomain'
      )
      .leftJoin('roles as r', 'users.role_id', 'r.id')
      .leftJoin('companies as c', 'users.company_id', 'c.id')
      .where('users.id', '=', `${userId}`)
      .where('users.deleted', '=', 'false')
      .then((result) => result[0])
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.getUserwithPasswordById = function (userId) {
    return this
      .select(
          'users.id', 'users.username', 'users.password', 'users.first_name as firstName', 'users.last_name as lastName', 'users.is_admin','users.company_id'
        )
        .where('users.id', '=', `${userId}`)
        .where('users.deleted', '=', 'false')
        .then((result) => result)
        .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.getUserwithPasswordByUsername = function (name) {
    return this
      .select(
        'users.id', 'users.username', 'users.first_name as firstName', 'users.last_name as lastName', 'users.password', 'users.is_admin', 'users.company_id'
      )
      .where('users.username', '=', `${name}`)
      .where('users.deleted', '=', 'false')
      .then((result) => result)
      .catch((err) => { throw new ApiError('Can not find a user with that username', 500, err) });
};

MyQueryBuilder.prototype.postUser = function(data) {
    return this
      .insert(Object.assign(data, {id: uuid.v4()} ))
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.putUser = function (data, userId) {
    return this
      .where({ id: userId })
      .patch(data)
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

module.exports = User;
