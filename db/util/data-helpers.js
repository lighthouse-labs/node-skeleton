"use strict";

// Simulates the kind of delay we see with network or filesystem operations

// Defines helper functions for saving and getting data
"use strict";

// Simulates the kind of delay we see with network or filesystem operations

// Defines helper functions for saving and getting data
module.exports = function makeDataHelpers(knex) {
    return {
        // Leads from the Login Page - verifies if the username password are correct
        // Returns true if the credentials are correct. And false if not.
        dbCheckUser: (username, password) => {
            return new Promise((resolve, reject) => {
                knex
                    .select('username', 'password','id')
                    .from('todo_users')
                    .where({
                        username, username,
                        password, password
                    })
                    .then((output) => {
                        if (output.length > 0) {
                            resolve(output);
                        } else {
                            resolve(false);
                        }
                    })
                    .catch(console.error)
            });
        },
        // Leads from the Register New User Page. Takes an Object as Input.
        dbInsertUser: (newUser) => {
            return new Promise((resolve, reject) => {
                knex
                    .select('id')
                    .from('todo_users')
                    .where('username', newUser.userName)
                    .then((output) => {
                        if (output.length > 0) {
                            resolve(false);
                        } else {
                            knex('todo_users')
                                .insert({ username: newUser.userName,
                                          password: newUser.password,
                                          email: newUser.email,
                                          first_name: newUser.first_name,
                                          last_name: newUser.last_name,
                                          address: newUser.address,
                                          mobile: newUser.mobile,
                                          dob: newUser.dob,
                                          gender: newUser.gender
                                        })
                                .returning('id')
                                .then((newuser) => {
                                    resolve(newuser);
                                })
                        }
                    }).catch(console.error)
            });
        },
        // Leads from the Add new Task Page.
        // Takes an Object as Input. Returns true if inserted and false otherwise.
        dbInsertTask: (newTask) => {
            return new Promise((resolve, reject) => {
                knex
                    .insert({ task_name : newTask.task_name,
                              user_id: newTask.user_id,
                              category_id : newTask.category_id,
                              url : newTask.url,
                              priority : newTask.priority,
                              status : newTask.status
                            })
                    .into('tasks')
                    .returning('id')
                    .then((output) => {
                        if (output.length > 0) {
                            resolve(output);
                        } else {
                            resolve(false);
                        }
                    })
            });
        },
        // Leads from the Task Page to display all tasks for the user.
        // Takes an Object as Input. Returns object with all tasks. Else returns false if no records found.
        dbAllGetTasks: (validUser) => {
            return new Promise((resolve, reject) => {
                knex
                    .select('tasks.id', 'task_name', 'tasks.user_id', 'category.category_name', 'url', 'priority', 'status', 'tasks.created_at')
                    .join('category', 'tasks.category_id', '=', 'category.id')
                    .orderBy('status', 'asc')
                    .orderBy('priority', 'desc')
                    .orderBy('created_at', 'desc')
                    .from('tasks')
                    .where('tasks.user_id', validUser.user_id)
                    .then((output) => {
                        if (output.length > 0) {
                            resolve(output);
                        } else {
                            resolve(false);
                        }
                    })
            });
        },
        // Leads from the edit Task Page to update specific task.
        // Takes an Object as Input. Returns true if record is updated Else returns false.
        dbUpdate1Tasks: (taskId) => {
            return new Promise((resolve, reject) => {
                knex('tasks')
                    .update({
                            taskname : taskId.task_name,
                            user_id : taskId.user_id,
                            category_id : taskId.category_id,
                            url : taskId.url,
                            priority : taskId.priority,
                            status : taskId.status,
                            updated_at : knex.fn.now()
                        })
                    .where ('id',taskId.task_id)
                    .returning('id')
                    .then((output) => {
                        if (output.length > 0) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    })
            });
        },
        // Leads from the edit Task Page to update specific task.
        // Takes an Object as Input. Returns true if record is updated Else returns false.
        dbUpdateTasksCatPri: (taskId) => {
            return new Promise((resolve, reject) => {
                var coalesce1 = knex.raw('coalesce(taskId.task_name, tasks.taskname)')
                var coalesce2 = knex.raw('coalesce(taskId.category_id, tasks.category_id)')
                var coalesce3 = knex.raw('coalesce(taskId.url, tasks.url)')
                var coalesce4 = knex.raw('coalesce(taskId.priority, tasks.priority)')
                var coalesce5 = knex.raw('coalesce(taskId.status, tasks.status)')

                knex('tasks')
                    .update({
                        taskname: coalesce1,
                        user_id: taskId.user_id,
                        category_id: coalesce2,
                        url: coalesce3,
                        priority: coalesce4,
                        status: coalesce5,
                        updated_at: knex.fn.now()
                    })
                    .where('id', taskId.task_id)
                    .returning('id')
                    .then((output) => {
                        if (output.length > 0) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    })
            });
        },
        // Leads from the Task Page to display selected tasks under the user.
        // Takes an Object as Input. Returns object with specified tasks. Else returns false if no records found.
        dbGet1Tasks: (taskId) => {
            return new Promise((resolve, reject) => {
                knex
                    .select('tasks.id', 'task_name', 'tasks.user_id', 'category.category_name', 'url', 'priority', 'status', 'tasks.created_at')
                    .join('category', 'tasks.category_id', '=', 'category.id')
                    .orderBy('priority', 'asc')
                    .orderBy('created_at', 'desc')
                    .from('tasks')
                    .where('tasks.id', taskId.taskid)
                    .then((output) => {
                        if (output.length > 0) {
                            resolve(output);
                        } else {
                            resolve(false);
                        }
                    })
            });
        },

        // Leads from the Task Delete Page to delete specific tasks under the user.
        // Takes an Object as Input. Returns true if deleted. Else returns false if no records found.
        dbDelete1Tasks: (taskId) => {
            return new Promise((resolve, reject) => {
                console.log('Delete Task');
                knex
                    .delete()
                    .from('tasks')
                    .where({
                        'user_id': taskId.user_id,
                        'id': taskId.task_id
                    })
                    .returning('id')
                    .then((output) => {
                        if (output.length > 0) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    })
            });
        },

        // Leads from the Edit User Page to retrieve details for the specific user.
        // Takes an Object as Input. Returns details if available. Else returns false if no records found.
        dbGetUserDet: (userId) => {
            return new Promise((resolve, reject) => {
                console.log('XYZ',userId.id);
                knex
                    .select('id', 'username', 'first_name', 'last_name', 'address', 'email', 'mobile', 'dob', 'gender', 'rating')
                    .from('todo_users')
                    .where("id", userId.user_id)
                    .then((output) => {
                        if (output.length > 0) {
                            resolve(output);
                        } else {
                            reject(false);
                        }
                    })
            });
        },

        // Leads from the edit User Profile Page to update specific User.
        // Takes an Object as Input. Returns true if record is updated Else returns false.
        dbUpdate1User: (userId) => {
            return new Promise((resolve, reject) => {
                knex('todo_users')
                    .update({
                        first_name : userId.first_name,
                        last_name : userId.last_name,
                        address : userId.address,
                        email : userId.email,
                        mobile : userId.mobile,
                        dob : userId.dob,
                        gender : userId.gender,
                        })
                    .where ('id',userId.user_id)
                    .returning('id')
                    .then((output) => {
                        if (output.length > 0) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    })
            });
        }



    } //end of Datahelper return
}

