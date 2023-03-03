import { Task, TaskStatus, TaskCollection } from "./modules/task-objects.js";

//localStorage.clear();

const taskCollection  = new TaskCollection();
// let newTask = new Task("Buy milk", TaskStatus.Pending);
// taskCollection.addTask(newTask);
// newTask = new Task ("Climb mountain", TaskStatus.InProgress);
// taskCollection.addTask(newTask);
// newTask = new Task ("Tickle Sammy", TaskStatus.Pending);
// taskCollection.addTask(newTask);
// newTask = new Task ("Tickle Noah", TaskStatus.Pending);
// taskCollection.addTask(newTask);
taskCollection.getAllTasksFromStorage();
taskCollection.allTasks.forEach((task) => {
    console.log(`Description: ${task.description}, Status: ${task.getStatusText()}`);
});

const canvas = document.querySelector('#canvas');

// creating new templates //////////////////
///////////////////////////////////////////
const printHTML = (input) => {
    let template = document.createElement('template');
    template.innerHTML = input.trim();
    return template.content.firstElementChild;
}

// new task template
const newItem = () => {
    let newTask = printHTML(`
        <div class='item'>
            <input type='checkbox' class='item__completed'</input>
            <input type="text" class='item__description' placeholder='add item ...'></input>
        </div>
        `);
    canvas.append(newTask);
    let textInput = newTask.querySelector('.item__description');

    // event listener to add new items
    textInput.addEventListener("keyup", event => {
        enterNewItem(event, textInput);
    });
};


// local storage ///////////////////
///////////////////////////////////

// update local storage
function setStorage(tasks) {
    let updatedTaskList = JSON.stringify(tasks);
    localStorage.setItem('task-list', updatedTaskList);
}

// collect from local storage
function retrieveStorage() {
    let taskList = localStorage.getItem('task-list') || '[]';
    return JSON.parse(taskList);
};

//variable containing the current values in storage
const currentTaskList = retrieveStorage();

//create a new task object to send to local storage
function newTaskObject(text, done = false) {
    currentTaskList.unshift({
        completed: done,
        description: text
    });

    setStorage(currentTaskList);
}

// update tasks after being initialised
function updateTask() {

}

// initialise the page /////////////////////
///////////////////////////////////////////
function renderTaskList() {
    canvas.innerHTML = '';
    newItem();
    for (let i = 0; i < currentTaskList.length; i++) {
        let { description, completed: done } = currentTaskList[i];

        newItem();

        let allTaskDescriptions = document.querySelectorAll('.item__description');
        let taskDescription = allTaskDescriptions[allTaskDescriptions.length - 1];
        taskDescription.value = description;

        let allTasksStatus = document.querySelectorAll('.item__completed');
        let taskDone = allTasksStatus[allTasksStatus.length - 1];
        taskDone.checked = done;

        let newestTask = allTaskDescriptions[0];
        newestTask.focus();
    };
}

// keyboard commands ////////////////////////
////////////////////////////////////////////
function enterNewItem(keyPress, activeElement) {
    if (keyPress.key === "Enter") {
        let description = activeElement.value;
        let done = activeElement.parentElement.querySelector("input").checked;
        newTaskObject(description, done);
        renderTaskList();
    }
};

// initialise the page ///////////////////////
/////////////////////////////////////////////
renderTaskList()