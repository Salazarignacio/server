const socket = io();

socket.on("realUsers", (data) => {
  let template = ``;
  template = data
    .map(
      (element) => ` 

  <div class="card mb-3 shadow-sm p-3 mb-5 bg-body-tertiary rounded" style="max-width: 940px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${element.photo}" class="img-fluid rounded-start" alt="${element.id}">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${element.email}</h5>
        <p class="card-text">Role: ${element.role}</p>
        <p class="card-text">ID: ${element.id}</p>
         <a href="/users/details/${element.id}" class="btn btn-outline-secondary">Details</a>
        <button class="btn btn-outline-secondary" onclick="destroyUser('${element.id}')" type="button"><i class="fa-regular fa-trash-can"></i></button>
      </div>
    </div>
  </div>
</div>`
    )
    .join("");
  document.querySelector("#realUsers").innerHTML = template;
});

function destroyUser(id) {
  socket.emit("destroyUser", id);
}

function runUser() {
  const photo = document.querySelector("#photoUser").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const role = document.querySelector("#role").value;
  socket.emit("createUser", {
    photo: photo,
    email: email,
    password: password,
    role: role,
  });
}
