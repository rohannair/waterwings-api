// User model
const db = require('../db');

function User() {
  db.apply(this, arguments);
}

db.extend(User);
User.tableName = 'users';

// This is not used to create the database schema
// This is only used for validation. Whenever a model instance is created it is checked against this schema.
User.jsonSchema = {
  type: 'object',
  required: ['first_name, last_name, email, work_email'],

  properties: {
    id             : { type: 'string' },
    username       : { type: 'string' },
    password       : { type: 'string' },
    is_admin       : { type: 'boolean' },
    first_name     : { type: 'string', minLength: 1, maxLength: 50},
    last_name      : { type: 'string', minLength: 1, maxLength: 50},
    personal_email : { type: 'string', minLength: 1, maxLength: 50},
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
  }
};

module.exports = User;
