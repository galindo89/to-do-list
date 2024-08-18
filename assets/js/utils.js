function calculateDaysLeft(dueDate) {
    const currentDate = new Date();
    const dueDateArray = dueDate.split('-');
    const dueDateObj = new Date(dueDateArray[0], dueDateArray[1] - 1, dueDateArray[2]);
    const timeDifference = dueDateObj.getTime() - currentDate.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

function changeTaskColor(taskItem, status, daysLeft) {

    // Immediately set to lightgrey and exit if the status is 'done'

    if (status === 'done') {
        
        taskItem.style.background = 'lightgrey';
        return;
    }


    if (daysLeft <= 2 && (status === 'backlog' || status === 'in-progress')) {
        taskItem.style.background = 'lightcoral';
    } else if (daysLeft > 2 && daysLeft < 7 && (status === 'backlog' || status === 'in-progress')) {
        taskItem.style.background = 'lightsalmon';
    } else if (daysLeft >= 7 && (status === 'backlog' || status === 'in-progress')) {
        taskItem.style.background = 'lightgreen';
    
    } else {
        console.error('Error changing the task color');
    }
}

function editeventListenersTasks(triggerElement, htmlElementSpan, htmlElementInput, event, callback) {
    triggerElement.addEventListener(event, () => {
        htmlElementSpan.style.display = 'none';
        htmlElementInput.style.display = 'inline-block';
        htmlElementInput.focus();
        if (callback) {
            callback();}
    });
}

function createBlurEventListeners(htmlElementSpan, htmlElementInput, callback) {
    htmlElementInput.addEventListener('blur', () => {
        htmlElementSpan.textContent = htmlElementInput.value;
        htmlElementSpan.style.display = 'inline-block';
        htmlElementInput.style.display = 'none';
        if (callback) {
            callback();}
    });
}
