// Company model
const db = require('../db');
const uuid = require('node-uuid');

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
    updated_at    : { type: 'object' },
    deleted       : { type: 'boolean' }
  }
};

Company.relationMappings = {
  users: {
    relation: db.OneToManyRelation,
    modelClass: __dirname + '/User',
    join: {
      from: 'companies.id',
      to: 'users.company_id'
    }
  },

  roles: {
    relation: db.OneToManyRelation,
    modelClass: __dirname + '/Role',
    join: {
      from: 'companies.id',
      to: 'roles.company_id'
    }
  },

  playbooks: {
    relation: db.OneToManyRelation,
    modelClass: __dirname + '/Playbook',
    join: {
      from: 'companies.id',
      to: 'playbooks.company_id'
    }
  },

  completed_playbooks: {
    relation: db.OneToManyRelation,
    modelClass: __dirname + '/CompletedPlaybook',
    join: {
      from: 'companies.id',
      to: 'completed_playbooks.company_id'
    }
  }
};

Company.getCompany = (queryData) => {
  return Company
          .query()
          .where(queryData)
          .where('companies.deleted', '=', 'false')
          .then((result) => result)
          .catch((err) => { throw err });
}

Company.postCompany = (data) => {
  return Company
          .query()
          .insert({ id: uuid.v4(), ...data } )
          .then((result) => result )
          .catch((err) => { throw err });
}

Company.putCompany = (data, companyId) => {
  return Company
          .query()
          .patch(data)
          .where({ id: companyId })
          .then((result) => result)
          .catch((err) => { throw err });
}

module.exports = Company;
