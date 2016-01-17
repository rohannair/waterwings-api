
exports.up = function(knex, Promise) {
  return Promise.all([
    // Create Users
    knex.schema.createTableIfNotExists('users', function(table) {
            table.char('department_id');
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([])
};
