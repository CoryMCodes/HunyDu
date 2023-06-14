const buildTaskList = (tasks) => {
  let allTaskContainer = document.getElementById("allTasks");
  allTaskContainer.innerHTML = "";
  
  let allTasks = tasks

  allTasks.forEach((task, index) => {
    let taskContainer = document.createElement("div");
    let taskName = document.createElement("div");
    let taskNameText = document.createTextNode("Task " + (Number(index)+1) + ": " + task.getName());
    let taskDesc = document.createElement("div");
    let taskDescText = document.createTextNode("Notes: " + task.getDescription());
    taskDesc.appendChild(taskDescText);
    taskName.appendChild(taskNameText);
    taskContainer.appendChild(taskName);
    taskContainer.appendChild(taskDesc);
    allTaskContainer.appendChild(taskContainer);
    
  })
}

const buildProjectList = (projects) => {
  let allProjectsContainer = document.getElementById("allProjects");
  let allProjects = projects;
  allProjectsContainer.innerHTML = "";
  allProjects.forEach((project, index) => {
    // build container for project object
    let projectContainer = document.createElement("div");
    let taskList = document.createElement("ul");
    projectContainer.setAttribute("id", "project-"+(Number(index)+1));
    // build proct title
    let projectName = document.createElement("div");
    let projectNameText = document.createTextNode("Project " + (Number(index)+1) + ": " + project.getName());
    projectName.appendChild(projectNameText);
    projectContainer.appendChild(projectName);

    // if project has tasks build sub-tasks list
    if(project.getTasks != null){
      project.getTasks().forEach(task => {
        console.log(task.getName() + " : " + task.getDescription())
        let listItem = document.createElement("li");
        let listText = document.createTextNode(task.getName() + ' - ' + task.getDescription())
        listItem.appendChild(listText);
        taskList.append(listItem);
       
      }) 
      projectContainer.appendChild(taskList);
    }
    
   
    allProjectsContainer.appendChild(projectContainer);
  })
}



export {buildTaskList, buildProjectList}
