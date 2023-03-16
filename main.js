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

const canvas = document.querySelector("#canvas");
const infoButton = document.querySelector(".nav-bar");
const toggleThemeButton = document.querySelector(
  ".nav-bar__toggle-theme--logo"
);
const toggleFilter = document.querySelector(".nav-bar__filter");

// Disable context menu on nav-bar
infoButton.addEventListener("contextmenu", (e) => e.preventDefault());
// Set up toggle theme event handler
toggleThemeButton.addEventListener("click", (e) => {
  toggleTheme(e);
});
// Set up toggle show/hide completed tasks event handler
toggleFilter.addEventListener("click", (e) => {
  toggleCompletedTasks();
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
      <button type='button' class='item__delete-button' tabindex='-1'>&#9988;</button>
    </div>
    `);

  canvas.append(newTask);

  let textInput = newTask.querySelector(".item__description");
  textInput.value = description;
};

// initialise the page /////////////////////
///////////////////////////////////////////
function renderTaskList() {
  canvas.innerHTML = "";
  newItem({ description: "" });
  let emptyTask = document.querySelector(".item__description");
  emptyTask.addEventListener("keyup", (e) => enterNewItem(e, emptyTask));

  taskCollection.getAllTasksFromStorage();

  for (let i = 0; i < taskCollection.allTasks.length; i++) {
    newItem(taskCollection.allTasks[i]);
  }
  listenForKeyStrokes();
  filterItemsOnPage();
}

// keyboard commands ////////////////////////
////////////////////////////////////////////
function enterNewItem(keyPress, activeElement) {
  let emptyField = new RegExp(/^\s*$/);
  
  if (keyPress.key === "Enter" && !emptyField.test(activeElement.value)) {
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

function makeButtonActive(button) {
  button.classList.toggle("nav-bar__info-logo--active");
  button.blur();
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
  let emptyField = new RegExp(/^\s*$/);

  tasksOnPage.forEach((task) => {
    task.addEventListener("keyup", (e) => {
      if (e.key !== "Enter" || emptyField.test(task.value))
        return;
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

  // listen for delete buttons
  let deleteButtons = Array.from(
    document.querySelectorAll(".item__delete-button")
  ).splice(1);
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let selectedItem =
        button.parentElement.querySelector(".item__description");
      deleteItem(selectedItem);
    });
  });

  //listen for navbar interaction
  let infoButton = document.querySelector(".nav-bar__info-logo");
  infoButton.addEventListener("click", () => makeButtonActive(infoButton));
}

function toggleTheme(event) {
  const element = event.srcElement;
  const bodyElement = document.querySelector("body");

  const currentTheme = bodyElement.getAttribute("data-theme");

  if (currentTheme === "light") {
    element.innerHTML = "&#9728";
    bodyElement.setAttribute("data-theme", "dark");
  } else {
    element.innerHTML = "&#9790";
    bodyElement.setAttribute("data-theme", "light");
  }
}

function filterItemsOnPage() {
  let tasksOnPage = document.querySelectorAll(".item");
  let isFilterOn = document
    .getElementById("toggle-filter")
    .classList.contains("nav-bar__filter--active")
    ? true
    : false;
  tasksOnPage.forEach((task) => {
    if (isFilterOn) return task.classList.add("item--filtered-out");
    task.classList.remove("item--filtered-out");
  });
}

function turnFilterOff() {
  let filterButton = document.getElementById("toggle-filter");
  filterButton.classList.remove("nav-bar__filter--active");
  filterButton.innerHTML = "&#9745";
  filterItemsOnPage();
}

function turnFilterOn() {
  let filterButton = document.getElementById("toggle-filter");
  filterButton.classList.add("nav-bar__filter--active");
  filterButton.innerHTML = "&#9744";
  filterItemsOnPage();
}

function toggleCompletedTasks() {
  let isFilterOn = document
    .getElementById("toggle-filter")
    .classList.contains("nav-bar__filter--active")
    ? true
    : false;
  isFilterOn ? turnFilterOff() : turnFilterOn();
}

// initialise the page ///////////////////////
/////////////////////////////////////////////
renderTaskList();
