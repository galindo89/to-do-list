/**
 * Loads tasks from local storage and adds them to the appropriate columns.
 */
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = createTaskItem(task.text, task.dueDate, task.status);
        addTaskToColumn(taskItem, task.status, task.dueDate);
    });
}

/**
 * Saves all tasks to local storage.
 */
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.column ul li').forEach(taskItem => {
        const taskContent = taskItem.querySelector('.task-content');
        const text = taskContent.querySelector('input[type="text"]').value.trim();
        const dueDate = taskContent.querySelector('input[type="date"]').value;
        const status = taskContent.querySelector('select').value;
        tasks.push({ text, dueDate, status });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
