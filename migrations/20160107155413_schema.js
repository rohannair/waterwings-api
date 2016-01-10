// Add email unique constraint to members table
exports.up = function(knex, Promise) {
  return knex.schema.raw('alter table members ADD CONSTRAINT constraint_name UNIQUE (email)');
};

exports.down = function(knex, Promise) {

};
