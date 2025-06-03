const userForm = document.getElementById('userForm');
const nameInput = document.getElementById('name');      // corrigido
const emailInput = document.getElementById('email');    // corrigido
const senhaInput = document.getElementById('senha');    // novo
const userIdInput = document.getElementById('userId');
const userTableBody = document.querySelector('#userTable tbody');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

let users = [];
let nextId = 1;

function renderUsers(filter = '') {
  userTableBody.innerHTML = '';

  users
    .filter(user => user.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td class="actions">
          <button onclick="editUser(${user.id})">Editar</button>
          <button onclick="deleteUser(${user.id})">Remover</button>
        </td>
      `;
      userTableBody.appendChild(row);
    });
}

function editUser(id) {
  const user = users.find(u => u.id === id);
  if (user) {
    nameInput.value = user.name;
    emailInput.value = user.email;
    senhaInput.value = user.senha;
    userIdInput.value = user.id;
  }
}

function deleteUser(id) {
  users = users.filter(u => u.id !== id);
  renderUsers(searchInput.value);
}

userForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();
  const id = userIdInput.value;

  if (id) {
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
      user.name = name;
      user.email = email;
      user.senha = senha;
    }
  } else {
    users.push({ id: nextId++, name, email, senha });
  }

  userForm.reset();
  renderUsers(searchInput.value);
});

searchButton.addEventListener('click', function () {
  renderUsers(searchInput.value);
});
