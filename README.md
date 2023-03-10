# tUdo
Mark and Alphonso's to-do list project

The page is designed to facilitate intuitive and fluent user interactions. 
- All input can be done via simple keyboard commands 
- A clean and minimalistic layout shifts focus to the information on the page

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

The snippet below is an example of a test that emulates user input onto the page and checks whether the expected result is returned.

```javascript
test('submitting text within the task prompt field will create a new task', () => {
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
```

### Inspiration
Our main inspiration for the styling and basic functionality of tUdo was Notion, a versatile work planner.

![screenshot of a list in Notion showcasing the inspiration for tUdo](/imgs/screenshot__tUdo-inspiration.png)
### Collaborating
You can clone the repository for tUdo with the following terminal command:
```terminal
git clone https://github.com/fac27/tUdo
```
