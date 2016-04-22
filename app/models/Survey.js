// Surveys model
const db = require('../db');

function Survey() {
  db.apply(this, arguments);
}

db.extend(Survey);
Survey.tableName = 'surveys';

Survey.prototype.$beforeInsert = function () {
  this.created_at = new Date().toUTCString();
};

Survey.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toUTCString();
};

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
Survey.jsonSchema = {
  type: 'object',
  require: ['doc'],

  properties: {
    id          : { type: 'string' },
    name        : { type: 'string', minLength: 1, maxLength: 100 },
    description : { type: 'string', minLength: 1, maxLength: 255 },
    company_id  : { type: 'string' },
    role_id     : {type: 'integer' },
    doc         : {
                    type: 'object',
                    properties: {
                      body: 'string'
                    },
                    additionalProperties: true
                  },
    created_at  : { type: 'object' },
    updated_at  : { type: 'object' }
  }
};

Survey.relationMappings = {
  company: {
    relation: db.OneToOneRelation,
    modelClass: require('./Company.js'),
    join: {
      from: 'surveys.company_id',
      to: 'companies.id'
    }
  },

  role: {
    relation: db.OneToOneRelation,
    modelClass: require('./Role.js'),
    join: {
      from: 'surveys.role_id',
      to: 'roles.id'
    }
  },

  completed_surveys: {
    relation: db.OneToManyRelation,
    modelClass: require('./CompletedSurvey.js'),
    join: {
      from: 'surveys.id',
      to: 'completed_surveys.survey_id'
    }
  }
};

module.exports = Survey;
