const queries = new URL(location.href);
let split = queries.pathname.split("/");
split = split[split.length - 1];
let actualPage = 1;

function fetchProducts(page) {
  fetch(
    `http://localhost:8080/api/products/paginate/?category=${split}&page=${page}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
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
      let prev = `<button class="btn btn-primary" id="prevB"> Prev </button>`;
      let next = `<button class="btn btn-primary" id="nextB"> Next </button>`;

      document.querySelector("#products").innerHTML = prev + next + template;
      document
        .querySelector("#nextB")
        .addEventListener("click", () => fetchProducts(data.info.page + 1));
      document
        .querySelector("#prevB")
        .addEventListener("click", () => fetchProducts(data.info.page - 1));
    });
}

fetchProducts(actualPage);
