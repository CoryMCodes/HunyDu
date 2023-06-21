import {createTDForm, createProjectForm} from "./forms";

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

const formContainer = document.createElement("div");
formContainer.setAttribute("id", "formContainer");
container.appendChild(formContainer);

const projectForm = createProjectForm();
formContainer.appendChild(projectForm);

const taskContainer = document.createElement("div");
taskContainer.setAttribute("id", "allTasks");
container.appendChild(taskContainer);

const projectContainer = document.createElement("div");
projectContainer.setAttribute("id", "allProjects");
container.append(projectContainer);

// add event listeners
addTaskButton.addEventListener("click", (e) => {
  buildAddModal(e.target.id)
});

addProjectButton.addEventListener("click", (e) => {
  buildAddModal(e.target.id);
})

document.body.appendChild(container)
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
  let allTaskContainer = document.getElementById("allTasks");
  allTaskContainer.innerHTML = "";
  
  let allTasks = tasks

  allTasks.forEach((task, index) => {
    let card = buildTaskCard(task, index);
    allTaskContainer.appendChild(card);
    
  })
}

const buildTaskCard = (task, index) =>{
    let taskCard = document.createElement("div");
    taskCard.classList.add("taskCard");
    let taskName = document.createElement("div");
    let taskNameText = document.createTextNode(String((Number(index)+1)).padStart(2,"0") + ": " + task.getName());
    let dropDownArrow = document.createElement("i");
    dropDownArrow.classList.add("fa-solid", "fa-angle-down");
    let taskDesc = document.createElement("div");
    let taskDescText = document.createTextNode("Notes: " + task.getDescription());
    taskDesc.classList.add('taskDescDrawer');
    taskDesc.appendChild(taskDescText);
    taskName.appendChild(taskNameText);
    taskName.appendChild(dropDownArrow);
    taskCard.appendChild(taskName);
    taskCard.appendChild(taskDesc);

    taskCard.addEventListener("click", (e) => {
      if(e.target.closest(".fa-angle-down")){
        console.log(e.target.closest(".fa-angle-down"));
        e.target.closest(".fa-angle-down").classList.contains("rotate") ? e.target.closest(".fa-angle-down").classList.remove("rotate") : e.target.closest(".fa-angle-down").classList.add("rotate");
        toggleDrawer(taskDesc);
      }
    })
    return taskCard
}

//slid down animation
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
  let allProjectsContainer = document.getElementById("allProjects");
  let allProjects = projects;
  allProjectsContainer.innerHTML = "";
  allProjects.forEach((project, index) => {
    // build container for project object
    let projectContainer = document.createElement("div");
    let taskList = document.createElement("ul");
    projectContainer.setAttribute("id", "project-"+(Number(index)+1));
    // build project title
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
const removeModal = () => {
  const modal = document.getElementsByClassName("modal")[0];
  modal.remove();
}



export {buildHomePage, buildTaskList, buildProjectList, removeModal}
