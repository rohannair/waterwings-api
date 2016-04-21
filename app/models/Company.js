// Company model
const db = require('../db');

function Company() {
  db.apply(this, arguments);
}

db.extend(Company);
Company.tableName = 'companies';

// This is not used to create the database schema
// This is only used for validation. Whenever a model instance is created it is checked against this schema.
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
                              type: 'string', minLength: 1, maxLength: 2}
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
    created_at    : { type: 'string' },
    updated_at    : { type: 'string' }
  }
};

Company.relationMappings = {
  employees: {
    relation: Model.OneToManyRelation,
    modelClass: __dirname + '/User',
    join: {
      from: 'companies.id',
      to: 'users.company_id'
    }
  },

  roles: {
    relation: Model.OneToManyRelation,
    modelClass: __dirname + '/Role',
    join: {
      from: 'companies.id',
      to: 'roles.company_id'
    }
  },

  surveys: {
    realtion: Model.OneToManyRelation,
    modelClass: __dirname + '/Survey',
    join: 'companies.id',
    to: 'surveys.company_id'
  }
};

module.exports = Company;
