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
test(`typing a new task adds it to the stored list`, () => {
    let expected = 'test task';
    
    let inputElements = document.querySelectorAll('.item__description');
    let testInput = inputElements[0];
    testInput.setAttribute('class', 'testTask');
    testInput.value = 'test task';
    testInput.dispatchEvent(pressEnter);

    taskCollection.getAllTasksFromStorage();
    let output = testInput.value;
    
    isEqual(expected, output, 'created a test task');
});

test('typing "/done" will mark a task as completed', () => {
    let expected = true;
    let testInput = document.querySelectorAll('.item__description')[1];
    testInput.value += '/done';
    testInput.dispatchEvent(pressEnter);
    let output = testInput.previousElementSibling.checked;

    isEqual(expected, output);
})

test('typing "/delete" will delete a task', () => {
    let currentTasks = document.querySelectorAll('.item__description');
    let expected = currentTasks.length - 1;
    let testTask = currentTasks[1];
    testTask.value += ' /delete';
    testTask.dispatchEvent(pressEnter);
    let output = document.querySelectorAll('.item__description').length;

    isEqual(expected,output, 'deleted a test task');
});

test('the number of tasks displayed matches the number of task objects in storage', () => { 
    let itemsDisplayed = document.querySelectorAll('.item__description').length;
    taskCollection.getAllTasksFromStorage();
    let itemsSaved = taskCollection.allTasks.length;
        
    isEqual(itemsDisplayed, itemsSaved + 1, `${itemsDisplayed - 1} out of ${itemsSaved} tasks displayed`);
});