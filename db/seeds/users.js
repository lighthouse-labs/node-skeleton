exports.seed = function(knex, Promise) {
    return knex('todo_users').del()
    .then(function () {
        return Promise.all([
            knex('todo_users').insert({ username : 'joe', password : '12345', first_name : 'Joe', last_name : 'Lee', address : 'Toronto', email : 'joe@joe.com', mobile : '647-582-8597', dob : '01-01-1978', gender : 'M', rating : '1' }),
            knex('todo_users').insert({ username : 'nick', password : '12345', first_name : 'Nick', last_name : 'Latcham', address : 'Toronto', email : 'nick@nick.com', mobile : '647-582-8598', dob : '01-01-1995', gender : 'M', rating : '1' }),
            knex('todo_users').insert({ username : 'sai', password : '12345', first_name : 'Sai', last_name : 'Gautam', address : 'Toronto', email : 'sai@sai.com', mobile : '647-582-8599', dob : '01-01-1979', gender : 'M', rating : '1' }),
            knex('category').insert({ id: 1, category_name : "To Watch", description : "Stuff to watch" }),
            knex('category').insert({ id: 2, category_name : "To Eat", description : "Stuff to eat" }),
            knex('category').insert({ id: 3, category_name : "To Read", description : "Stuff to read" }),
            knex('category').insert({ id: 4, category_name : "To Buy", description : "Stuff to buy" }),
            knex('tasks').insert({ task_name : 'Farenheit', user_id : '1', category_id : '3' }),
            knex('tasks').insert({ task_name : 'Pizza', user_id : '3', category_id : '2' }),
            knex('tasks').insert({ task_name : 'Matrix', user_id : '2', category_id : '1' }),
            knex('tasks').insert({ task_name : 'Headphones', user_id : '2', category_id : '4' })            
            ]);
    });
};


