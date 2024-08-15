console.log('Hello, world!');

//Creating an event listener that loads when the whole page is loaded

document.addEventListener('DOMContentLoaded', function () {
    console.log('The page is fully loaded');

    const createTaskBtn = document.getElementById('createTaskBtn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const modalTaskInput = document.getElementById('modalTaskInput');
    const mondalTaskDate = document.getElementById('modalTaskDate');
    const modalTaskStatus = document.getElementById('modalTaskStatus');

    //Loading tasks from local storage

    loadTasks();    


    //Creating an event listener that listens for a click on the create task button. This will show the modal

    createTaskBtn.addEventListener('click', function () {
        modal.style.display = 'block';
    }
    );


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

            addTaskToColumn(taskItem, status);
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


    //Creating a function that will add a task to the task list

    function createTaskItem(taskText, dueDate, status) {
        const taskItem = document.createElement('li');
        const taskContent = document.createElement('div');
        taskContent.classList.add('task-content');
        const taskTextSpan = document.createElement('span');
        const taskDueDateSpan = document.createElement('span');
        const statusSpan = document.createElement('span');
        const deleteTask = document.createElement('div');
        deleteTask.classList.add('delete-task');
        const deleteTaskBtn = document.createElement('i');
        deleteTaskBtn.classList.add('fa-solid', 'fa-trash');

        //Calculating the number of days left to complete the task

        const daysLeft= calculateDaysLeft(dueDate);

        changeTaskColor(taskItem, status, daysLeft);

        //Changing the background color of the task based on the number of days left to complete the task

      
        taskTextSpan.textContent = taskText;
        taskDueDateSpan.textContent = dueDate;
        statusSpan.textContent = status;
        taskContent.appendChild(taskTextSpan);
        taskContent.appendChild(taskDueDateSpan);
        taskContent.appendChild(statusSpan);
        taskItem.appendChild(taskContent);
        deleteTask.appendChild(deleteTaskBtn);
        taskItem.appendChild(deleteTask);

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
            addTaskToColumn(taskItem, task.status);
        });
    }
  

     
     // Function to save tasks to local storage
     function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll('.column ul li').forEach(taskItem => {
            const taskContent = taskItem.querySelector('.task-content');
            const text = taskContent.querySelector('span:nth-child(1)').textContent.trim();
            const dueDate = taskContent.querySelector('span:nth-child(2)').textContent;
            const status = taskContent.querySelector('span:nth-child(3)').textContent;
            tasks.push({ text, dueDate, status });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


   

    //Creating a function that will add a task to the correct column


    function addTaskToColumn(taskItem, status) {
        if (status === 'backlog') {
            document.getElementById('todoList').appendChild(taskItem);
        }
        else if (status === 'in-progress') {
            document.getElementById('inProgressList').appendChild(taskItem);
        }
        else if (status === 'done') {
            document.getElementById('doneList').appendChild(taskItem);
        }

        else {
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

        if (daysLeft <=2 && (status === 'backlog' || status === 'in-progress')) {
            taskItem.style.background = 'lightcoral';
        }
        else if (daysLeft >2 && daysLeft <7 && (status === 'backlog' || status === 'in-progress')) {
            taskItem.style.background = 'lightsalmon';
        }
        else if (daysLeft >=7 && (status === 'backlog' || status === 'in-progress')) {
            taskItem.style.background = 'lightgreen';
        }

    }

    

       

});


