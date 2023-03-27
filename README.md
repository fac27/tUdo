# tUdo
Mark and Alphonso's to-do list project

The page is designed to facilitate intuitive and fluent user interactions. 
- All input can be done via simple keyboard commands 
- A clean and minimalistic layout shifts focus to the information on the page

## Deployed page
tUdo is hosted through GitHub Pages and can be accessed through this [link](https://fac27.github.io/tUdo/)

## The aim of this project
tUdo is a personalised tasklist tracker. Tasks added are stored locally and progress can be tracked easily.

For this project we were asked to build a functional to-do list that could meet the following user stories:
- **As a busy person, I want to:**
  - add tasks to a list so that I can keep track of them,
  - check things off my list so that I can see what I've done,
  - delete things from the list if I don't need to do them anymore
  - filter out complete to-dos from my list so that I can focus on what's left to do
- **As a motor-impaired user, I want to:**
  - use all the features of the app without a mouse

### Testing
A testing library was developed alongside the tUdo page as part of this project to verify that each user story is met.

In order to allow for an overview of the user experience in the DOM, our tests will run on startup with a delay in relation to each other, replicating the user journey through various functionalities of the page.

```javascript
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
};
```

### Inspiration
Our main inspiration for the styling and basic functionality of tUdo was Notion, a versatile work planner.

![screenshot of a list in Notion showcasing the inspiration for tUdo](/imgs/screenshot__tUdo-inspiration.png)
### Collaborating
You can clone the repository for tUdo with the following terminal command:
```terminal
git clone https://github.com/fac27/tUdo
```
