
import { toDoFactory } from "./taskFactory";
import {createTDForm, createProjectForm} from "./forms";
import { taskHolder} from "./informationHolder";


const form1 = createTDForm();
document.getElementById("content").appendChild(form1);

const projectForm = createProjectForm();
document.getElementById("content").appendChild(projectForm);