// todo-script.js

// Function to load tasks from local storage
function loadTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Function to save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a task
function addTask(task) {
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
}

// Function to delete a task
function deleteTask(taskToDelete) {
    let tasks = loadTasks();
    tasks = tasks.filter(task => task !== taskToDelete);
    saveTasks(tasks);
}

// Example usage
addTask('Buy groceries');
addTask('Finish the report');
console.log(loadTasks()); // Display all tasks

deleteTask('Buy groceries');
console.log(loadTasks()); // Display tasks after deletion
