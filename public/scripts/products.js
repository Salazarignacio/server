fetch("http://localhost:8080/api/products/")
.then((response) => {
  return response.json();
})
.then((data) => {
  
  console.log(data);
  /* let template = `<div class="card m-1 " style="width: 25rem;"> 
  <img src=${data.message.photo} class="card-img-top" alt=${data.message.id}> 
  <div class="card-body"> <h5 class="card-title">${data.message.title}</h5> 
  <p class="card-text">$${data.message.price}</p> 
  <a href="/products/details/${data.message.id}" class="btn btn-outline-secondary">Details</a>
  <button class="btn btn-outline-secondary" onclick="destroy('${data.message.id}')"
  type="button"><i class="fa-regular fa-trash-can"></i></button> </div> </div>`
  const container = document.getElementById("container");
  container.innerHTML = template; 
   */});
