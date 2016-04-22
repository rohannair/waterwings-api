// Completed Surveys model
const db = require('../db');

function CompletedSurvey() {
  db.apply(this, arguments);
}

db.extend(CompletedSurvey);
CompletedSurvey.tableName = 'completed_surveys';

CompletedSurvey.prototype.$beforeInsert = function () {
  this.created_at = new Date().toISOString();
};

CompletedSurvey.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toISOString();
};

CompletedSurvey.jsonSchema = {
  type: 'object',
  require: ['doc'],

  properties: {
    id          : { type: 'string' },
    survey_id   : { type: 'string' },
    user_id     : { type: 'string' },
    company_id  : { type: 'integer' },
    results     : {
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

CompletedSurvey.relationMappings = {
  survey: {
    relation: db.OneToOneRelation,
    modelClass: __dirname + '/Survey',
    join: {
      from: 'completed_surveys.survey_id',
      to: 'surveys.id'
    }
  },

  company: {
    relation: db.OneToOneRelation,
    modelClass: __dirname + '/Company',
    join: {
      from: 'completed_surveys.company_id',
      to: 'companies.id'
    }
  },

  user: {
    relation: db.OneToOneRelation,
    modelClass: __dirname + '/User',
    join: {
      from: 'completed_surveys.user_id',
      to: 'users.id'
    }
  }
};

module.exports = CompletedSurvey;
