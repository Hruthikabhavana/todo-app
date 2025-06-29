let taskList = [];

window.onload = function () {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    taskList = JSON.parse(savedTasks);
    taskList.forEach((task, index) => renderTask(task, index));
  }
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const now = new Date();
  const formattedTime = now.toLocaleString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const task = {
    text: taskText,
    time: formattedTime,
    completed: false
  };

  taskList.push(task);
  saveTasks();
  renderTask(task, taskList.length - 1);
  input.value = "";
}

function renderTask(task, index) {
  const li = document.createElement("li");

  li.innerHTML = `
    <strong>${task.text}</strong><br>
    <small>🕒 ${task.time}</small>
    <span class="delete-btn" onclick="deleteTask(${index})">🗑️</span>
  `;

  if (task.completed) li.classList.add("completed");

  li.addEventListener("click", function (e) {
    if (e.target.tagName !== "SPAN") {
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    }
  });

  document.getElementById("taskList").appendChild(li);
}

function deleteTask(index) {
  taskList.splice(index, 1);
  saveTasks();
  refreshTasks();
}

function refreshTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";
  taskList.forEach((task, index) => renderTask(task, index));
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}
// 🌗 Theme Toggle Logic
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save theme preference
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});
