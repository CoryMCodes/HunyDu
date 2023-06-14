
import { toDoFactory } from "./taskFactory";
import {createTDForm, createProjectForm} from "./forms";
import { taskHolder} from "./informationHolder";


const form1 = createTDForm();
document.getElementById("formContainer").appendChild(form1);

const projectForm = createProjectForm();
document.getElementById("formContainer").appendChild(projectForm);