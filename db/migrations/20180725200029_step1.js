
exports.up = function(knex, Promise) {
    return createToDoUsersTable()
    .then(createToDoCategoryTable)
    .then(createToDoTasksTable);

    function createToDoUsersTable() {
      return knex.schema.createTable('todo_users', function (table) {
        table.increments('id');
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('address');
        table.string('email');
        table.string('mobile');
        table.date('dob').defaultTo(knex.fn.now());
        table.string('gender');
        table.string('rating');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
    }

    function createToDoCategoryTable() {
        return knex.schema.createTable('category', function (table) {
          table.integer('id');
          table.string('category_name').notNullable();
          table.string('description');
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.timestamp('updated_at').defaultTo(knex.fn.now());     
        });
      }

    function createToDoTasksTable() {
        return knex.schema.createTable('tasks', function (table) {
          table.increments('id');
          table.string('task_name').notNullable();
          table.integer('user_id').notNullable();
          table.integer('category_id').notNullable();
          table.string('url');
          table.boolean('priority').defaultTo(false);
          table.boolean('status').defaultTo(false);
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.timestamp('updated_at').defaultTo(knex.fn.now());
          table.foreign('user_id').references('todo_users.id')
        });
      }


};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('tasks'),
        knex.schema.dropTableIfExists('todo_users'),
        knex.schema.dropTableIfExists('category')
    ])
};
