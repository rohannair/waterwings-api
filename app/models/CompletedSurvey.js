// CompleteSurveys model
const db = require('../db');

function CompletedSurvey() {
  db.apply(this, arguments);
}

db.extend(CompletedSurvey);
CompleteSurvey.tableName = 'completed_surveys';

CompletedSurvey.jsonSchema = {
  type: 'object',
  require: ['doc'],

  properties: {
    id          : { type: 'integer' },
    survey_id   : { type: 'integer' },
    user_id     : { type: 'integer' },
    company_id  : { type: 'integer' },
    doc         : {
                    type: 'object',
                      properties: {
                        name: 'string'
                    }
                  },
    created_at  : { type: 'string' },
    updated_at  : { type: 'string' }
  }
};

module.exports = CompletedSurvey;
