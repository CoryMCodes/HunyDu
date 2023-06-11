import { toDoFactory } from "./tdTask";
import { taskHolder } from "./informationHolder";

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
    console.log("Name: " + newTask.getName() + "Description: " + newTask.getDescription() )
    
    taskHolder.addTask(newTask);
    console.log("Task Added");
  })

  return form
}

export { createTDForm };