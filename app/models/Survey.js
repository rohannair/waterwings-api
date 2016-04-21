// Surveys model
const db = require('../db');

function Survey() {
  db.apply(this, arguments);
}

db.extend(Survey);
Survey.tableName = 'surveys';

Survey.jsonSchema = {
  type: 'object',
  require: ['doc'],

  properties: {
    id          : { type: 'string' },
    name        : { type: 'string' },
    description : { type: 'string' },
    company_id  : { type: 'string' },
    role_id     : {type: 'integer' },
    doc         : {
                    type: 'object',
                      properties: {
                        name: 'string'
                    },
                    additionalProperties: true
                  },
    created_at  : { type: 'string' },
    updated_at  : { type: 'string' }
  }
};

Survey.relationMappings = {
  company: {
    relation: Model.OneToOneRelation,
    modelClass: __dirname + '/Company',
    join: {
      from: 'surveys.company_id',
      to: 'companies.id'
    }
  },

  role: {
    relation: Model.OneToOneRelation,
    modelClass: __dirname + '/Role',
    join: {
      from: 'surveys.role_id',
      to: 'roles.id'
    }
  }
};

module.exports = Survey;
