export class Task {
    constructor(description, status = TaskStatus.Pending) {
        this.description = description;
        this.status = status;
    }
    getStatusText() {
        return Object.keys(TaskStatus).find((key) => TaskStatus[key] === this.status);
    }
    getNode() {
        
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

    addTask() {
        ;
    }

    deleteTask(index) {
        ;
    }

    getAllTasksFromStorage() {
        ;
    }

    syncAllTasksToStorage() {
        ;
    }
}