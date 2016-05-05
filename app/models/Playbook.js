// Playbooks model
const db    = require('../db');
const uuid  = require('node-uuid');
const merge = require('Ramda').merge;

export function Playbook() {
  db.apply(this, arguments);
}

db.extend(Playbook);
Playbook.tableName = 'playbooks';

Playbook.prototype.$beforeInsert = function () {
  this.created_at = new Date().toUTCString();
  this.updated_at = new Date().toUTCString();
};

Playbook.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toUTCString();
};

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
Playbook.jsonSchema = {
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

Playbook.relationMappings = {
  // company: {
  //   relation: db.OneToOneRelation,
  //   modelClass: require('./Company.js'),
  //   join: {
  //     from: 'playbooks.company_id',
  //     to: 'companies.id'
  //   }
  // },
  //
  // role: {
  //   relation: db.OneToOneRelation,
  //   modelClass: require('./Role.js'),
  //   join: {
  //     from: 'playbooks.role_id',
  //     to: 'roles.id'
  //   }
  // },
  //
  // completed_playbooks: {
  //   relation: db.OneToManyRelation,
  //   modelClass: require('./CompletedPlaybook.js'),
  //   join: {
  //     from: 'playbooks.id',
  //     to: 'completed_playbooks.playbook_id'
  //   }
  // }
};

export function getPlaybook(queryData) {
  return Playbook
          .query()
          .where(queryData)
          .then((result) => result)
          .catch((err) => { throw err });
}

export function postPlaybook(data) {
  return Playbook
          .query()
          .insert({ ...data, id: uuid.v4() } )
          .then((result) => result )
          .catch((err) => { throw err });
}

export function putPlaybook(data, playbookId) {
  return Playbook
          .query()
          .where({ id: playbookId })
          .patch(data)
          .then((result) => result)
          .catch((err) => { throw err });
}

export function deletePlaybook(playbookId) {
  return Playbook
          .query()
          .where({ id: playbookId })
          .del()
          .then((result) => result)
          .catch((err) => { throw err });
}

export function duplicatePlaybook(playbookId) {
  return getPlaybook(playbookId)
    .then(data => merge(data[0], { name: data[0].name + ' (Copy)' }))
    .then(data => postPlaybook(data))
    .then((result) => result)
    .catch((err) => { throw err });
}
