const taskHolder = (() => {
  let allTasks = [];

  const addTask = (taskObj) => {
    allTasks.push(taskObj);
  }

  return { allTasks, addTask }
})();

const projectHolder = (() => {
  let allProjects = [];

  const addProject = (projObj) => {
    allProjects.push(projObj);
  }

  return {allProjects, addProject}
})();

export {taskHolder, projectHolder}