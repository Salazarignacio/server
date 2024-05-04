const queries = new URL(location.href);
let split = queries.pathname.split("/");
split = split[split.length - 1];
console.log(split);
fetch(`http://localhost:8080/api/products/${split}`) /* un invento mio */
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let template = `<div class="card m-1 " style="width: 25rem;"> 
  <img src=${data.message.photo} class="card-img-top" alt=${data.message.id}> 
  <div class="card-body"> <h5 class="card-title">${data.message.title}</h5> 
  <p class="card-text">$${data.message.price}</p> 
  <button " class="btn btn-outline-secondary" onclick="addToCart('${split}')">Add to Cart</button>
  <button class="btn btn-outline-secondary" onclick="destroy('${data.message.id}')"
  type="button"><i class="fa-regular fa-trash-can"></i></button> </div> </div>`;
    const container = document.getElementById("container");
    container.innerHTML = template;
  });

  async function addToCart(id){
    try {
        const data = {
            user_id : '6632d2fe9984c35bb08075fe',
            product_id: id,
            quantity: 1
        }
        const url = '/api/carts'; 
        const opts = {
            method: 'POST',
            body: JSON.stringify(data),
            headers : {'Content-Type': 'application/json'}
        }
        let response = await fetch(url, opts)
        response = await response.json()
        console.log(response);
    } catch (error) {
        console.log(error);
    }
  }
