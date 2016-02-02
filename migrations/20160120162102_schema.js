
exports.up = function(knex, Promise) {
  return Promise.all([

    // Create Surveys
    knex.schema.createTableIfNotExists('surveys', function(table) {
      table.uuid('id').primary().unsigned().index('survey_id');
      table.json('result');
      table.timestamps();

      table.bigInteger('company_id');
      table.string('user_id');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('surveys'),
  ]);
};
