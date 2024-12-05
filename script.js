const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    alert("Please enter a task!");
    return;
  }
  const taskCard = createTaskCard(taskText);
  pendingList.appendChild(taskCard);
  taskInput.value = "";
});

function createTaskCard(text, completed = false) {
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");
  if (completed) taskCard.classList.add("completed");

  const taskText = document.createElement("span");
  taskText.textContent = text;

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = completed ? "Undo" : "Complete";
  completeBtn.classList.add("complete");
  completeBtn.addEventListener("click", () => toggleComplete(taskCard, completeBtn));

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit");
  editBtn.addEventListener("click", () => editTask(taskText));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click", () => taskCard.remove());

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  taskCard.appendChild(taskText);
  taskCard.appendChild(actions);

  return taskCard;
}

function toggleComplete(taskCard, button) {
  const isCompleted = taskCard.classList.toggle("completed");
  button.textContent = isCompleted ? "Undo" : "Complete";
  if (isCompleted) {
    completedList.appendChild(taskCard);
  } else {
    pendingList.appendChild(taskCard);
  }
}

function editTask(taskText) {
  const newText = prompt("Edit your task:", taskText.textContent);
  if (newText !== null && newText.trim() !== "") {
    taskText.textContent = newText.trim();
  }
}
