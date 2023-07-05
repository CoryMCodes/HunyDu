import { toDoFactory } from "./taskFactory";
import { taskHolder, projectHolder } from "./informationHolder";
import { projectFactory } from "./projectFactory";
import { buildTaskList, buildProjectList, removeModal } from "./viewController";

const createTDForm = () => {
  // create form 
  let form = document.createElement("form");
  form.classList.add("taskForm");
  
  // task name input  
  let taskName = document.createElement("input");
  taskName.setAttribute("type", "text");
  taskName.setAttribute("name", "TaskName");
  let nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "TaskName");
  nameLabel.innerText = "Task Name:";

  // create description input
  let taskDescription = document.createElement("input");
  taskDescription.setAttribute("type", "text");
  taskDescription.setAttribute("name", "TaskDescription");
  let descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "TaskDescription");
  descriptionLabel.innerText = "Description:";

  //create submit button
  let submit = document.createElement("input");
  submit.setAttribute("type", "submit"); 
  submit.innerText = "Submit";

  //append elements
  form.appendChild(nameLabel);
  form.appendChild(taskName);
  form.appendChild(descriptionLabel);
  form.appendChild(taskDescription);
  form.appendChild(submit);

  //add event listener
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let submittedName =  document.querySelector("[name=TaskName]").value;
    let submittedDescription = document.querySelector("[name=TaskDescription]").value;
    let newTask = toDoFactory(submittedName, submittedDescription);
    
    taskHolder.addTask(newTask);

    // build task view with function from viewController module
    buildProjectList(projectHolder.allProjects);
    buildTaskList(taskHolder.allTasks);
    removeModal();
  })

  return form
}

const createProjectForm = () => {
  // create form 
  let form = document.createElement("form");
  form.classList.add("projectForm");
  
  // task name input  
  let projectName = document.createElement("input");
  projectName.setAttribute("type", "text");
  projectName.setAttribute("name", "ProjectName");
  let nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "Project Name");
  nameLabel.innerText = "Project Name:";
  let projectFormTaskContainer = document.createElement("div");
  projectFormTaskContainer.classList.add("project-form-tasks");
  
  // build task checkboxes to add tasks to new project
  if(taskHolder.allTasks){
    taskHolder.allTasks.forEach(task => {
      let taskLabel = document.createElement("label");
      taskLabel.setAttribute("for", "add-"+task.getName());
      let taskLabelText = document.createTextNode(task.getName());
      taskLabel.appendChild(taskLabelText);
      let taskInput = document.createElement("input");
      taskInput.setAttribute("type", "checkbox");
      taskInput.setAttribute("name", task.getName());
      taskInput.setAttribute("id", "add-"+task.getName());
      taskInput.classList.add("addTaskCheckbox");
      projectFormTaskContainer.appendChild(taskLabel);
      projectFormTaskContainer.appendChild(taskInput);
    })
}
   //create submit button
   let submit = document.createElement("input");
   submit.setAttribute("type", "submit"); 
   submit.innerText = "Submit";

  form.appendChild(nameLabel);
  form.appendChild(projectName);
  form.appendChild(projectFormTaskContainer);
  form.appendChild(submit);

  //add event listener
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let submittedName =  document.querySelector("[name=ProjectName]").value;
    let taskObjs = [];
    let taskNames = document.querySelectorAll(".addTaskCheckbox");
    taskNames.forEach(taskName => {
      if(taskName.checked){
        let taskObj = taskHolder.getTaskByName(taskName.name);
        taskObj.setParentProject(submittedName);
        taskObjs.push(taskObj);
      }
    })
    let newProject = projectFactory(submittedName, ...taskObjs);
    
    projectHolder.addProject(newProject);

    buildProjectList(projectHolder.allProjects);
    buildTaskList(taskHolder.allTasks);
    removeModal();    
  })


  return form;
  }

export { createTDForm, createProjectForm };