// Surveys model
const db = require('../db');

function Survey() {
  db.apply(this, arguments);
}

db.extend(Survey);
Survey.tableName = 'surveys';

Survey.jsonSchema = {
  type: 'object',
  require: ['document'],

  properties: {
    id        : { type: 'string' },
    doc       : {  },
    name      : { type: 'string', },
    company_id: { type: 'integer' },
    created_at: { },
    updated_at: { }
  }
};

module.exports = Survey;
