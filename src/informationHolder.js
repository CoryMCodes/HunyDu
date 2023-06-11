const taskHolder = (() => {
  let allTasks = [];

  const addTask = (taskObj) => {
    let length = allTasks.push(taskObj);
  }

  return { allTasks, addTask }
})();

export {taskHolder}