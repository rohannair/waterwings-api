// Completed Playbooks model
const db = require('../db');
const uuid = require('node-uuid');

export function CompletedPlaybook() {
  db.apply(this, arguments);
}

db.extend(CompletedPlaybook);
CompletedPlaybook.tableName = 'completed_playbooks';

CompletedPlaybook.prototype.$beforeInsert = function () {
  this.created_at = new Date().toUTCString();
};

CompletedPlaybook.prototype.$beforeUpdate = function () {
  this.updated_at = new Date().toUTCString();
};

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
CompletedPlaybook.jsonSchema = {
  type: 'object',
  require: ['doc'],

  properties: {
    id          : { type: 'string' },
    playbook_id   : { type: 'string' },
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
    updated_at    : { type: 'object' },
    deleted       : { type: 'boolean' }
  }
};

CompletedPlaybook.relationMappings = {
  // playbook: {
  //   relation: db.OneToOneRelation,
  //   modelClass: require('./Playbook.js'),
  //   join: {
  //     from: 'completed_playbooks.playbook_id',
  //     to: 'playbooks.id'
  //   }
  // },
  //
  // company: {
  //   relation: db.OneToOneRelation,
  //   modelClass: require('./Company.js'),
  //   join: {
  //     from: 'completed_playbooks.company_id',
  //     to: 'companies.id'
  //   }
  // },
  //
  // user: {
  //   relation: db.OneToOneRelation,
  //   modelClass: require('./User.js'),
  //   join: {
  //     from: 'completed_playbooks.user_id',
  //     to: 'users.id'
  //   }
  // }
};


export function getCompletedPlaybook(queryData) {
  return CompletedPlaybook
          .query()
          .where(queryData)
          .where('completed_playbooks.deleted', '=', 'false')
          .then((result) => result)
          .catch((err) => { throw err });
}

export function postCompletedPlaybook(data) {
  return CompletedPlaybook
          .query()
          .insert({ id: uuid.v4(), ...data } )
          .then((result) => result )
          .catch((err) => { throw err });
}

export function putCompletedPlaybook(data, completedPlaybookId) {
  return CompletedPlaybook
          .query()
          .where({ id: completedPlaybookId })
          .patch(data)
          .then((result) => result)
          .catch((err) => { throw err });
}
