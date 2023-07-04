const projectFactory = (name, ...args) => {
  let pName = name;
  let taskArray = args;
  
  const getName = () => pName;
  
  const addTask = (task) => {
    taskArray.push(task);
  }

  const getTasks = () => taskArray;
  
  return {getName, addTask, getTasks}
}

export { projectFactory }