let objeto = "";
fetch("http://localhost:8080/api/sessions/online")
  .then((online) => online.json())
  .then((online) => {
    user_id = online.user_id;

    fetch(`http://localhost:8080/api/carts/paginate?user_id=${user_id}`)
      .then((res) => res.json())
      .then((res) => {
        let template = ``;
        const total = res.response.reduce((acc, element) => {
          return acc + element.product_id.price * element.quantity;
        }, 0);

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
<input type="number" class="form-control" id="quantity" value=${element.quantity} min="1">
        
        <button class="btn btn-outline-secondary" onclick="destroy('${element._id}')"
        type="button"><i class="fa-regular fa-trash-can"></i></button> </div> </div>`;
        });
        const totalDisplay = `<p>Total Acumulado: $${total.toFixed(2)}</p>`;
        const buttonAcept = `<button id="acceptButton">Finalize purchase</button>`;
        const buttonCancel = `<button id="canceltButton">Cancel purchase</button>`;

        document.querySelector("#carts").innerHTML =
          template + totalDisplay + buttonAcept + buttonCancel;

        document
          .getElementById("acceptButton")
          .addEventListener("click", () => {
            aceptOrCancelPurchase(res, true);
          });
        document
          .getElementById("canceltButton")
          .addEventListener("click", () => {
            aceptOrCancelPurchase(res, false);
          });
      })
      .catch((err) => {
        throw err;
      });
  });

async function destroy(oid) {
  try {
    const url = "/api/carts/" + oid;
    const opts = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(url, opts);
    response = await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function aceptOrCancelPurchase(res, bool) {
  bool
    ? console.log("Purchase done succesfully")
    : console.log("Purchace was cancelled");
  res.response.map((element) => destroy(element._id));
}
