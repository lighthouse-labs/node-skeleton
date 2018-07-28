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
                    .select('username', 'password')
                    .from('todo_users')
                    .where({
                        username, username,
                        password, password
                    })
                    .then((output) => {
                        if (output.length > 0) {
                            resolve(true);
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
                                .insert({ username: newUser.userName, password: newUser.password, email: newUser.email, first_name: newUser.first_name, last_name: newUser.last_name, address: newUser.address, mobile: newUser.mobile, dob: newUser.dob, gender: newUser.gender })
                                .returning('id')
                                .then((newuser) => {
                                    resolve(true);
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
                              userid: newTask.userid, 
                              category_id : newTask.category_id, 
                              url : newTask.url, 
                              priority : newTask.priority, 
                              status : newTask.status 
                            })
                    .into('tasks')
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
        // Leads from the Task Page to display all tasks for the user. 
        // Takes an Object as Input. Returns object with all tasks. Else returns false if no records found.
        dbAllGetTasks: (validUser) => {
            return new Promise((resolve, reject) => {
                knex
                    .select('id', 'taskname', 'user_id', 'category_name', 'url', 'priority', 'status', 'EXTRACT(EPOCH FROM created_at) * 100000 AS created_at')
                    .join('category', 'tasks.category_id', '=', 'category.id')
                    .orderBy('priority', 'asc')
                    .orderBy('name', 'desc')
                    .from('tasks')
                    .where({
                        username, username
                    })
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
                            user_id : user_id,
                            category_id : category_id,
                            url : url, 
                            priority : priority, 
                            status : status,
                            updated_at : knex.fn.now()
                        })
                    .where ('id',taskID.task_id)    
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
                    .select('id', 'taskname', 'user_id', 'category_id', 'url', 'priority', 'status', 'EXTRACT(EPOCH FROM created_at) * 100000 AS created_at')
                    .orderBy('priority', 'asc')
                    .orderBy('name', 'desc')
                    .from('tasks')
                    .where({
                        username, username,
                        user_id, taskID:user_id
                    })
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
                knex
                    .delete()
                    .from('tasks')
                    .where({
                        username, username,
                        user_id, taskID:user_id
                    })
                    .then((output) => {
                        if (output.length > 0) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    })
            });
        },

        // Leads from the Task Delete Page to delete specific tasks under the user. 
        // Takes an Object as Input. Returns true if deleted. Else returns false if no records found.
        dbGetUserDet: (userId) => {
            return new Promise((resolve, reject) => {
                knex
                    .select('id', 'username', 'first_name', 'last_name', 'address', 'email', 'mobile', 'dob', 'gender', 'rating')
                    .from('todo_users')
                    .where({
                        user_id, userId:user_id
                    })
                    .then((output) => {
                        if (output.length > 0) {
                            resolve(true);
                        } else {
                            resolve(false);
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
                        id : userId.id, 
                        username : userId.username, 
                        first_name : userId.first_name, 
                        last_name : userId.last_name, 
                        address : userId.address, 
                        email : userId.email, 
                        mobile : userId.mobile, 
                        dob : userId.dob, 
                        gender : userId.gender, 
                        rating : userId.rating
                        })
                    .where ('id',userId.task_id)    
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
} // end of datahelper