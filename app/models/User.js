// User model
const db = require('../db');
const uuid = require('node-uuid');
const encryptPassword = require('');

function User() {
  db.apply(this, arguments);
}

db.extend(User);
User.tableName = 'users';

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
    password       : { type: 'string', minLength: 6, maxLength: 50 },
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
    deleted        : { type: 'boolean' }
  }
};

User.relationMappings = {
  company: {
    relation: db.OneToOneRelation,
    modelClass: __dirname + '/Company',
    join: {
      from: 'users.company_id',
      to: 'companies.id'
    }
  },

  role: {
    relation: db.OneToOneRelation,
    modelClass: __dirname + '/Role',
    join: {
      from: 'users.role_id',
      to: 'roles.id'
    }
  },

  completed_playbooks: {
    relation: db.OneToManyRelation,
    modelClass: __dirname + '/CompletedPlaybook',
    join: {
      from: 'users.id',
      to: 'completed_playbooks.user_id'
    }
  }
};

// Database Queries

User.getUsers = () => {
  return User
          .query()
          .select(
            'users.id', 'users.username', 'users.first_name', 'users.last_name', 'users.is_admin', 'r.name as rolename'
          )
          .leftJoin('roles as r', 'users.role_id', 'r.id')
          .orderBy('users.created_at', 'asc')
          .where('users.deleted', '=', 'false')
          .then((result) => result)
          .catch((err) => { throw err });
}

User.getUserByQuery = (queryData) => {
  return User
          .query()
          .select(
            'users.id', 'users.username', 'users.first_name', 'users.last_name', 'users.is_admin', 'r.name as rolename'
          )
          .leftJoin('roles as r', 'users.role_id', 'r.id')
          .where('users.id', '=', `${queryData}`)
          .where('users.deleted', '=', 'false')
          .then((result) => result)
          .catch((err) => { throw err });
}

User.postUser = (data) => {
  return User
          .query()
          .insert({ id: uuid.v4(), ...data } )
          .then((result) => result )
          .catch((err) => { throw err });
}

User.putUser = (data, userId) => {
  return User
          .query()
          .where({ id: userId })
          .patch(data)
          .then((result) => result)
          .catch((err) => { throw err });
}

module.exports = User;
