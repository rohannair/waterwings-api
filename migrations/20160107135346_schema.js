exports.up = function(knex, Promise) {
  return Promise.all([

    // Create members
    knex.schema.createTableIfNotExists('members', function(table) {
      table.bigIncrements('id').primary().unsigned();
      table.string('email');
      table.string('password');
      table.text('token');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([

    knex.schema.dropTableIfExists('members'),

  ]);
};
