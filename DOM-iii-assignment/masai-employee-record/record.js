// fill in javascript code here

const form = document.querySelector(".employee-form");
const name = document.querySelector("#name");
const id = document.querySelector("#employeeID");
const department = document.querySelector("#department");
const exp = document.querySelector("#exp");
const email = document.querySelector("#email");
const mobile = document.querySelector("#mbl");
const filterForm = document.querySelector(".filter-form");
const filterSelect = document.querySelector("#filter");
const tableBody = document.querySelector("table>tbody");

let employeeData = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let role;

  if (name.value.trim() === "") {
    alert("Please provide proper name!");
    return;
  }

  if (id.value.trim() === "" || +id.value <= 0) {
    alert("Id should be greater than 0!");
    return;
  }

  if (department.value === "") {
    alert("Please select a department!");
    return;
  }

  if (exp.value.trim() === "" || +exp.value < 0) {
    alert("Experience should be greater than or equal to 0!");
    return;
  }

  if (email.value.trim() === "" || !email.value.trim().includes("@gmail.com")) {
    alert("Enter proper email address!");
    return;
  }

  if (mobile.value.trim() === "" || mobile.value.trim().length < 10) {
    alert("Please enter 10 digits mobile number!");
    return;
  }

  if (+exp.value <= 1) {
    role = "Fresher";
  } else if (+exp.value >= 2 && +exp.value <= 5) {
    role = "Junior";
  } else {
    role = "Senior";
  }

  employeeData.push({
    name: name.value,
    id: id.value,
    department: department.value,
    exp: exp.value,
    email: email.value,
    mobile: mobile.value,
    role,
  });

  name.value =
    id.value =
    department.value =
    exp.value =
    email.value =
    mobile.value =
      "";

  renderRow(employeeData);
});

function renderRow(employeeData) {
  tableBody.innerHTML = "";
  employeeData.forEach((ele) => {
    const tr = document.createElement("tr");

    const name = document.createElement("td");
    const id = document.createElement("td");
    const department = document.createElement("td");
    const exp = document.createElement("td");
    const email = document.createElement("td");
    const mobile = document.createElement("td");
    const role = document.createElement("td");
    const deleteCol = document.createElement("td");

    name.innerText = ele.name;
    id.innerText = ele.id;
    department.innerText = ele.department;
    exp.innerText = ele.exp;
    email.innerText = ele.email;
    mobile.innerText = ele.mobile;
    role.innerText = ele.role;
    deleteCol.innerHTML = `<button class="deleteBtn" data-name="${ele.name}">Delete</button>`;

    tr.appendChild(name);
    tr.appendChild(id);
    tr.appendChild(department);
    tr.appendChild(exp);
    tr.appendChild(email);
    tr.appendChild(mobile);
    tr.appendChild(role);
    tr.appendChild(deleteCol);

    tableBody.appendChild(tr);
  });
}

tableBody.addEventListener("click", function deleteRow(e) {
  const target = e.target.closest(".deleteBtn");
  if (!target) return;

  employeeData = employeeData.filter(
    (ele) => ele.name !== e.target.dataset.name
  );

  renderRow(employeeData);
});

// filter function
filterForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let filteredEmployee;

  if (filterSelect.value === "") {
    renderRow(employeeData);
  } else if (filterSelect.value === "Frontend") {
    filteredEmployee = employeeData.filter(
      (ele) => ele.department === "Frontend"
    );
    renderRow(filteredEmployee);
  } else if (filterSelect.value === "Backend") {
    filteredEmployee = employeeData.filter(
      (ele) => ele.department === "Backend"
    );
    renderRow(filteredEmployee);
  } else if (filterSelect.value === "Operations") {
    filteredEmployee = employeeData.filter(
      (ele) => ele.department === "Operations"
    );
    renderRow(filteredEmployee);
  } else if (filterSelect.value === "HR") {
    filteredEmployee = employeeData.filter((ele) => ele.department === "HR");
    renderRow(filteredEmployee);
  } else if (filterSelect.value === "IA") {
    filteredEmployee = employeeData.filter((ele) => ele.department === "IA");
    renderRow(filteredEmployee);
  }
});
