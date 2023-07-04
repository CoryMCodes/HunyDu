const toDoFactory = (name, description) => {
  let isComplete = false;
  let parentProject;

  // has project BOOL 
  let hasProject;

  const setParentProject = (string) => {
    updateParentProject(string);
    setHasProject(true);
  };

  const removeParentProject = () => {
    updateParentProject("");
    setHasProject(false);
  }

  const getHasProject = () => hasProject;

  const updateParentProject = (string) => parentProject = string;
  
  const setHasProject = (bool) => hasProject = bool;

  const getParentProject = () => parentProject;
  // project name
  const getName = () => name;
  
  const getDescription = () => description;

  const setComplete = () => isComplete = true;

  return {getName, getDescription, setComplete, setParentProject, removeParentProject, getParentProject, getHasProject}
}

export {toDoFactory};