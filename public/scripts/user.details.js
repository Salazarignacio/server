const queries = new URL(location.href);
let split = queries.pathname.split("/");
split = split[split.length - 1];
console.log(split);
fetch(`http://localhost:8080/api/users/${split}`) /* un invento mio */
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let template = `<div class="card m-1 " style="width: 25rem;"> 
  <img src=${data.message.photo} class="card-img-top" alt=${data.message.id}> 
  <div class="card-body"> <h5 class="card-title">${data.message.email}</h5> 
  <p class="card-text">${data.message.role}</p> 
  <button class="btn btn-outline-secondary" onclick="destroy('${data.message.id}')"
  type="button"><i class="fa-regular fa-trash-can"></i></button> </div> </div>`;
    const container = document.getElementById("container");
    container.innerHTML = template;
  });
