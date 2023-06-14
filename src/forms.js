import { toDoFactory } from "./taskFactory";
import { taskHolder, projectHolder } from "./informationHolder";
import { projectFactory } from "./projectFactory";
import { buildTaskList } from "./viewController";

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
    console.log("Task Added");
    taskHolder.allTasks.forEach((task, index) => {
      console.log(index+1 +": Name: "+task.getName()+" Description: "+task.getDescription())
    })

    // build task view with function from viewController module
    buildTaskList(taskHolder.allTasks);
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

   //create submit button
   let submit = document.createElement("input");
   submit.setAttribute("type", "submit"); 
   submit.innerText = "Submit";

  form.appendChild(nameLabel);
  form.appendChild(projectName);
  form.appendChild(submit);

  //add event listener
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let submittedName =  document.querySelector("[name=ProjectName]").value;
    let newProject = projectFactory(submittedName);

    projectHolder.addProject(newProject);
    projectHolder.allProjects.forEach((project, index) => {
      console.log(index+1 + ": " + project.getName())
    })
  })


  return form;
  }

export { createTDForm, createProjectForm };