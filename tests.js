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
///////////////////////////////////////////
// test(`typing a new task adds it to the stored list`, () => {
//     let expected = taskCollection.allTasks.length + 1;
    
//     let inputElements = document.querySelectorAll('.item__description');
//     inputElements[0].value = 'test task';
//     inputElements[0].dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));

//     taskCollection.getAllTasksFromStorage();
//     let output = taskCollection.allTasks.length;

//     taskCollection.deleteTask(-1);
    
//     isEqual(expected, output);
// });

test('the number of tasks displayed matches the number of task objects in storage', () => { 
    let itemsDisplayed = document.querySelectorAll('.item__description').length;
    taskCollection.getAllTasksFromStorage();
    let itemsSaved = taskCollection.allTasks.length;
    
    isEqual(itemsDisplayed, itemsSaved + 1, `${itemsDisplayed - 1} are being shown and ${itemsSaved} are stored`);
});