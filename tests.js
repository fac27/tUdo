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

// production tests ////////////////////////
/////////////////////////////////////////
test(`typing a new task adds it to the stored list`, () => {
    let expected = 'test task';
    
    let inputElements = document.querySelectorAll('.item__description');
    inputElements[0].value = 'test task';
    inputElements[0].dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));

    taskCollection.getAllTasksFromStorage();
    let output = inputElements[0].value;
    
    isEqual(expected, output, 'created a test task');
});

test('typing "/d" will delete a task', () => {
    let currentTasks = document.querySelectorAll('.item__description');
    let expected = currentTasks.length - 1;
    let testTask = currentTasks[1];
    testTask.value += ' /d';
    testTask.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
    let output = document.querySelectorAll('.item__description').length;

    isEqual(expected,output, 'deleted a test task');
})

test('the number of tasks displayed matches the number of task objects in storage', () => { 
    let itemsDisplayed = document.querySelectorAll('.item__description').length;
    taskCollection.getAllTasksFromStorage();
    let itemsSaved = taskCollection.allTasks.length;
    
    isEqual(itemsDisplayed, itemsSaved + 1, `${itemsDisplayed - 1} out of ${itemsSaved} tasks displayed`);
});