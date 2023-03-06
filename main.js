import { Task, TaskStatus, TaskCollection } from "./modules/task-objects.js";

const canvas = document.querySelector('#canvas');

const taskCollection  = new TaskCollection();

localStorage.clear();
let newTask = new Task("Buy milk", TaskStatus.Pending);
taskCollection.addTask(newTask);
newTask = new Task ("Climb mountain", TaskStatus.Complete);
taskCollection.addTask(newTask);
newTask = new Task ("Write code", TaskStatus.Pending);
taskCollection.addTask(newTask);
newTask = new Task ("Learn React", TaskStatus.Pending);
taskCollection.addTask(newTask);



taskCollection.getAllTasksFromStorage();

taskCollection.addTask(new Task());

taskCollection.displayTasks(canvas);

taskCollection.allTasks[0].focusInput();
