const queries = new URL(location.href);

let split = queries.pathname.split("/");

split = split[split.length - 1];
console.log(split);
let actualPage = 1;

function fetchProducts(page) {
  fetch(`/api/sessions/online`)
    .then((data) => data.json())
    .then((data) => {
      let user_role = data.role;
      let user_id = data.user_id;
      let url = `/api/products/paginate/?category=${split}&page=${page}`;

      if (user_role == 2) {
        url = `/api/products/paginate/?category=${split}&page=${page}&supplier_id=${user_id}`;
        if (split == "me") {
          url = `/api/products/paginate/?page=${page}&supplier_id=${user_id}&me=true`;
        }
      }
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log(url);
          let template = ``;
          template = data.response
            .map((element) => {
              return `<div class="card m-1 " style="width: 25rem;"> 
        <img src=${element.photo} class="card-img-top" alt=${element.id}> 
        <div class="card-body"> <h5 class="card-title">${element.title}</h5> 
        <p class="card-text">$${element.price}</p> 
        <a href="/products/details/${element._id}" class="btn btn-outline-secondary">Details</a>
 </div> </div>`;
            })
            .join("");
          let prev = `<div><button class="btn btn-primary" id="prevB"> Prev </button></div>`;
          let next = `<div><button class="btn btn-primary" id="nextB"> Next </button></div>`;
          document.querySelector("#products").innerHTML =
            template + prev + next;
          document
            .querySelector("#nextB")
            .addEventListener("click", () => fetchProducts(data.info.page + 1));
          document
            .querySelector("#prevB")
            .addEventListener("click", () => fetchProducts(data.info.page - 1));
        });
    });
}

fetchProducts(actualPage);
