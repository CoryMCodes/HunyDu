const projectFactory = (name, ...args) => {
  let pName = name;
  let taskArray = args;
  
  const getName = () => pName;
  const changeName = (string) =>  pName = string;

  const getID = () => {return };
  
  const addTask = (task) => {
    taskArray.push(task);
  }

  const getTasks = () => taskArray;
  
  return {getName, changeName, addTask, getTasks}
}

export { projectFactory }