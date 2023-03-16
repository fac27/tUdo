// access the modules ////////////////////////
/////////////////////////////////////////////
import { Task, TaskStatus, TaskCollection } from "./modules/task-objects.js";

const taskCollection = new TaskCollection();
// test helpers /////////////////////////////
////////////////////////////////////////////
function test(string, func){
    console.group(string);
    func();
    console.groupEnd();
};

function isEqual(expected, output, message = `you expected ${expected} and got ${output}`){
    if (expected === output) {
        console.info(`%cPASS: ${message}`, 'color:green; font-size:12px');
    }else{
        console.info(`%cFAIl: ${message}`, "color:darkred; font-size:12px");
    }
};

function isDifferent(expected, output, message = `you expected ${expected} and got ${output}`){
    if (expected !== output){
        console.info(`%cPASS: ${message}`, "color:green; font-size:12px");
    }else{
        console.info(`%cFAIL: ${message}`, 'color:darkred; font-size:12px');
    }
}

const pressEnter = new KeyboardEvent('keyup', {key: 'Enter'});
// production tests ////////////////////////
/////////////////////////////////////////
function typeToCreate() {
    let expected = 'test task';

    let emptyTask = document.querySelectorAll('.item__description')[0];
    emptyTask.value = 'test task';
    emptyTask.dispatchEvent(pressEnter);
    
    let testInput = document.querySelectorAll('.item__description')[1];
    testInput.classList.add('test-task');

    taskCollection.getAllTasksFromStorage();
    let output = testInput.value;
    
    isEqual(expected, output, 'created a test task');
};

function typeToEdit() {
    let expected = 'changed task';

    let testInput = document.querySelector('.test-task');
    testInput.value = 'changed task';
    testInput.dispatchEvent(pressEnter);

    let latestTask = document.querySelectorAll('.item__description')[1];
    latestTask.classList.add('test-task');

    let output = testInput.value;

    isEqual(expected, output, `the test task is displaying ${output}`);
}

function typeToComplete() {
    let expected = true;

    let testInput = document.querySelector('.test-task');
    testInput.value += '/done';
    testInput.dispatchEvent(pressEnter);

    let latestTask = document.querySelectorAll('.item__description')[1];
    latestTask.classList.add('test-task');

    let output = testInput.previousElementSibling.checked;

    isEqual(expected, output);
};

function typeToUncheck() {
    let expected = false;

    let testInput = document.querySelector('.test-task');
    testInput.value += '/pending';
    testInput.dispatchEvent(pressEnter);

    let latestTask = document.querySelectorAll('.item__description')[1];
    latestTask.classList.add('test-task');

    let output = testInput.previousElementSibling.checked;

    isEqual(expected, output);
};

function typeToDelete() {
    let expected = 0;

    let testTask = document.querySelector('.test-task');
    testTask.value += ' /delete';
    testTask.dispatchEvent(pressEnter);

    let output = document.querySelectorAll('.test-task').length;

    isEqual(expected,output, 'deleted a test task');
};

function trackTaskListInStorage() { 
    let itemsDisplayed = document.querySelectorAll('.item__description').length;
    taskCollection.getAllTasksFromStorage();
    let itemsSaved = taskCollection.allTasks.length;
        
    isEqual(itemsDisplayed, itemsSaved + 1, `${itemsDisplayed - 1} out of ${itemsSaved} tasks displayed`);
};

function runTests(){
    let allStrings = [
        'typing a new task adds it to the stored list', 
        'editing an existing item will change the associated task',
        'typing "/done" marks a task as completed', 
        'typing "/pending" marks a task as pending',
        'typing "/delete" removes a task', 
        'the number of tasks displayed matches the number of task objects in storage'
    ];

    let allTests = [
        typeToCreate, 
        typeToEdit,
        typeToComplete, 
        typeToUncheck,
        typeToDelete, 
        trackTaskListInStorage
    ];
    
    for(let i = 0; i < allTests.length; i++){
        setTimeout(() => test(allStrings[i], allTests[i]), i * 1000);
    }
}

runTests();