const taskHolder = (() => {
  let allTasks = [];

  // remove task
  const addTask = (taskObj) => {
    allTasks.push(taskObj);
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

  return { allTasks, addTask, getTaskByName }
})();

const projectHolder = (() => {
  let allProjects = [];

  const addProject = (projObj) => {
    allProjects.push(projObj);
  }



  return {allProjects, addProject}
})();

export {taskHolder, projectHolder}