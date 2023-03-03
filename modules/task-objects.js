export class Task {
    constructor(description, status = TaskStatus.Pending) {
        this.description = description;
        this.status = status;
    }

    static newItemTemplate = `
    <div class='item'>
        <input type='checkbox' class='item__completed'</input>
        <input type="text" class='item__description' placeholder='add item ...'></input>
    </div>
    `;

    getStatusText() {
        return Object.keys(TaskStatus).find((key) => TaskStatus[key] === this.status);
    }
    getNode() {
        let template = document.createElement('template');
        template.innerHTML = this.newItemTemplate.trim();
        return template.content.firstElementChild;
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
        this.allTasks.push(task);
        this.saveAllTasksToStorage();
    }

    deleteTask(index) {
        this.allTasks = this.allTasks.splice(index,1);
    }

    getAllTasksFromStorage() {
        const taskListFromStorage = localStorage.getItem('task-list') || '[]';
        const taskListAsArray = JSON.parse(taskListFromStorage);
        this.allTasks = [];
        taskListAsArray.forEach((taskObjectFromStorage) => {
            this.allTasks.push (new Task(
                taskObjectFromStorage.description,
                taskObjectFromStorage.status
            ));
        });
    }

    saveAllTasksToStorage() {
        const allTasksArray = [];
        this.allTasks.forEach ((task) => {
            allTasksArray.push(task.getTaskAsObject());
        });
        const allTasksAsJson = JSON.stringify(allTasksArray);
        localStorage.setItem('task-list', allTasksAsJson);
    }

    displayTasks(canvas) {
        ;
    }
}