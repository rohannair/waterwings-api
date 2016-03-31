// Deps
const chalk      = require('chalk');
const parse      = require('co-body');
const R          = require('ramda');
const returnDate = require('../utils').returnDate;
const updateDate = require('../utils').updateDate;
const UUID       = require('uuid-js');

// Models
const Survey     = require('../models/Surveys');

// Controller
const surveysController = (function() {

  function* GET() {
    const self = this;

    yield Survey
    .query()
    .where(this.query)
    .select('id', 'name', 'created_at', 'updated_at')
    .then(function(resp) {
      self.body = resp;
    });
  }

  function* GET_ONE() {
    const self = this;

    yield Survey
    .query()
    .where({id: self.params.id})
    .then(function(resp) {
      self.body = resp;
    });
  }

  function* POST() {
    const self = this;

    const request = yield parse(this.req);
    const payload = R.merge(
      updateDate(),
      {
        company_id: parseInt(request.company_id),
        doc: JSON.parse(JSON.stringify(request.doc)),
        name: request.name || 'Unnamed survey',
        id: UUID.create().toString()
      }
    );

    yield Survey
    .query()
    .update(payload)
    .where({id: self.params.id})
    .then(function(model) {
      console.log(chalk.green.bold('--- POST', JSON.stringify(model, null, 4)));
      self.status = 201;
      self.body = {
        message: 'Inserted!',
        new_survey: {
          id: model.id,
          name: model.name,
          created_at: model.created_at,
          updated_at: model.updated_at,
        }
      };
    });
  }

  function* PUT() {
    const self = this;

    const request = yield parse(this.req);
    console.log(chalk.blue.bold(JSON.stringify(request, null, 4)));
    const payload = R.merge(
      returnDate(),
      {
        company_id: parseInt(request.company_id),
        doc: JSON.parse(JSON.stringify(request.doc)),
        name: request.name || 'Unnamed survey',
        id: UUID.create().toString()
      }
    );

    yield Survey
    .query()
    .insert(payload)
    .then(function(model) {
      console.log(chalk.green.bold('--- POST', JSON.stringify(model, null, 4)));
      self.status = 201;
      self.body = {
        message: 'Inserted!',
        new_survey: {
          id: model.id,
          name: model.name,
          created_at: model.created_at,
          updated_at: model.updated_at,
        }
      };
    });
  }

  return {
    GET       : GET,
    GET_ONE   : GET_ONE,
    POST      : POST,
    PUT       : PUT,

  };

})();

module.exports = surveysController;