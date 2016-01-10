exports.up = function(knex, Promise) {
  return Promise.all([

    // Create Users
    knex.schema.createTableIfNotExists('users', function(table) {
      table.bigIncrements('id').primary().unsigned().index('user_id');
      table.string('first_name', 100);
      table.string('last_name', 100);
      table.string('email').unique();
      table.string('work_email');
      table.boolean('isAdmin');
      table.timestamps();

      table.bigInteger('company_id');
    }),

    // Create companies
    knex.schema.createTableIfNotExists('companies', function(table) {
      table.bigIncrements('id').primary().unsigned().index('company_id');
      table.string('name');
      table.string('address_1');
      table.string('address_2');
      table.enum('province', ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK']).defaultTo('ON');
      table.enum('country', ['CA']).defaultTo('CA');
      table.string('postal_code', 6);
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('SET FOREIGN_KEY_CHECKS=0;'),
    knex.schema.dropTableIfExists('companies'),
    knex.schema.dropTableIfExists('users'),
    knex.raw('SET FOREIGN_KEY_CHECKS=1;'),
  ]);
};
