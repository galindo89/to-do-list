//Creating an event listener that loads when the whole page is loaded

document.addEventListener('DOMContentLoaded',initializeApp) 

    const createTaskBtn = document.getElementById('createTaskBtn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const modalTaskInput = document.getElementById('modalTaskInput');
    const mondalTaskDate = document.getElementById('modalTaskDate');
    const modalTaskStatus = document.getElementById('modalTaskStatus');
    
    
    function initializeApp  () {
    console.log('The page is fully loaded');
 
     
    //Loading tasks from local storage
 
    loadTasks();
 
 
    //Creating an event listener that listens for a click on the create task button. This will show the modal
 
    createTaskBtn.addEventListener('click', function () {
       modal.style.display = 'block';
    });
 
 
    closeModal.addEventListener('click', function () {
       modal.style.display = 'none';
 
 
    });
 
    //close modal when the user clicks outside of it
    window.addEventListener('click', function (event) {
       if (event.target === modal) {
          modal.style.display = 'none';
       }
    });
 
    //Creating an event listener that listens for a click on the add task button. This will add a task to the task list
 
    addTaskBtn.addEventListener('click', function () {
       const taskText = modalTaskInput.value.trim();
       const dueDate = mondalTaskDate.value;
       const status = modalTaskStatus.value;
 
       //Creating a new task element
 
       if (taskText !== '' && dueDate !== '') {
 
          const taskItem = createTaskItem(taskText, dueDate, status);
 
          addTaskToColumn(taskItem, status, dueDate);
          saveTasksToLocalStorage();
 
 
          //Close the modal and clear the input fields
 
          modal.style.display = 'none';
          modalTaskInput.value = '';
          mondalTaskDate.value = '';
          modalTaskStatus.value = 'backlog';
 
 
       }
 
       //Need to improve this alert message
       else {
          alert('Please enter a task and due date');
       }
 
 
    });

};
 
 
    //Creating a function that will add a task to the task list
 
    function createTaskItem(taskText, dueDate, status) {
 
       const taskItem = document.createElement('li');
       const taskContent = document.createElement('div');
       taskContent.classList.add('task-content');
 
       //text input for the task
       const taskTextSpan = document.createElement('span');
       const taskTextInput = document.createElement('input');
       taskTextSpan.textContent = taskText;
       taskTextInput.type = 'text';
       taskTextInput.value = taskText;
       taskTextInput.style.display = 'none';
       //due date for the task
       const taskDueDateSpan = document.createElement('span');
       const taskDueDateInput = document.createElement('input');
       taskDueDateSpan.textContent = dueDate;
       taskDueDateInput.type = 'date';
       taskDueDateInput.value = dueDate;
       taskDueDateInput.style.display = 'none';
       //status of the task
       const statusSpan = document.createElement('span');
       const statusSelect = document.createElement('select');
       statusSpan.textContent = status;
       const options = [{
             "option": "Backlog",
             "value": 'backlog'
          },
          {
             "option": "In Progress",
             "value": 'in-progress'
          },
          {
             "option": "Done",
             "value": 'done'
          }
       ];
 
       options.forEach(option => {
          const statusOption = document.createElement('option');
          statusOption.textContent = option.option;
          statusOption.value = option.value;
          statusSelect.appendChild(statusOption);
       });
       statusSelect.value = status;
       statusSelect.style.display = 'none';
 
       //delete task button 
       const deleteTask = document.createElement('div');
       deleteTask.classList.add('delete-task');
       const deleteTaskBtn = document.createElement('i');
       deleteTaskBtn.classList.add('fa-solid', 'fa-trash');
 
       //Calculating the number of days left to complete the task
 
       const daysLeft = calculateDaysLeft(dueDate);
 
       changeTaskColor(taskItem, status, daysLeft);
 
       //Appending the elements to their corresponding parent elements     
 
       taskContent.appendChild(taskTextSpan);
       taskContent.appendChild(taskTextInput);
       taskContent.appendChild(taskDueDateSpan);
       taskContent.appendChild(taskDueDateInput);
       taskContent.appendChild(statusSpan);
       taskContent.appendChild(statusSelect);
       taskItem.appendChild(taskContent);
       deleteTask.appendChild(deleteTaskBtn);
       taskItem.appendChild(deleteTask);
 
 
       //Edit the task text
 
 
       editeventListenersTasks(taskTextSpan, taskTextSpan, taskTextInput, 'click');
 
 
       createBlurEventListeners(taskTextSpan, taskTextInput, function () {
 
 
          saveTasksToLocalStorage();
       })
 
       // edit the due date
 
 
       editeventListenersTasks(taskDueDateSpan, taskDueDateSpan, taskDueDateInput, 'click');
 
 
       createBlurEventListeners(taskDueDateSpan, taskDueDateInput, function () {
 
          changeTaskColor(taskItem, status, calculateDaysLeft(taskDueDateInput.value));
          saveTasksToLocalStorage();
 
 
       })
 
       // edit status
 
 
       editeventListenersTasks(statusSpan, statusSpan, statusSelect, 'click');
 
       editeventListenersTasks(statusSelect, statusSpan, statusSelect, 'change', function () {
          addTaskToColumn(taskItem, statusSelect.value, taskDueDateInput.value);
          saveTasksToLocalStorage();
 
 
       });
 
 
       createBlurEventListeners(statusSpan, statusSelect, function () {
          addTaskToColumn(taskItem, statusSelect.value, taskDueDateInput.value);
          saveTasksToLocalStorage();
 
 
       });
 
       //Event listener to delete the task
 
       deleteTaskBtn.addEventListener('click', function () {
 
 
          taskItem.parentNode.removeChild(taskItem);
          saveTasksToLocalStorage();
       });
 
 
       return taskItem;
    }
 
 
    //function to load tasks from local storage
    function loadTasks() {
       const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
       tasks.forEach(task => {
          const taskItem = createTaskItem(task.text, task.dueDate, task.status);
          addTaskToColumn(taskItem, task.status, task.dueDate);
       });
    }
 
 
    // Function to save tasks to local storage
    function saveTasksToLocalStorage() {
       const tasks = [];
       document.querySelectorAll('.column ul li').forEach(taskItem => {
          const taskContent = taskItem.querySelector('.task-content');
 
          const text = taskContent.querySelector('input[type="text"]').value.trim();
          const dueDate = taskContent.querySelector('input[type="date"]').value;
          const status = taskContent.querySelector('select').value;
 
          tasks.push({
             text,
             dueDate,
             status
          });
       });
       localStorage.setItem('tasks', JSON.stringify(tasks));
    }
 
 
    //Creating a function that will add a task to the correct column
 
 
    function addTaskToColumn(taskItem, status, duedate) {
       if (status === 'backlog') {
          document.getElementById('todoList').appendChild(taskItem);
          changeTaskColor(taskItem, status, calculateDaysLeft(duedate));
       } else if (status === 'in-progress') {
          document.getElementById('inProgressList').appendChild(taskItem);
          changeTaskColor(taskItem, status, calculateDaysLeft(duedate));
       } else if (status === 'done') {
          document.getElementById('doneList').appendChild(taskItem);
          changeTaskColor(taskItem, status, calculateDaysLeft(duedate));
       } else {
          console.error('There has been an error adding the task to the column');
       }
 
 
    }
 
    //function to calculate the number of days left to complete a task
 
    function calculateDaysLeft(dueDate) {
       const currentDate = new Date();
       const dueDateArray = dueDate.split('-');
       const dueDateObj = new Date(dueDateArray[0], dueDateArray[1] - 1, dueDateArray[2]);
       const timeDifference = dueDateObj.getTime() - currentDate.getTime();
       const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
       return daysLeft;
    }
 
    //function to change the background color of the task based on the number of days left to complete the task
 
    function changeTaskColor(taskItem, status, daysLeft) {
 
       if (daysLeft <= 2 && (status === 'backlog' || status === 'in-progress')) {
          taskItem.style.background = 'lightcoral';
       } else if (daysLeft > 2 && daysLeft < 7 && (status === 'backlog' || status === 'in-progress')) {
          taskItem.style.background = 'lightsalmon';
       } else if (daysLeft >= 7 && (status === 'backlog' || status === 'in-progress')) {
          taskItem.style.background = 'lightgreen';
       } else if (status === 'done') {
          taskItem.style.background = 'lightgrey';
       } else {
          console.error('There has been an error changing the task color');
       }
 
    }
 
    //function to manage event listeners
 
    function editeventListenersTasks(triggerElement, htmlElementSpan, htmlElementInput, event, callback) {
 
       triggerElement.addEventListener(event, function () {
 
          htmlElementSpan.style.display = 'none';
          htmlElementInput.style.display = 'inline-block';
          htmlElementInput.focus();
          if (callback) {
             callback()
          }
 
       })
    }
 
    function createBlurEventListeners(htmlElementSpan, htmlElementInput, callback) {
 
       htmlElementInput.addEventListener('blur', function () {
 
          htmlElementSpan.textContent = htmlElementInput.value;
          htmlElementSpan.style.display = 'inline-block';
          htmlElementInput.style.display = 'none'
 
 
          if (callback) {
 
             callback();
          }
 
 
       });
 
 
    }
 
 
 