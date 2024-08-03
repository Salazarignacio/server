const queries = new URL(location.href);
let split = queries.pathname.split("/");
split = split[split.length - 1];
fetch(`http://localhost:8080/api/products/${split}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let template = `<div class="card m-1 " style="width: 25rem;"> 
  <img src=${data.response.photo} class="card-img-top" alt=${data.response.id}> 
  <div class="card-body"> <h5 class="card-title">${data.response.title}</h5> 
  <p class="card-text">$${data.response.price}</p> 
  <button " class="btn btn-outline-secondary" onclick="addToCart('${split}')">Add to Cart</button>
  <button class="btn btn-outline-secondary" onclick="destroy('${data.response.id}')"
  type="button"><i class="fa-regular fa-trash-can"></i></button> </div> </div>`;
    const container = document.getElementById("container");
    container.innerHTML = template;
  });

async function addToCart(id) {
  try {
    let fetch_id = await fetch("http://localhost:8080/api/sessions/online");
    fetch_id = await fetch_id.json();
    let user_id = fetch_id.user_id;
    if (!user_id) {
      Swal.fire({
        title: "User not logged",
        text: "Please sign in",
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      Swal.fire({
        title: "Ok",
        text: "Added to cart",
        icon: "success",
        confirmButtonText: "Cool",
      });
    }
    const data = {
      user_id: user_id,
      product_id: id,
      quantity: 1,
    };
    const url = "/api/carts";
    const opts = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    /* si existe hacer un post, sino un update */
    let getProducts = await fetch(url);
    getProducts = await getProducts.json();
    const searchProduct = getProducts.response.find((element) => 
      element.product_id._id == id
    );
    
    if (!searchProduct) {
      let response = await fetch(url, opts);
      response = await response.json();
    } else {
      console.log("cantidad ++")
    }
  } catch (error) {
    throw error;
  }
}
