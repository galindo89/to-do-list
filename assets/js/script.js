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
        const taskText = modalTaskInput.value;
        const dueDate = mondalTaskDate.value;
        const status = modalTaskStatus.value;

        //Creating a new task element

        if (taskText !== '' && dueDate !== '') {

            const taskItem = createTaskItem(taskText, dueDate, status);

            addTaskToColumn(taskItem, status);

            //Close the modal and clear the input fields

            modal.style.display = 'none';
            modalTaskInput.value = '';
            mondalTaskDate.value = '';
            modalTaskStatus.value = 'backlog';



        }

        else {
            alert('Please enter a task and due date');
        }


    });


    //Creating a function that will add a task to the task list

    function createTaskItem(taskText, dueDate, status) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.textContent = taskText;
       

        return taskItem;
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

});
