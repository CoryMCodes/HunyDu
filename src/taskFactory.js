const toDoFactory = (name, description) => {
  let dueDate;
  let parentProject;

  const setParentProject = (num) => parentProject = num; 

  function setId(num) {
    return id = num;
  }

  const getName = () => name;
  
  const getDueDate = () => {

  }
  const setDueDate = () => {
    
  }
  const getDescription = () => description;

  return {setId, getName, setDueDate, getDescription, setParentProject}
}

export {toDoFactory};