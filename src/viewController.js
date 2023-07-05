import {createTDForm, createProjectForm} from "./forms";
import { taskHolder, projectHolder } from "./informationHolder";

const buildHomePage = () => {
  //build index header
 const header = document.createElement("header");
 const headerLeft = document.createElement("div");
 const headerLeftText = document.createTextNode("HunnyDu");
 const headerRight = document.createElement("div");
 const addTaskButton = document.createElement("button");
 const addProjectButton = document.createElement("button");
 const addTaskText = document.createTextNode("Task +");
 addTaskButton.setAttribute("id", "addTaskButton")
 const addProjectText = document.createTextNode("Project +");
 addProjectButton.setAttribute("id", "addProjectButton");
 addTaskButton.appendChild(addTaskText);
 addProjectButton.appendChild(addProjectText);
 headerLeft.appendChild(headerLeftText);
 headerRight.appendChild(addTaskButton);
 headerRight.appendChild(addProjectButton);
 header.appendChild(headerLeft);
 header.appendChild(headerRight);
 header.classList.add("header");
 document.body.appendChild(header);

 // create main layout
const container = document.createElement("div");
container.setAttribute("id", "container");

// create main task container
const taskContainer = document.createElement("div");
taskContainer.classList.add("list-container");
const taskTitle = document.createElement("div");
taskTitle.classList.add("container-title");
const taskListContainer = document.createElement("div");
taskListContainer.setAttribute("id", "allTasks");
const taskTitleText = document.createTextNode("Task List");
taskTitle.appendChild(taskTitleText);
taskContainer.appendChild(taskTitle);
taskContainer.appendChild(taskListContainer);
container.appendChild(taskContainer);

// create main project container
const projectContainer = document.createElement("div");
projectContainer.classList.add("list-container");
projectContainer.classList.add("project-container");
const projectContainerTitle = document.createElement("div");
const projectContainerTitleText = document.createTextNode("Projects");
projectContainerTitle.appendChild(projectContainerTitleText)
projectContainerTitle.classList.add("container-title");
projectContainer.appendChild(projectContainerTitle);
const projectListContainer = document.createElement("div");
projectListContainer.setAttribute("id", "allProjects");
const projectListContainerDefaultText = document.createTextNode("Use Project+ to add project!");
projectListContainer.appendChild(projectListContainerDefaultText);
projectContainer.appendChild(projectListContainer);
container.append(projectContainer);

// add event listeners
addTaskButton.addEventListener("click", (e) => {
  buildAddModal(e.target.id)
});

addProjectButton.addEventListener("click", (e) => {
  buildAddModal(e.target.id);
})

document.body.appendChild(container)
buildTaskList(taskHolder.allTasks)
}

// task modal
const buildAddModal = (id) => {
  let title;
  let form;
  if(id === "addTaskButton"){
    title = document.createTextNode("Add New Task");
    form = createTDForm();
  }
  if(id === "addProjectButton"){
    title = document.createTextNode("Add New Project");
    form = createProjectForm();
  }
  const container = document.getElementById("container");
  const modal = document.createElement("div");
  const modalTitle = document.createElement("div");
  modal.classList.add("modalTitle");
  modalTitle.appendChild(title);
  modal.appendChild(modalTitle);
  modal.setAttribute("id", "modal");
  modal.classList.add("modal");
  modal.appendChild(form)
  container.appendChild(modal);
}


const buildTaskList = (tasks) => {
  // reset task container
  let allTaskContainer = document.getElementById("allTasks");
  allTaskContainer.innerHTML = "";
  
  // get passed tasks
  let allTasks = tasks

  allTasks.forEach(task => {
    // build task ui
    let taskCard = buildTaskCard(task);
    // filter for if task has project - append to related project or to all tasks
    if(task.getHasProject()){
      let projectTaskList = document.getElementById(`${task.getParentProject()}-tasklist`);
      projectTaskList.appendChild(taskCard);
    }else{
      allTaskContainer.appendChild(taskCard);
    }
  })

  // Render instruction message if All Task List is empty
  if(allTaskContainer.children.length === 0){
    const taskListDefaultText = document.createTextNode("Use Task+ To Add Tasks!")
    allTaskContainer.appendChild(taskListDefaultText);
  }
}

const buildTaskCard = (task) =>{
    let taskCard = document.createElement("div");
    taskCard.classList.add("taskCard");
    let taskName = document.createElement("div");
    let taskNameText = document.createTextNode(task.getName());
    let dropDownArrow = document.createElement("i");
    dropDownArrow.classList.add("fa-solid", "fa-angle-down", "arrow-span");
    let completeCheck = document.createElement("i");
    completeCheck.classList.add("fa-solid", "fa-check");
    let deleteX = document.createElement("i");
    deleteX.classList.add("fa-solid", "fa-x")
    let moveArrows = document.createElement("i");
    moveArrows.classList.add("fa-solid", "fa-arrows-up-down-left-right")
    let taskDesc = document.createElement("div");
    let taskDescText = document.createTextNode("Notes: " + task.getDescription());
    taskDesc.classList.add('taskDescDrawer');
    taskDesc.appendChild(taskDescText);
    taskName.appendChild(taskNameText);
    taskName.appendChild(moveArrows);
    taskName.appendChild(deleteX);
    taskName.appendChild(completeCheck);
    taskName.appendChild(dropDownArrow);
    taskCard.appendChild(taskName);
    taskCard.appendChild(taskDesc);

    taskCard.addEventListener("click", (e) => {
      if(e.target.closest(".fa-angle-down")){
        e.target.closest(".fa-angle-down").classList.contains("rotate") ? e.target.closest(".fa-angle-down").classList.remove("rotate") : e.target.closest(".fa-angle-down").classList.add("rotate");
        toggleDrawer(taskDesc);
      }
      if(e.target.closest(".fa-x")){
        taskHolder.deleteTask(task.getName());
         buildProjectList(projectHolder.allProjects);
         buildTaskList(taskHolder.allTasks);
       
      };
    })
    return taskCard
}

//slide down animation
const slideDown = elem => elem.style.height = `${elem.scrollHeight}px`;
const slideUp = elem => elem.style.height = 0;
const toggleDrawer = (elem) => {
  if(elem.style.height === "0px" || elem.style.height == 0){
    slideDown(elem)
  }else{
    slideUp(elem)
  }
}

const buildProjectList = (projects) => {
  // build project container
  let allProjectsContainer = document.getElementById("allProjects");
  let allProjects = projects;
  allProjectsContainer.innerHTML = "";
  // if projects array is not empty build a container for each project
  if(projects.length != 0){
  allProjects.forEach((project) => {
    // build container for project object
    let projectContainer = document.createElement("div");
    projectContainer.setAttribute("id", "project-"+project.getName());
    projectContainer.classList.add("project");
    // build project title
    let projectName = document.createElement("div");
    projectName.classList.add("project-title");
    let projectNameText = document.createTextNode(`${project.getName()}`);
    let deleteX = document.createElement("i");
    deleteX.classList.add("fa-solid", "fa-x")
    let taskContainer = document.createElement("div");
    
    // build and reset task container
    taskContainer.setAttribute("id", `${project.getName()}-tasklist`)
    taskContainer.innerHTML = "";

    // append project
    projectName.appendChild(projectNameText);
    projectName.appendChild(deleteX);
    projectContainer.appendChild(projectName);
    projectContainer.appendChild(taskContainer);

    projectContainer.addEventListener("click", (e) => {
      if(e.target.closest(".fa-x")){
        projectHolder.deleteProject(project.getName());
         buildProjectList(projectHolder.allProjects);
         buildTaskList(taskHolder.allTasks);
      }
    })
    // append project to project container
    allProjectsContainer.appendChild(projectContainer);
  })
}else{
  // If All project length === 0 
  const projectListContainerDefaultText = document.createTextNode("Use Project+ to add project!");
  allProjectsContainer.appendChild(projectListContainerDefaultText);
}
}

const removeModal = () => {
  const modal = document.getElementsByClassName("modal")[0];
  modal.remove();
}



export {buildHomePage, buildTaskList, buildProjectList, removeModal}
