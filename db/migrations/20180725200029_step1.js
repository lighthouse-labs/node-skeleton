
exports.up = function(knex, Promise) {
    return createToDoUsersTable()
    .then(createToDoCategoryTable)
    .then(createToDoTasksTable);
  
    function createToDoUsersTable() {
      return knex.schema.createTable('todo_users', function (table) {
        table.increments('id');
        table.string('password');
        table.string('first_name');
        table.string('last_name');
        table.string('address');
        table.string('email');
        table.string('mobile');
        table.date('dob');
        table.string('gender');
        table.string('rating');
        table.timestamps();  
      });
    }

    function createToDoCategoryTable() {
        return knex.schema.createTable('category', function (table) {
          table.increments('id');
          table.string('category_name');
          table.string('description');
          table.timestamps();  
        });
      }

    function createToDoTasksTable() {
        return knex.schema.createTable('tasks', function (table) {
          table.increments('id');
          table.string('task_name');
          table.integer('user_id');
          table.integer('category_id');
          table.string('url');
          table.boolean('priority');
          table.boolean('status');
          table.timestamps();  
          table.foreign('user_id').references('todo_users.id')
          table.foreign('category_id').references('category.id')
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