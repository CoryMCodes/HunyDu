import { taskHolder } from "./informationHolder";

const buildTaskList = (tasks) => {
  let allTaskContainer = document.getElementById("allTasks");
  allTaskContainer.innerHTML = "";
  
  let allTasks = tasks

  allTasks.forEach(task => {
    let taskContainer = document.createElement("div");
    let taskName = document.createElement("div");
    let taskNameText = document.createTextNode(task.getName());
    taskName.appendChild(taskNameText);
    taskContainer.appendChild(taskName);
    allTaskContainer.appendChild(taskContainer);
    
  })
}

export {buildTaskList}
