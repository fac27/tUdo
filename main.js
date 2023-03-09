import { Task, TaskStatus, TaskCollection } from "./modules/task-objects.js";

const taskCollection = new TaskCollection();
// let newTask = new Task("Buy milk", TaskStatus.Pending);
// taskCollection.addTask(newTask);
// newTask = new Task ("Climb mountain", TaskStatus.InProgress);
// taskCollection.addTask(newTask);
// newTask = new Task ("Write code", TaskStatus.Pending);
// taskCollection.addTask(newTask);
// newTask = new Task ("Learn React", TaskStatus.Pending);
// taskCollection.addTask(newTask);
// taskCollection.getAllTasksFromStorage();
// taskCollection.allTasks.forEach((task) => {
//     console.log(`Description: ${task.description}, Status: ${task.getStatusText()}`);
// });

let showCompletedTasks = true;
const canvas = document.querySelector("#canvas");
const infoButton = document.querySelector(".nav-bar");
const toggleThemeButton = document.querySelector(
  ".nav-bar__toggle-theme--logo"
);
const toggleCompletedTasksButton = document.querySelector(
  ".nav-bar__toggle-completed--logo"
);

// Disable context menu on nav-bar
infoButton.addEventListener("contextmenu", (e) => e.preventDefault());
// Set up toggle theme event handler
toggleThemeButton.addEventListener("click", (e) => {
  toggleTheme(e);
});
// Set up toggle show/hide completed tasks event handler
toggleCompletedTasksButton.addEventListener("click", (e) => {
  toggleCompletedTasks(e);
});


// Get all keyboard navigable buttons and capture Enter and Space pressed events for accessibility
const allNavBarButtons = document.querySelectorAll(".keyboard-navigable");
for (let button of allNavBarButtons) {
  button.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === "Space") {
      e.target.click();
    }
  });
}

// creating new templates //////////////////
///////////////////////////////////////////
const printHTML = (input) => {
  let template = document.createElement("template");
  template.innerHTML = input.trim();
  return template.content.firstElementChild;
};

// new task template
const newItem = (object) => {
  let { description, status } = object;
  let checkedItem = status === TaskStatus.Complete ? "checked=true" : "";

  let newTask = printHTML(`
    <div class='item width-large'>
      <input type='checkbox' class='item__completed' ${checkedItem}</input>
      <input type="text" class='item__description' placeholder='add item ...'></input>
    </div>
    `);
  canvas.append(newTask);

  let textInput = newTask.querySelector(".item__description");
  textInput.value = description;
};

// initialise the page /////////////////////
///////////////////////////////////////////
function renderTaskList(showCompleted = true) {
  canvas.innerHTML = "";
  newItem({ description: "" });
  let emptyTask = document.querySelector(".item__description");
  emptyTask.addEventListener("keyup", (e) => enterNewItem(e, emptyTask));


  taskCollection.getAllTasksFromStorage(showCompleted);

  for (let i = 0; i < taskCollection.allTasks.length; i++) {
    newItem(taskCollection.allTasks[i]);
  }
  listenForKeyStrokes();
}

// keyboard commands ////////////////////////
////////////////////////////////////////////
function enterNewItem(keyPress, activeElement) {
  if (keyPress.key === "Enter") {
    let description = activeElement.value;
    let done = activeElement.parentElement.querySelector("input").checked;
    let status = done === true ? TaskStatus.Complete : TaskStatus.InProgress;
    taskCollection.addTask(new Task(description, status));
    taskCollection.saveAllTasksToStorage;
    renderTaskList();
  }
}

function deleteItem(edited) {
  let items = Array.from(
    document.querySelectorAll(".item__description")
  ).splice(1);
  let index = items.indexOf(edited);
  taskCollection.deleteTask(index);
  renderTaskList();
}

function editItem(edited) {
  let items = Array.from(
    document.querySelectorAll(".item__description")
  ).splice(1);
  let index = items.indexOf(edited);
  let newDescription = edited.value;
  let newStatus = edited.parentElement.firstElementChild.checked ? 2 : 1;

  taskCollection.editTask(index, newDescription, newStatus);
  renderTaskList();
}

function tickItem(edited) {
  let checkBox = edited.previousElementSibling;
  checkBox.checked = true;
  edited.value = edited.value.replace(/(\/done)$/, "");
  editItem(edited);
}

function untickItem(edited) {
  let checkBox = edited.previousElementSibling;
  checkBox.checked = false;
  edited.value = edited.value.replace(/(\/pending)$/, "");
  editItem(edited);
}

// listen for User Input //////////////////////////
///// all event listeners can be stored here //////
function listenForKeyStrokes() {
  // listen for keyboard input
  let tasksOnPage = Array.from(
    document.querySelectorAll(".item__description")
  ).splice(1);

  let typeToDelete = new RegExp(/(\/delete)$/);
  let typeToComplete = new RegExp(/(\/done)$/);
  let typeToUntick = new RegExp(/(\/pending)$/);

  tasksOnPage.forEach((task) => {
    task.addEventListener("keyup", (e) => {
      if (e.key !== "Enter") return;
      if (typeToDelete.test(task.value)) return deleteItem(task);
      if (typeToComplete.test(task.value)) return tickItem(task);
      if (typeToUntick.test(task.value)) return untickItem(task);
      editItem(task);
    });
  });

  // listen for checkbox interaction
  let checkBoxes = Array.from(
    document.querySelectorAll(".item__completed")
  ).splice(1);

  checkBoxes.forEach((box) => {
    box.addEventListener("change", () => {
      let index = checkBoxes.indexOf(box);
      let newDescription = box.nextElementSibling.value;
      let newStatus = box.checked === true ? 2 : 1;

      taskCollection.editTask(index, newDescription, newStatus);
    });
  });
}

function toggleTheme(event) {
  const element = event.srcElement;
  const bodyElement = document.querySelector("body");

  const currentTheme = bodyElement.getAttribute("data-theme");

  if (currentTheme === "light") {
    element.innerHTML = "&#127774";
    bodyElement.setAttribute("data-theme", "dark");
  } else {
    element.innerHTML = "&#127772";
    bodyElement.setAttribute("data-theme", "light");
  }
}

function toggleCompletedTasks(event) {
  const element = event.srcElement;

  if (showCompletedTasks) {
    element.innerHTML = "&#128578";
    renderTaskList(false);
  } else {
    element.innerHTML = "&#129323";
    renderTaskList();  // <<<<------------------- THIS IS IN THE WRONG PLACE TO WORK
  }
  showCompletedTasks = !showCompletedTasks;
}

// initialise the page ///////////////////////
/////////////////////////////////////////////
renderTaskList();


// &#129323 shhh
// &#128578 face