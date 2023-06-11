
import { toDoFactory } from "./tdTask";
import {createTDForm} from "./forms";
import { taskHolder} from "./informationHolder";


const form1 = createTDForm();
document.getElementById("content").appendChild(form1)