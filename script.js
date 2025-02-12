document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    let li = document.createElement("li");
    li.innerHTML = `${taskText} <button class="delete-btn" onclick="removeTask(this)">X</button>`;
    li.addEventListener("click", () => li.classList.toggle("completed"));

    document.getElementById("taskList").appendChild(li);
    saveTasks();
    
    taskInput.value = "";
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.textContent.replace("X", "").trim(), completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `${task.text} <button class="delete-btn" onclick="removeTask(this)">X</button>`;
        if (task.completed) li.classList.add("completed");
        li.addEventListener("click", () => li.classList.toggle("completed"));
        document.getElementById("taskList").appendChild(li);
    });
}
