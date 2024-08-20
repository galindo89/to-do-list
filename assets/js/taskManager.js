/**
 * Creates a new task item element.
 *
 * This function creates the necessary HTML elements for a task item, sets up
 * event listeners for editing and deleting the task, and returns the task item element.
 *
 * @param {string} taskText - The text of the task.
 * @param {string} dueDate - The due date of the task in YYYY-MM-DD format.
 * @param {string} status - The status of the task for example, 'backlog', 'in-progress'and 'done'.
 * @returns {HTMLElement} The task item element.
 */
function createTaskItem(taskText, dueDate, status) {
    const taskItem = document.createElement('li');
    const taskContent = document.createElement('div');
    taskContent.classList.add('task-content');

    const taskTextSpan = document.createElement('span');
    const taskTextInput = document.createElement('input');
    taskTextSpan.textContent = taskText;
    taskTextInput.type = 'text';
    taskTextInput.value = taskText;
    taskTextInput.style.display = 'none';

    const taskDueDateSpan = document.createElement('span');
    const taskDueDateInput = document.createElement('input');
    taskDueDateSpan.textContent = dueDate;
    taskDueDateInput.type = 'date';
    taskDueDateInput.value = dueDate;
    taskDueDateInput.style.display = 'none';

    const statusSpan = document.createElement('span');
    const statusSelect = document.createElement('select');
    statusSpan.textContent = status;
    const options = [
        { "option": "Backlog", "value": 'backlog' },
        { "option": "In Progress", "value": 'in-progress' },
        { "option": "Done", "value": 'done' }
    ];

    options.forEach(option => {
        const statusOption = document.createElement('option');
        statusOption.textContent = option.option;
        statusOption.value = option.value;
        statusSelect.appendChild(statusOption);
     });
    statusSelect.value = status;
    statusSelect.style.display = 'none';

    const deleteTask = document.createElement('div');
    deleteTask.classList.add('delete-task');
    const deleteTaskBtn = document.createElement('i');
    deleteTaskBtn.classList.add('fa-solid', 'fa-trash');

    const daysLeft = calculateDaysLeft(dueDate);
    changeTaskColor(taskItem, status, daysLeft);

    taskContent.appendChild(taskTextSpan);
    taskContent.appendChild(taskTextInput);
    taskContent.appendChild(taskDueDateSpan);
    taskContent.appendChild(taskDueDateInput);
    taskContent.appendChild(statusSpan);
    taskContent.appendChild(statusSelect);
    taskItem.appendChild(taskContent);
    deleteTask.appendChild(deleteTaskBtn);
    taskItem.appendChild(deleteTask);

    //Edit task description

    editeventListenersTasks(taskTextSpan, taskTextSpan, taskTextInput, 'click');
    createBlurEventListeners(taskTextSpan, taskTextInput, function() {
        saveTasksToLocalStorage();
    });

    //Edit task due date

    editeventListenersTasks(taskDueDateSpan, taskDueDateSpan, taskDueDateInput, 'click');
    createBlurEventListeners(taskDueDateSpan, taskDueDateInput, function() {
        changeTaskColor(taskItem, statusSelect.value, calculateDaysLeft(taskDueDateInput.value));
        saveTasksToLocalStorage();
    });

    //Edit task status

    editeventListenersTasks(statusSpan, statusSpan, statusSelect, 'click');
    editeventListenersTasks(statusSelect, statusSpan, statusSelect, 'change', function() {
        addTaskToColumn(taskItem, statusSelect.value, taskDueDateInput.value);
        status=statusSelect.value;
        statusSpan.textContent = statusSelect.value;
        statusSpan.style.display = 'inline-block';
        statusSelect.style.display = 'none';
        saveTasksToLocalStorage();
               
      
    });
    createBlurEventListeners(statusSpan, statusSelect, function() {
        status=statusSelect.value;
        saveTasksToLocalStorage();
    });

    //Delete task

    deleteTaskBtn.addEventListener('click', function() {
        taskItem.parentNode.removeChild(taskItem);
        saveTasksToLocalStorage();
    });

    return taskItem;
}

/**
 * Adds a task item to the appropriate column based on its status.
 *
 * @param {HTMLElement} taskItem - The task item element to be added.
 * @param {string} status - The status of the task for example, 'backlog', 'in-progress'and 'done'.
 * @param {string} dueDate - The due date of the task in YYYY-MM-DD format.
 */
function addTaskToColumn(taskItem, status, dueDate) {
    const daysLeft = calculateDaysLeft(dueDate);
    changeTaskColor(taskItem, status, daysLeft);

    if (status === 'backlog') {
        document.getElementById('todoList').appendChild(taskItem);
       
    } else if (status === 'in-progress') {
        document.getElementById('inProgressList').appendChild(taskItem);
       
    } else if (status === 'done') {
        document.getElementById('doneList').appendChild(taskItem);
        
    } else {
        alert('Error adding the task to the column');
    }
}
