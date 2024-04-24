document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:8080/api/todo?userId=${userId}`)
    
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                        <span class="${task.completed ? 'completed' : ''}" onclick="editTask('${task.id}', this)">${task.task}</span>
                        <div class="task-buttons">
                        <input type="checkbox" class="task-checkbox" onchange="toggleComplete(this, '${task.id}', this.checked)" ${task.completed ? 'checked' : ''}>
                            <button onclick="deleteTask('${task.id}')"><span class="text">Delete</span></button>
                        </div>
                    
                `;
                taskList.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading tasks:', error));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const userId = localStorage.getItem('userId');
    //console.log(userId)
    const task = {
        task: taskInput.value,
        completed: false,
        userId:userId
    };

    fetch('http://localhost:8080/api/todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(response => response.json())
        .then(() => {
            loadTasks(); // Reload the task list after adding a task
            taskInput.value = '';
        })
        .catch(error => console.error('Error adding task:', error));
}

function toggleComplete(checkbox, taskId, isChecked) {
    const completed = isChecked;

    fetch(`http://localhost:8080/api/todo/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
    })
        .then(() => {
            loadTasks(); // Reload the task list after toggling completion
        })
        .catch(error => console.error('Error toggling task completion:', error));
}


function deleteTask(taskId) {
    fetch(`http://localhost:8080/api/todo/${taskId}`, {
        method: 'DELETE'
    })
        .then(() => {
            loadTasks();

        })
        .catch(error => console.error('Error deleting task:', error));
}
function editTask(taskId, spanElement) {
    const taskText = spanElement.textContent.trim();
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = taskText;

    spanElement.parentNode.replaceChild(inputElement, spanElement);

    inputElement.focus();
    inputElement.select();


    inputElement.addEventListener('blur', () => {
        saveEditedTask(taskId, inputElement.value);
    });
}



function saveEditedTask(taskId, newText) {
    fetch(`http://localhost:8080/api/todo/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: newText })
    })
        .then(() => {
            loadTasks();

        })
        .catch(error => console.error('Error saving edited task:', error));
}

function logout() {
    
    localStorage.removeItem('userId');
    window.location.href = '/login.html';
}

