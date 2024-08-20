/**
 * Calculates the number of days left until the tasks due date.
 * 
 * @param {string} dueDate - The due date of the task in YYYY-MM-DD format.
 * @returns {number} The number of days left until the due date.
 */
function calculateDaysLeft(dueDate) {
    const currentDate = new Date();
    const dueDateArray = dueDate.split('-');
    const dueDateObj = new Date(dueDateArray[0], dueDateArray[1] - 1, dueDateArray[2]);
    const timeDifference = dueDateObj.getTime() - currentDate.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

/**
 * Changes the background color of the task item based on its status and days left until due considering the status.
 *
 * @param {HTMLElement} taskItem - The task item element.
 * @param {string} status - The status of the task for example, 'backlog', 'in-progress'and 'done'.
 * @param {number} daysLeft - The number of days left until the task's due date.
 */
function changeTaskColor(taskItem, status, daysLeft) {

    // Immediately set to lightgrey and exit if the status is 'done'

    if (status === 'done') {                
        taskItem.style.background = 'lightgrey';
        return;
    }    
    if (daysLeft <= 2 && (status === 'backlog' || status === 'in-progress')) {
        taskItem.style.background = 'lightcoral';
    } 
    else if (daysLeft > 2 && daysLeft < 7 && (status === 'backlog' || status === 'in-progress')) {
        taskItem.style.background = 'lightsalmon';
    } 
    else if (daysLeft >= 7 && (status === 'backlog' || status === 'in-progress')) {
        taskItem.style.background = 'lightgreen';    
    } 
    else {
        console.error('Error changing the task color');
    }
}

/**
 * Adds an event listener to handle the editing of task properties (task description, date and status) depending on the event type.
 *
 * @param {HTMLElement} triggerElement - The element that triggers the event.
 * @param {HTMLElement} htmlElementSpan - The span element to hide.
 * @param {HTMLElement} htmlElementInput - The input element to show.
 * @param {string} event - The event type to listen for example, 'click'or 'change'.
 * @param {Function} [callback] - Optional callback function to execute after the event.
 */
function editeventListenersTasks(triggerElement, htmlElementSpan, htmlElementInput, event, callback) {
    triggerElement.addEventListener(event, () => {
        htmlElementSpan.style.display = 'none';
        htmlElementInput.style.display = 'inline-block';
        htmlElementInput.focus();
        if (callback) {
            callback();}
    });
}

/**
 * Creates an event listener for when the focus is no more on the input element (blur event).
 *
 * @param {HTMLElement} htmlElementSpan - The span element to show.
 * @param {HTMLElement} htmlElementInput - The input element to hide.
 * @param {Function} callback - The function to call after the blur event.
 */
function createBlurEventListeners(htmlElementSpan, htmlElementInput, callback) {
    htmlElementInput.addEventListener('blur', () => {
        htmlElementSpan.textContent = htmlElementInput.value;
        htmlElementSpan.style.display = 'inline-block';
        htmlElementInput.style.display = 'none';
        if (callback) {
            callback();}
    });
}
