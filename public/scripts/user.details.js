fetch(`http://localhost:8080/api/users/`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.response);
    let template = `<div class="card m-1 " style="width: 25rem;"> 
  <img src=${data.response.photo} class="card-img-top" alt=${data.response.id}> 
  <div class="card-body"> <h5 class="card-title">${data.response.email}</h5> 
  <p class="card-text">${data.response.role}</p> 
  <button class="btn btn-outline-secondary" onclick="destroy('${data.response.id}')"
  type="button"><i class="fa-regular fa-trash-can"></i></button> </div> </div>`;
    const container = document.getElementById("container");
    container.innerHTML = template;
  });
