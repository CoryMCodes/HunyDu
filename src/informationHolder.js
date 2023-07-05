const taskHolder = (() => {
  let allTasks = [];

  // add task
  const addTask = (taskObj) => {
    allTasks.push(taskObj);
  }

  // remove tasks
  const deleteTask = (string) => {
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

  const deleteProject = (pName) => {
    let foundIndex = allProjects.findIndex((el) => el.getName() === pName);
    
    if(foundIndex > -1){
      // if project has tasks remove project from task
      if(allProjects[foundIndex].getTasks().length > 0){
        allProjects[foundIndex].getTasks().forEach(task => {
          task.removeParentProject();
        })
      };
      // remove project from array
      allProjects.splice(foundIndex, 1);
    }
  }



  return {allProjects, addProject, deleteProject}
})();

export {taskHolder, projectHolder}