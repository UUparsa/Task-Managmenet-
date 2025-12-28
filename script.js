const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = [];

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const task = {
    id: Date.now(),
    title,
    description,
    status: "To Do"
  };

  tasks.push(task);
  renderTasks();
  taskForm.reset();
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>

      <div class="task-actions">
        <select onchange="changeStatus(${task.id}, this.value)">
          <option ${task.status === "To Do" ? "selected" : ""}>To Do</option>
          <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
          <option ${task.status === "Done" ? "selected" : ""}>Done</option>
        </select>

        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskList.appendChild(taskDiv);
  });
}

function changeStatus(id, newStatus) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, status: newStatus } : task
  );
}

function deleteTask(id) {
  const confirmed = confirm("Are you sure you want to delete this task?");
  if (confirmed) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
  }
}

