// Email Message model
const Model = require('objection').Model;
const QueryBuilder = require('objection').QueryBuilder;
const ApiError = require('../utils/customErrors');

function EmailMessage() {
  Model.apply(this, arguments);
}

Model.extend(EmailMessage);
EmailMessage.tableName = 'email_messages';

function MyQueryBuilder() {
  QueryBuilder.apply(this, arguments);
}

QueryBuilder.extend(MyQueryBuilder);

// Instance of this is created when you call `query()` or `$query()`.
EmailMessage.QueryBuilder = MyQueryBuilder;
// Instance of this is created when you call `$relatedQuery()`.
EmailMessage.RelatedQueryBuilder = MyQueryBuilder;

// This is not used to create the database schema it is only used for validation.
// Whenever a model instance is created it is checked against this schema.
EmailMessage.jsonSchema = {
  type: 'object',
  required: ['transmission_id', 'playbook_id', 'user_id', 'company_id', 'scheduled_for'],

  properties: {
    id             : { type: 'integer' },
    transmission_id      : { type: 'string' },
    playbook_id : { type: 'string' },
    user_id         : { type: 'string' },
    company_id       : { type: 'string' },
    scheduled     : { type: 'boolean' },
    sent     : { type: 'boolean' },
    canceled     : { type: 'boolean' },
    sent_at    : { type: 'integer' },
    scheduled_for  : { type: 'integer' }
  }
};

EmailMessage.relationMappings = {
  // company: {
  //   relation: Model.OneToOneRelation,
  //   modelClass: __dirname + '/Company',
  //   join: {
  //     from: 'users.company_id',
  //     to: 'companies.id'
  //   }
  // },
  //
  // role: {
  //   relation: Model.OneToOneRelation,
  //   modelClass: __dirname + '/Role',
  //   join: {
  //     from: 'users.role_id',
  //     to: 'roles.id'
  //   }
  // }

};

// Custom Queries

MyQueryBuilder.prototype.getEmailByTransmissionId = function (transmissionId) {
    return this
      .select(
        '*'
      )
      .where('transmission_id', '=', `${transmissionId}`)
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.createEmailMessage = function (data) {
    return this
      .insert(data)
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.putEmailMessageByPlaybookId = function (data, playbookId) {
    return this
      .where({ playbook_id: playbookId })
      .patch(data)
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

MyQueryBuilder.prototype.putEmailMessageByTransmissionId = function (data, transmissionId) {
    return this
      .where({ transmission_id: transmissionId })
      .patch(data)
      .then((result) => result)
      .catch((err) => { throw new ApiError('Database Error', 500, err) });
};

module.exports = EmailMessage;
