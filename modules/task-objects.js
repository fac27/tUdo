export class Task {
  constructor(description = "", status = TaskStatus.Pending) {
    this.description = description;
    this.status = status;
    this.template = document.createElement("template");
    this.theTextField = null;
  }

  get textInputField() {
    const textField = this.template.content.querySelector(".item__description");
    return textField;
  }

  focusInput() {
    console.log(`Attempting to set focus of '${this.description}' task`);
    
    this.theTextField.focus();
  }

  getStatusText() {
    return Object.keys(TaskStatus).find(
      (key) => TaskStatus[key] === this.status
    );
  }
  getNode() {
    let checkBoxStatus = this.status === TaskStatus.Complete ? " checked" : "";
    let newItemTemplate = `
    <div class='item'>
        <input type='checkbox' class='item__completed'${checkBoxStatus}></input>
        <input type="text" class='item__description' placeholder='add item ...' value='${this.description}'></input>
    </div>
    `;

    this.template.innerHTML = newItemTemplate.trim();

    this.textInputField.addEventListener("keyup", (event) => {
      this.#updateItem(event, this.textInputField);
    });
    this.theTextField = this.textInputField;

    return this.template.content.firstElementChild;
  }

  #updateItem(keyPress, inputField) {
    console.log("In keypress event handler: " + inputField);
    
    if (keyPress.key === "Enter") {
      this.description = inputField.value;
      const done = inputField.parentElement.querySelector("input").checked;
      this.status = done ? TaskStatus.Complete : TaskStatus.InProgress;
    }
  }

  getTaskAsObject() {
    return {
      description: this.description,
      status: this.status,
    };
  }
}

// TaskStatus enumeration
export const TaskStatus = Object.freeze({
  Pending: 0,
  InProgress: 1,
  Complete: 2,
});

export class TaskCollection {
  constructor() {
    this.allTasks = [];
  }

  addTask(task) {
    this.allTasks.unshift(task);
    this.saveAllTasksToStorage();
  }

  deleteTask(index) {
    this.allTasks = this.allTasks.splice(index, 1);
    this.saveAllTasksToStorage();
  }

  getAllTasksFromStorage() {
    const taskListFromStorage = localStorage.getItem("task-list") || "[]";
    const taskListAsArray = JSON.parse(taskListFromStorage);
    this.allTasks = [];
    taskListAsArray.forEach((taskObjectFromStorage) => {
      this.allTasks.unshift(
        new Task(
          taskObjectFromStorage.description,
          taskObjectFromStorage.status
        )
      );
    });
  }

  saveAllTasksToStorage() {
    const allTasksArray = [];
    this.allTasks.forEach((task) => {
      allTasksArray.unshift(task.getTaskAsObject());
    });
    const allTasksAsJson = JSON.stringify(allTasksArray);
    localStorage.setItem("task-list", allTasksAsJson);
  }

  displayTasks(canvas) {
    canvas.innerHTML = "";
    this.allTasks.forEach((task, index) => {
      const node = task.getNode();
        if (index === 0 ) {
            task.textInputField.focus();
        }

      canvas.append(node);
    });
  }
}
