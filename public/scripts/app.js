// $(() => {

//   const DataHelpers = require("./db/util/data-helpers.js")(knex);

//   let loadTasks = () => {
//     let templateVar = {
//       userid: "1"
//     }
//     DataHelpers.dbAllGetTasks(templateVar)
//     .then(function(data) {
//       if (!data) {
//         res.status(403).send('Failed to Insert')
//       } else {
//         console.log("Success");
//         let taskData = { data }
//         console.log(taskData.data[0])
//         renderTask(taskData.data[0])
//       }
//     });
//   }

//   let renderTask = (data) => {
//     const taskElement = createTask()
//     $('#newTask').prepend(taskElement)
//   }

//   //needs a db query to connect to specific task ID and category ID
//   // Sai created it in server.js and dbhelpers
//   let createTask = (task) => {
//     let taskElement = `
//       <div class="task">
//         <div class="task_header">
//           <input class="checkbox" type="checkbox" name="completed" value="completed">
//           <h3>${task[0].task_name}</h3>
//         </div>
//         <a class="link" href="">${task[0].url}</a>
//         <div class="task_info">
//           <p>Created On: ${task[0].created_at.slice(1, 10)}</p>
//           <input class="checkbox" type="checkbox" name="important" value="important">
//         </div>
//       </div>`
//       return($(taskElement))
//   }

//   loadTasks()


//     // $.ajax({
//     //     method: "GET",
//     //     url: "/api/users"
//     // }).done((users) => {
//     //     for(user of users) {
//     //         $("<div>").text(user.name).appendTo($("body"));
//     //     }
//     // });
// });

$(document).ready(function() {

  // let loadTasks = () => {
  //   let templateVar = {
  //       userid: "1"
  //     }
  //     (function(data) {
  //         let taskData = { data }
  //         console.log(taskData.data[0])
  //         renderTask(taskData.data[0])
  //     })
  // }

  let renderTask = (data) => {
    const taskElement = createTask()
    $('#newTask').prepend(taskElement)
  }

  //needs a db query to connect to specific task ID and category ID
  // Sai created it in server.js and dbhelpers
  let createTask = (task) => {
    let taskElement = `
      <div class="task">
        <div class="task_header">
          <input class="checkbox" type="checkbox" name="completed" value="completed">
          <h3>${task[0].task_name}</h3>
        </div>
        <a class="link" href="">${task[0].url}</a>
        <div class="task_info">
          <p>Created On: ${task[0].created_at.slice(1, 10)}</p>
          <input class="checkbox" type="checkbox" name="important" value="important">
        </div>
      </div>`
      return($(taskElement))
  }
})

// PRE_LOGIN PAGE
    // GET PRELOGIN
    // POST.REDIRECT PERSONAL PAGE AFTER LOGIN
    // POST.REDIRECT REGISTRATION

// REGISTRATION PAGE
    // GET REGISTRATION
    // POST USER
    // CREATE NEW ENTRY IN USER TABLE

// PERSONAL PAGE
    // GET USER/PAGE
    // POST USER/PAGE (TASK)
    // PUT USER/PAGE (UPDATE)

// USER PROFILE
    // GET USER
    // PUT USER/UPDATE

// ADMIN PAGE
    // GET ADMIN
    // GET USER TABLE
    // DELETE USER

// TASKS PAGE
    // GET TASK PAGE
    // PUT TASK TABLE
    // UPDATE TASK
