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
   let element = printHTML(`
        <div class='item'>
            <input type='checkbox' class='item__completed'</input>
            <input type="text" class='item__description' placeholder='add item ...'></input>
        </div>
`);
    canvas.append(element);
    
};


// local storage ///////////////////
///////////////////////////////////

// update local storage
function setStorage(tasks) {
    let updatedTaskList = JSON.stringify(tasks);
    localStorage.setItem('task-list', updatedTaskList);
};

// collect from local storage
function retrieveStorage() {
    let taskList = localStorage.getItem('task-list') || '[]';
    return JSON.parse(taskList);
};

//variable containing the current values in storage
const currentTaskList = retrieveStorage();

//create a new task object to send to local storage
function newTaskObject(text, done=false) {
    currentTaskList.push({
        completed: done,
        description: text
    });
    
    setStorage(currentTaskList);
}


// initialise the page /////////////////////
///////////////////////////////////////////
function renderTaskList() {
    canvas.innerHTML = '';
    newItem();
    for (let i = 0; i < currentTaskList.length; i++){
        let {description, completed:done} = currentTaskList[i];
        
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

renderTaskList()

// keyboard commands ////////////////////////
////////////////////////////////////////////
const tasks = document.querySelectorAll('.item__description');
tasks.forEach(task => {
    task.addEventListener('keyup', e => {
        if (e.key === 'Enter'){
            let description = task.value;
            let done = task.parentElement.querySelector('input').checked;
            newTaskObject(description, done);
            console.dir(currentTaskList);
            renderTaskList();
        }
    })
});