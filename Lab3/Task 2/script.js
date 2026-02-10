document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    // const totalTasksSpan = document.getElementById('total-tasks');
    // const completedTasksSpan = document.getElementById('completed-tasks');

    // Load tasks from localStorage if available
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to update task counters
    function updateCounters() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;

        // totalTasksSpan.textContent = `Total: ${totalTasks} task${totalTasks !== 1 ? 's' : ''}`;
        // completedTasksSpan.textContent = `Completed: ${completedTasks} task${completedTasks !== 1 ? 's' : ''}`;
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateCounters();
    }

    // Function to render tasks
    function renderTasks() {
        todoList.innerHTML = '';

        if (tasks.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.textContent = 'No tasks yet. Add a new task to get started!';
            todoList.appendChild(emptyState);
            updateCounters();
            return;
        }

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            if (task.completed) {
                li.classList.add('completed');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'todo-checkbox';
            checkbox.checked = task.completed;

            const span = document.createElement('span');
            span.className = 'todo-text';
            span.textContent = task.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.title = 'Delete task';

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);

            // Add event listener for checkbox
            checkbox.addEventListener('change', function () {
                tasks[index].completed = this.checked;
                li.classList.toggle('completed', this.checked);
                saveTasks();
            });

            // Add event listener for delete button
            deleteBtn.addEventListener('click', function () {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
        });

        updateCounters();
    }

    // Add new task
    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;

        tasks.push({
            text: text,
            completed: false
        });

        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
    }

    // Event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial render
    renderTasks();
});