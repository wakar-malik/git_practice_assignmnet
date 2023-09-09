// fill in javascript code here

// fill in javascript code here

const form = document.querySelector("form");
const name = document.querySelector("#name");
const docId = document.querySelector("#docID");
const department = document.querySelector("#dept");
const exp = document.querySelector("#exp");
const email = document.querySelector("#email");
const mobile = document.querySelector("#mbl");
const tableBody = document.querySelector("table>tbody");

let doctorData = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let role;

  if (name.value.trim() === "") {
    alert("Please provide proper name!");
    return;
  }

  if (docId.value.trim() === "" || +docId.value <= 0) {
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
    role = "Trainee";
  } else if (+exp.value >= 2 && +exp.value <= 5) {
    role = "Junior";
  } else {
    role = "Senior";
  }

  doctorData.push({
    name: name.value,
    docId: docId.value,
    department: department.value,
    exp: exp.value,
    email: email.value,
    mobile: mobile.value,
    role,
  });

  name.value =
    docId.value =
    department.value =
    exp.value =
    email.value =
    mobile.value =
      "";

  renderRow(doctorData);
});

function renderRow(doctorData) {
  tableBody.innerHTML = "";
  doctorData.forEach((ele) => {
    const tr = document.createElement("tr");

    const name = document.createElement("td");
    const docId = document.createElement("td");
    const department = document.createElement("td");
    const exp = document.createElement("td");
    const email = document.createElement("td");
    const mobile = document.createElement("td");
    const role = document.createElement("td");
    const deleteCol = document.createElement("td");

    name.innerText = ele.name;
    docId.innerText = ele.docId;
    department.innerText = ele.department;
    exp.innerText = ele.exp;
    email.innerText = ele.email;
    mobile.innerText = ele.mobile;
    role.innerText = ele.role;
    deleteCol.innerHTML = `<button class="deleteBtn" data-name="${ele.name}">Delete</button>`;

    tr.appendChild(name);
    tr.appendChild(docId);
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

  doctorData = doctorData.filter((ele) => ele.name !== e.target.dataset.name);

  renderRow(doctorData);
});
