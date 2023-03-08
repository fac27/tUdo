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

function deleteItem(edited){
  let items = Array.from(document.querySelectorAll('.item__description'));
  let index = items.indexOf(edited) - 1;
  
  taskCollection.deleteTask(index);
  renderTaskList();
}

function editItem(edited){
  let items = Array.from(document.querySelectorAll('.item__description'));
  let index = items.indexOf(edited) - 1;
  let newDescription = edited.value;
  let newStatus = edited.parentElement.firstElementChild.checked ? 2 : 1;

  taskCollection.editTask(index, newDescription, newStatus);
  renderTaskList();
}

// listen for User Input //////////////////////////
///// all event listeners can be stored here //////
function listenForKeyStrokes(){
  // listen for keyboard input
  let tasksOnPage = Array.from(document.querySelectorAll(".item__description"));
  let typeToDelete = new RegExp(/(\/d)$/);
  let typeToComplete = new RegExp(/(\/done)$/);

  let sansTypeToComplete = new RegExp(/(^\/done)./);
  
  tasksOnPage.forEach(task => {
    task.addEventListener('keyup', e => {
      if(e.key === 'Enter'){
        if(typeToDelete.test(task.value)) deleteItem(task);

        if(typeToComplete.test(task.value)) {
          let checkBox = task.previousElementSibling;
          checkBox.checked = true;
          task.value = task.value.replace(typeToComplete, '');
          editItem(task);
        };
        
        //further actions go here
        editItem(task); 
      }
    });
  });

  // listen for checkbox interaction
  let checkBoxes = Array.from(document.querySelectorAll('.item__completed'));
  checkBoxes.forEach(box => {
    box.addEventListener('change', () => {
      let index = Array.from(document.querySelectorAll('.item__completed')).indexOf(box) - 1;
      let newDescription = box.nextElementSibling.value;
      let newStatus = box.checked === true ? 2 : 1;

      taskCollection.editTask(index, newDescription, newStatus);

    })
  })
}
// initialise the page ///////////////////////
/////////////////////////////////////////////
renderTaskList();