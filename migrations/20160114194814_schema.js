
exports.up = function(knex, Promise) {
  return Promise.all([
    // Create Users
    knex.schema.createTableIfNotExists('users', function(table) {
    }),
  ]);
};

exports.down = function(knex, Promise) {
};
