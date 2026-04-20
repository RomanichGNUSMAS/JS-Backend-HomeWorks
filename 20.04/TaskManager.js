const { EventEmitter } = require('node:events')

class TaskManager extends EventEmitter {
    #completedTasksCount = 0;
    constructor() {
        super();
    }

    addTask(eventName) {
        console.log(`adding new task with name ${eventName}!`);

        this.emit('taskAdded',eventName);
    }

    completeTask(eventName) {
        console.log(`trying to complete task with name ${eventName}`);

        this.emit('taskCompleted',eventName,++this.#completedTasksCount);
    }
}


const manager = new TaskManager();

manager.on('taskAdded', (name) => {
    console.log(`NEW: Task "${name}" is now pending.`);
});

manager.on('taskCompleted', (name, total) => {
    console.log(`DONE: Task "${name}" finished. Total completed: ${total}.`);

    if (total === 3) {
        console.log('--- Milestone Achieved: Three tasks finished! ---');
    }
});

manager.addTask('Setup Database');
manager.addTask('Write API Endpoint');
manager.addTask('Design UI Mockups');

manager.completeTask('Setup Database');
manager.completeTask('Write API Endpoint');
manager.completeTask('Design UI Mockups');

module.exports.TaskManger = TaskManager;
/* 
    const { TaskManager } = require('./TaskManager.js');
    const manager = new TaskManager();
    code...
*/