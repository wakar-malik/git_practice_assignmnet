const form = document.querySelector("form");
const task = document.querySelector("#task");
const priority = document.querySelector("#priority");
const tableBody = document.querySelector("table>tbody");

const todoData = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (task.value === "" || priority.value === "") {
    alert("Please enter proper details first!");
    return;
  }

  todoData.push({
    task: task.value,
    priority: priority.value,
    favorite: "",
  });

  task.value = priority.value = "";

  renderRow(todoData);
});

function renderRow(todoData) {
  tableBody.innerHTML = "";
  todoData.forEach((element) => {
    const tr = document.createElement("tr");

    const taskTd = document.createElement("td");
    const priorityTd = document.createElement("td");
    const favoriteTd = document.createElement("td");

    taskTd.innerText = element.task;
    priorityTd.innerHTML = `<p class="highlightText" style="background-color:${
      element.priority === "High" ? "red" : "green"
    }">${element.priority}</p>`;
    favoriteTd.innerText = element.favorite;

    tr.appendChild(taskTd);
    tr.appendChild(priorityTd);

    tableBody.appendChild(tr);
  });
}
