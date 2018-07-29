$(document).ready(function() {

  // Toggle Class for completed task
  $('.button-complete').click(function(ev) {
    $(this).parents('#task').addClass('completed')
    console.log('class has been added')
  })

  // let loadTasks = () => {
  //   // let templateVar = {
  //   //   userid: "1"
  //   // }

  //   $.ajax('/personal', {
  //     method: 'GET'
  //   })
  //   .then(function (htmlCode) {
  //     console.log(htmlCode)
  //     renderTask(htmlCode)
  //   })
  // }

  // let renderTask = (data) => {
  //   for (let item of data) {
  //     const taskElement = createTask()
  //     $('#newTask').prepend(taskElement)
  //   }
  // }

  // //needs a db query to connect to specific task ID and category ID
  // // Sai created it in server.js and dbhelpers
  // let createTask = (task) => {
  //   let taskElement = `
  //     <div class="task">
  //       <div class="task_header">
  //         <input class="checkbox" type="checkbox" name="completed" value="completed">
  //         <h3>${task[0].task_name}</h3>
  //       </div>
  //       <a class="link" href="">${task[0].url}</a>
  //       <div class="task_info">
  //         <p>Created On: ${task[0].created_at.slice(1, 10)}</p>
  //         <input class="checkbox" type="checkbox" name="important" value="important">
  //       </div>
  //     </div>`
  //     return($(taskElement))
  // }

  // loadTasks()
})
