// User model
const db = require('../db');

function User() {
  db.apply(this, arguments);
}

db.extend(User);
User.tableName = 'users';

User.prototype.$beforeInsert = function () {
  this.created_at = new Date().toISOString();
};

User.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toISOString();
};

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
User.jsonSchema = {
  type: 'object',
  required: ['username, password'],

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
    company_id     : { type: 'integer' },
    role_id        : { type: 'integer' },
    created_at     : { type: 'string' },
    updated_at     : { type: 'string' }
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

  completed_surveys: {
    realtion: Model.OneToManyRelation,
    modelClass: __dirname + '/CompletedSurvey',
    join: 'users.id',
    to: 'completed_surveys.user_id'
  }
};

module.exports = User;
