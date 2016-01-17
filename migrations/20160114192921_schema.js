
exports.up = function(knex, Promise) {
  return Promise.all([

    // Create departments
    knex.schema.createTableIfNotExists('departments', function(table) {
      table.uuid('id').primary().unsigned().index('department_id');
      table.bigInteger('company_id');
      table.string('name', 100);
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {

};
