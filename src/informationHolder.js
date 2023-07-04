const taskHolder = (() => {
  let allTasks = [];

  // remove task
  const addTask = (taskObj) => {
    allTasks.push(taskObj);
  }

  const deleteTask = (string) => {
    console.log("delte runs")
    let foundIndex = allTasks.findIndex((el) => el.getName() === string);
    if (foundIndex > -1){
      allTasks.splice(foundIndex, 1);
    }
  }

  const getTaskByName = (string) =>{
    let foundTaskObj
    allTasks.forEach(task => {
      if(task.getName() === string){
        foundTaskObj = task;
      }
    })
    return foundTaskObj;
  }

  return { allTasks, addTask, getTaskByName, deleteTask }
})();

const projectHolder = (() => {
  let allProjects = [];

  const addProject = (projObj) => {
    allProjects.push(projObj);
  }



  return {allProjects, addProject}
})();

export {taskHolder, projectHolder}