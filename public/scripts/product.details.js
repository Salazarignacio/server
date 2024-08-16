let role = 0;
fetch("/api/sessions/online")
  .then((data) => data.json())
  .then((user) => {
    role = user.role;

    console.log(role);
    const queries = new URL(location.href);
    let split = queries.pathname.split("/");
    split = split[split.length - 1];

    fetch(`/api/products/${split}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let template = `<div class="card m-1 " style="width: 25rem;"> 
  <img src=${data.response.photo} class="card-img-top" alt=${data.response._id}> 
  <div class="card-body"> <h5 class="card-title">${data.response.title}</h5> 
  <p class="card-text">$${data.response.price}</p> 
  <button " class="btn btn-outline-secondary" onclick="addToCart('${split}')">Add to Cart</button>
 </div> </div>`;
        if (role == 1) {
          template = `<div class="card m-1 " style="width: 25rem;"> 
  <img src=${data.response.photo} class="card-img-top" alt=${data.response._id}> 
  <div class="card-body"> <h5 class="card-title">${data.response.title}</h5> 
  <p class="card-text">$${data.response.price}</p> 
  <button class="btn btn-outline-secondary" onclick="destroy('${data.response._id}')"
  type="button"><i class="fa-regular fa-trash-can"></i></button> </div> </div>`;
        } else if (user.user_id == data.response.supplier_id) {
          template = `<div class="card m-1 " style="width: 25rem;"> 
  <img src=${data.response.photo} class="card-img-top" alt=${data.response._id}> 
  <div class="card-body"> <h5 class="card-title">${data.response.title}</h5> 
  <p class="card-text">$${data.response.price}</p> 
  <button class="btn btn-outline-secondary" onclick="destroy('${data.response._id}')"
  type="button"><i class="fa-regular fa-trash-can"></i></button> </div> </div>`;
        }
        const container = document.getElementById("container");
        container.innerHTML = template;
      });
  });
async function addToCart(id) {
  try {
    let fetch_id = await fetch("/api/sessions/online");
    fetch_id = await fetch_id.json();
    let user_id = fetch_id.user_id;

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

    let getProducts = await fetch(url);
    getProducts = await getProducts.json();
    const searchProduct = getProducts.response.find(
      (element) => element.product_id._id == id
    );
    if (!user_id) {
      Swal.fire({
        title: "User not logged",
        text: "Please sign in",
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else if (user_id && !searchProduct){
      Toastify({
        text: "Added to cart",
        duration: 3000, // Duración en milisegundos
        gravity: "bottom", // `top` o `bottom`
        position: "left", // `left`, `center` o `right`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Colores del fondo
      }).showToast(); 
    } else if (user_id && searchProduct){
      Toastify({
        text: "+1",
        duration: 3000, // Duración en milisegundos
        gravity: "bottom", // `top` o `bottom`
        position: "left", // `left`, `center` o `right`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // Colores del fondo
      }).showToast(); 
    }

    if (!searchProduct) {
      let response = await fetch(url, opts);
      response = await response.json();
    } else {
      const updateData = {
        user_id: user_id,
        product_id: id,
        quantity: searchProduct.quantity + 1,
      };
      const updateOpts = {
        method: "PUT",
        body: JSON.stringify(updateData),
        headers: { "Content-Type": "application/json" },
      };

      const updateUrl = `${url}/${searchProduct._id}`;
      let updateResponse = await fetch(updateUrl, updateOpts);
      updateResponse = await updateResponse.json();
    }
  } catch (error) {
    throw error;
  }
}

async function destroy(pid) {
  try {
    const url = `/api/products/${pid}`;
    const opts = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(url, opts);
    response = await response.json();
    location.replace("/me");
  } catch (error) {
    throw error;
  }
}
