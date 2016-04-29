// Completed Surveys model
const db = require('../db');
const uuid = require('node-uuid');

export function CompletedSurvey() {
  db.apply(this, arguments);
}

db.extend(CompletedSurvey);
CompletedSurvey.tableName = 'completed_surveys';

CompletedSurvey.prototype.$beforeInsert = function () {
  this.created_at = new Date().toUTCString();
};

CompletedSurvey.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toUTCString();
};

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
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
    created_at    : { type: 'object' },
    updated_at    : { type: 'object' }
  }
};

CompletedSurvey.relationMappings = {
  // survey: {
  //   relation: db.OneToOneRelation,
  //   modelClass: require('./Survey.js'),
  //   join: {
  //     from: 'completed_surveys.survey_id',
  //     to: 'surveys.id'
  //   }
  // },
  //
  // company: {
  //   relation: db.OneToOneRelation,
  //   modelClass: require('./Company.js'),
  //   join: {
  //     from: 'completed_surveys.company_id',
  //     to: 'companies.id'
  //   }
  // },
  //
  // user: {
  //   relation: db.OneToOneRelation,
  //   modelClass: require('./User.js'),
  //   join: {
  //     from: 'completed_surveys.user_id',
  //     to: 'users.id'
  //   }
  // }
};


export function getCompletedSurvey(queryData) {
  return CompletedSurvey
          .query()
          .where(queryData)
          .then((result) => result)
          .catch((err) => { throw err });
}

export function postCompletedSurvey(data) {
  return CompletedSurvey
          .query()
          .insert({ id: uuid.v4(), ...data } )
          .then((result) => result )
          .catch((err) => { throw err });
}

export function putCompletedSurvey(data, completedSurveyId) {
  return CompletedSurvey
          .query()
          .where({ id: completedSurveyId })
          .patch(data)
          .then((result) => result)
          .catch((err) => { throw err });
}

export function deleteCompletedSurvey(data, completedSurveyId) {
  return CompletedSurvey
          .query()
          .where({ id: completedSurveyId })
          .del()
          .then((result) => result)
          .catch((err) => { throw err });
}
