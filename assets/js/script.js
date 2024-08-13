console.log('Hello, world!');

//Creating an event listener that loads when the whole page is loaded

document.addEventListener('DOMContentLoaded', function() {
    console.log('The page is fully loaded');

    const createTaskBtn = document.getElementById('createTaskBtn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const modalTaskInput = document.getElementById('modalTaskInput');
    const mondalTaskDate = document.getElementById('modalTaskDate');
    const modalTaskStatus = document.getElementById('modalTaskStatus');


//Creating an event listener that listens for a click on the create task button. This will show the modal

createTaskBtn.addEventListener('click', function() {
    modal.style.display = 'block';
}

);


});