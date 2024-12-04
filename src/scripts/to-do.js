document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('submit-btn').addEventListener('click', addTask);

function addTask() {
    const inputElement = document.getElementById('to-do-input');
    const input = inputElement.value;
    if (input.trim() !== '') {
        const targetList = document.getElementById('new-task'); // Always target the "New Task" list

        const li = createTaskItem(input);
        targetList.appendChild(li);
        saveTask('new-task', input);
        inputElement.value = ''; // Clear the input field
    }
}


function createTaskItem(input, targetList) {
    const li = document.createElement('li');
    li.draggable = true;
    li.ondragstart = drag;
    li.id = `task-${Date.now()}`; // Assign a unique ID to the list item

    // Create a check button
    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    checkBtn.className = 'check-btn';
    checkBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        document.getElementById('done-list').appendChild(li);
    });

    // Create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        li.parentNode.removeChild(li);
        removeTask(li.parentNode.id, li.textContent);
    });

    // Append the check button, text content, and delete button to the list item
    li.appendChild(checkBtn);
    li.appendChild(document.createTextNode(input));
    li.appendChild(deleteBtn);

    return li;
}
    const input = document.getElementById('to-do-input').value;
    if (input.trim() !== '') {
        const lists = [
            document.getElementById('new-task'),
            document.getElementById('in-progress'),
            document.getElementById('done-list')
        ];


        const li = createTaskItem(input, targetList);
        targetList.appendChild(li);
        document.getElementById('to-do-input').value = ''; // Clear the input field
    }

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const item = document.getElementById(data);
    if (event.target.tagName === 'UL') {
        event.target.appendChild(item);
        removeTask(item.parentNode.id, item.textContent);
        if (event.target.id === 'done-list') {
            item.classList.add('completed');
        }
    } else if (event.target.tagName === 'LI') {
        event.target.parentNode.appendChild(item);
        saveTask(event.target.parentNode.id, item.textContent);
        removeTask(item.parentNode.id, item.textContent);
        if (event.target.parentNode.id === 'done-list') {
            item.classList.add('completed');
    }
}
}


function saveTask(listId, task) {
    let tasks = JSON.parse(localStorage.getItem(listId)) || [];
    tasks.push(task);
    localStorage.setItem(listId, JSON.stringify(tasks));
}

function removeTask(listId, task) {
    let tasks = JSON.parse(localStorage.getItem(listId)) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem(listId, JSON.stringify(tasks));
}

function loadTasks() {
    const lists = ['new-task', 'in-progress', 'done-list'];
    lists.forEach(listId => {
        const tasks = JSON.parse(localStorage.getItem(listId)) || [];
        tasks.forEach(task => {
            const targetList = document.getElementById(listId);
            const li = createTaskItem(task);
            targetList.appendChild(li);
        });
    });
}