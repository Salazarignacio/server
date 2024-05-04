fetch("http://localhost:8080/api/products/paginate")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data.response);
    let template = ``;
    
      template = data.response
        .map(
          (element) => `<div class="card m-1 " style="width: 25rem;"> 
    <img src=${element.photo} class="card-img-top" alt=${element.id}> 
    <div class="card-body"> <h5 class="card-title">${element.title}</h5> 
    <p class="card-text">$${element.price}</p> 
    <a href="/products/details/${element._id}" class="btn btn-outline-secondary">Details</a>
    <button class="btn btn-outline-secondary" onclick="destroy('${element.id}')"
    type="button"><i class="fa-regular fa-trash-can"></i></button> </div> </div>`
        )
        .join("");
      document.querySelector("#products").innerHTML = template;
    
  });
