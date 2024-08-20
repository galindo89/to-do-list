
/**
 * Initializes the application by setting up event listeners, loading tasks from local storage,
 * and handling modal interactions for task creation.
 */


function initializeApp() {
    
    console.log('The page is fully loaded');

    // Load tasks from local storage
    loadTasks();

   
    const createTaskBtn = document.getElementById('createTaskBtn');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const modalTaskInput = document.getElementById('modalTaskInput');
    const mondalTaskDate = document.getElementById('modalTaskDate');
    const modalTaskStatus = document.getElementById('modalTaskStatus');

    
    // Event listeners for the modal and task creation

    createTaskBtn.addEventListener('click', () => modal.style.display = 'block');
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    
    window.addEventListener('click', event => {
        if (event.target === modal) modal.style.display = 'none';
    });

    addTaskBtn.addEventListener('click', () => {
        const taskText = modalTaskInput.value.trim();
        const dueDate = mondalTaskDate.value;
        const status = modalTaskStatus.value;

        if (taskText !== '' && dueDate !== '') {
            const taskItem = createTaskItem(taskText, dueDate, status);
            addTaskToColumn(taskItem, status, dueDate);
            saveTasksToLocalStorage();

            modal.style.display = 'none';
            modalTaskInput.value = '';
            mondalTaskDate.value = '';
            modalTaskStatus.value = 'backlog';
        } else {
            alert('Please enter a task and due date');
        }
    });
}
