const addBtn = document.querySelector("#add");
const loadBtn = document.querySelector("#load");
// const form = document.querySelector("#form");
const ul = document.querySelector("#check-employe");

const url = {
  URL: "http://localhost:3001/employe",
};

const addClick = async (e) => {
  e.preventDefault();
  let obj = {};
  let isTrue = true;
  const formData = new FormData(form);
  formData.forEach((value, names) => {
    if (value.trim() === "") {
      isTrue = false;
      return;
    }
    obj = {
      ...obj,
      [names]: value,
    };
  });

  if (isTrue) {
    await fetch(url.URL, {
      method: "POST",
      body: JSON.stringify(obj),
    });
  } else {
    alert("Zehmet olmasa butun xanalari doldurun!");
  }
};

const getData = async () => {
  const res = await fetch(url.URL);
  const data = await res.json();
  showData(data);
};

const showData = (data) => {
  data.forEach((item) => {
    ul.innerHTML += `
      <li>
          <div class="check-box">
            <input type="checkbox" name="check" id="${item.id}" class="check">
            <p class="full-name">${item.FirstName} ${item.LastName}</p>
          </div>
          <button class="delete-btn"><i class="fa-regular fa-trash-can" id="${item.id}"></i></button>
      </li>
    `;
  });
  remove(data);
};

const loadClick = (e) => {
  e.preventDefault();
  const checkedItems = [];
  const checkBox = document.querySelectorAll(".check");
  checkBox.forEach((item) => {
    if (item.checked) {
      checkedItems.push(item.id);
    }
  });
  loadData(checkedItems);
};

loadBtn.addEventListener("click", loadClick);
addBtn.addEventListener("click", addClick);

const loadData = async (items) => {
  const res = await fetch(url.URL);
  const data = await res.json();
  const table = document.querySelector("tbody");
  table.innerHTML = "";
  data.filter((item, index) => {
    if (item.id == items[index]) {
      table.innerHTML += `
        <tr>
          <td>${item.FirstName}</td>
          <td>${item.LastName}</td>
          <td>${item.Salary} $</td>
        </tr>
      `;
    }
  });
};

const remove = (data) => {
  const deleteBtn = document.querySelectorAll(".delete-btn i");
  deleteBtn.forEach((item) => {
    item.addEventListener("click", async (e) => {
      let filterData = data.find((item) => item.id === e.target.id);
      await fetch(`${url.URL}/${filterData.id}`, {
        method: "DELETE",
      });
    });
  });
};

getData();
