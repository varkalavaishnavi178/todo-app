let tasks = [];

// Load tasks when page opens
window.onload = function () {
    let saved = localStorage.getItem("tasks");

    if (saved) {
        tasks = JSON.parse(saved);
        displayTasks();
    }
};

// Add task
function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);
    input.value = "";

    saveTasks();
    displayTasks();
}

// Display tasks
function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        // Toggle complete
        li.onclick = function () {
            toggleTask(index);
        };

        // Delete button
        let btn = document.createElement("button");
        btn.textContent = "X";

        btn.onclick = function (e) {
            e.stopPropagation(); // prevent toggle
            deleteTask(index);
        };

        li.appendChild(btn);
        list.appendChild(li);
    });
}

// Toggle completed
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// Clear all
function clearAll() {
    tasks = [];
    saveTasks();
    displayTasks();
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}