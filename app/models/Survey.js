// Surveys model
const db = require('../db');
const uuid = require('node-uuid');
const chalk      = require('chalk');

export function Survey() {
  db.apply(this, arguments);
}

db.extend(Survey);
Survey.tableName = 'surveys';

Survey.prototype.$beforeInsert = function () {
  this.created_at = new Date().toUTCString();
  this.updated_at = new Date().toUTCString();
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
    // role_id     : {type: 'integer' },
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
  // company: {
  //   relation: db.OneToOneRelation,
  //   modelClass: require('./Company.js'),
  //   join: {
  //     from: 'surveys.company_id',
  //     to: 'companies.id'
  //   }
  // },
  //
  // role: {
  //   relation: db.OneToOneRelation,
  //   modelClass: require('./Role.js'),
  //   join: {
  //     from: 'surveys.role_id',
  //     to: 'roles.id'
  //   }
  // },
  //
  // completed_surveys: {
  //   relation: db.OneToManyRelation,
  //   modelClass: require('./CompletedSurvey.js'),
  //   join: {
  //     from: 'surveys.id',
  //     to: 'completed_surveys.survey_id'
  //   }
  // }
};

export function getSurvey(queryData) {
  return Survey
          .query()
          .where(queryData)
          .then((result) => result)
          .catch((err) => { throw err });
}

export function postSurvey(data) {
  return Survey
          .query()
          .insert({ ...data, id: uuid.v4() } )
          .then((result) => result )
          .catch((err) => { throw err });
}

export function putSurvey(data, surveyId) {
  return Survey
          .query()
          .where({ id: surveyId })
          .patch(data)
          .then((result) => result)
          .catch((err) => { throw err });
}

export function deleteSurvey(surveyId) {
  return Survey
          .query()
          .where({ id: surveyId })
          .del()
          .then((result) => result)
          .catch((err) => { throw err });
}

export function duplicateSurvey(surveyId) {
  return getSurvey(surveyId)
    .then(data => postSurvey(data[0]))
    .then((result) => result)
    .catch((err) => { throw err });
}
