const toDoFactory = (name, description) => {
  let id;
  let dueDate;

  const getId = () => id;
  const setId = (num) => id = num;

  const getName = () => name;
  
  const getDueDate = () => {

  }
  const setDueDate = () => {
    
  }
  const getDescription = () => description;

  return {getId, setId, getName, setDueDate, getDescription}
}

export {toDoFactory};