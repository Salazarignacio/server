fetch(
  "http://localhost:8080/api/carts/paginate?user_id=6632d2fe9984c35bb08075fe"
)
  .then((res) => res.json())
  .then((res) => {
    let template = ``;
    
    template = res.response.map((element) => {
      return `<div class="card m-1 " style="width: 25rem;"> 
        <p>${element._id}</p>
      <img src=${element.user_id.photo} " style="width: 3rem;"class="card-img-top" alt=${element.id}> 
      <div class="input-group mb-3">
      
      
      </div>
      
      <div class="card-body"> <h5 class="card-title">${element.user_id.email}</h5> 
      <img src=${element.product_id.photo} " style="width: 8rem;"class="card-img-top" alt=${element.id}> 
      <p class="card-text">$${element.product_id.price}</p> 
      <label for="quantity">Cantidad:</label>
<input type="number" class="form-control" id="quantity" value="1" min="1">
        
        <button class="btn btn-outline-secondary" onclick="destroy('${element._id}')"
        type="button"><i class="fa-regular fa-trash-can"></i></button> </div> </div>`;
    });
    document.querySelector("#carts").innerHTML = template;
  })
  .catch((err) => console.log(err));

async function destroy(oid) {
  try {
    console.log(oid);
    const url = "/api/carts/" + oid;
    const opts = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
