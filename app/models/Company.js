// Company model
const db = require('../db');

function Company() {
  db.apply(this, arguments);
}

db.extend(Company);
Company.tableName = 'companies';

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
                      properties: {
                        // Will be of the format '[123, Fun, Avenue, SE]'
                        street_address : {
                          type: 'array',
                          'items': [
                            {
                              // Street Number
                              type: 'integer'
                            },
                            {
                              // Street Name
                              type: 'string'
                            },
                            {
                              // Street Type
                              type: 'string'
                            },
                            {
                              // Direction
                              type: 'string', minLength: 0, maxLength: 2
                            }
                          ]
                        },
                        city                    : { type: 'string' },
                        province_or_state       : { type: 'string', minLength: 2, maxLength: 2},
                        postal_code             : { type: 'string', minLength: 1, maxLength: 10},
                        country                 : { type: 'string', minLength: 2, maxLength: 3}
                      },
                      additionalProperties: true
                    },
    created_at    : { type: 'object' },
    updated_at    : { type: 'object' }
  }
};

Company.relationMappings = {
  employees: {
    relation: db.OneToManyRelation,
    modelClass: require('./User.js'),
    join: {
      from: 'companies.id',
      to: 'users.company_id'
    }
  },

  roles: {
    relation: db.OneToManyRelation,
    modelClass: require('./Role.js'),
    join: {
      from: 'companies.id',
      to: 'roles.company_id'
    }
  },

  surveys: {
    realtion: db.OneToManyRelation,
    modelClass: require('./Survey.js'),
    join: 'companies.id',
    to: 'surveys.company_id'
  },

  completed_surveys: {
    realtion: db.OneToManyRelation,
    modelClass: require('./CompletedSurvey.js'),
    join: 'companies.id',
    to: 'completed_surveys.company_id'
  }
};

module.exports = Company;
