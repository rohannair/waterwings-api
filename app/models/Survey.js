// Surveys model
const db = require('../db');

function Survey() {
  db.apply(this, arguments);
}

db.extend(Survey);
Survey.tableName = 'surveys';

Survey.prototype.$beforeInsert = function () {
  this.created_at = new Date().toISOString();
};

Survey.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toISOString();
};

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
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
                      body: 'string'
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
  },

  completed_surveys: {
    realtion: Model.OneToManyRelation,
    modelClass: __dirname + '/CompletedSurvey',
    join: 'surveys.id',
    to: 'completed_surveys.survey_id'
  }
};

module.exports = Survey;
