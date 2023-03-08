import { Task, TaskStatus, TaskCollection } from "./modules/task-objects.js";

const taskCollection  = new TaskCollection();
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

const canvas = document.querySelector('#canvas');


// creating new templates //////////////////
///////////////////////////////////////////
const printHTML = (input) => {
  let template = document.createElement("template");
  template.innerHTML = input.trim();
  return template.content.firstElementChild;
};

// new task template
const newItem = (object) => {
  let {description, status} = object;
  let checkedItem = status === TaskStatus.Complete ? 'checked=true' : '';

  let newTask = printHTML(`
    <div class='item width-large'>
      <input type='checkbox' class='item__completed' ${checkedItem}</input>
      <input type="text" class='item__description' placeholder='add item ...'></input>
    </div>
    `);
    canvas.append(newTask);
    
    let textInput = newTask.querySelector('.item__description');
    textInput.value = description;
  };
  
  // initialise the page /////////////////////
  ///////////////////////////////////////////
  function renderTaskList() {
    canvas.innerHTML = "";
    newItem({description:''});
    let emptyTask = document.querySelector('.item__description');
    emptyTask.addEventListener('keyup', e => enterNewItem(e, emptyTask    ));

  taskCollection.getAllTasksFromStorage();
  
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
};

function deleteItem(clicked){
  let items = Array.from(document.querySelectorAll('.item__description'));
  // let clickedTask = clicked.textContent;
  let index = items.indexOf(clicked) - 1;
  
  console.log(`I'm deleting the task in index ${index}`);
  taskCollection.deleteTask(index);
  // setTimeout(renderTaskList(), 1000);
  renderTaskList();
}

// listen for Key Strokes //////////////////////////
///// all event listeners can be stored here //////
function listenForKeyStrokes(){
  let tasksOnPage = Array.from(document.querySelectorAll(".item__description"));
  let typeToDelete = new RegExp(/(\/d)$/)
  
  tasksOnPage.forEach(task => {
    task.addEventListener('keydown', e => {
      if(e.key === 'Enter'){
        if(typeToDelete.test(task.value)) {
          console.log(task.value);
          deleteItem(task);
        };
      }
    });
  });
  
}
// initialise the page ///////////////////////
/////////////////////////////////////////////
renderTaskList();