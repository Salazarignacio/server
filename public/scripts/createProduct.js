async function createProduct(e) {
  e.preventDefault();
  try {
    const title = document.querySelector("#title").value;
    const category = document.querySelector("#category").value;
    const photo = document.querySelector("#photo").value;
    const price = document.querySelector("#price").value;
    const stock = document.querySelector("#stock").value;
    let user_id = await fetch("http://localhost:8080/api/sessions/online");
    user_id = await user_id.json();
    user_id = user_id.user_id;
    const url = "http://localhost:8080/api/products/";
    const data = {
      title: title,
      category: category,
      photo: photo,
      price: price,
      stock: stock,
      supplier_id: { _id: user_id } /* no me toma esta propiedad */,
    };
    const opts = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(url, opts);
    response = await response.json();
    /* creo un update y le agrego la propiedad "supplier_id" */
    const product_id = response.response;
    const updateUrl = `http://localhost:8080/api/products/${product_id}`;
    const updateData = {
      supplier_id: { _id: user_id },
    };
    const updateOpts = {
      method: "PUT",
      body: JSON.stringify(updateData),
      headers: { "Content-Type": "application/json" },
    };
    let updateResponse = await fetch(updateUrl, updateOpts);
    updateResponse = await updateResponse.json();

    function showSuccessAlert(bool, title, text) {
      Swal.fire({
        icon: bool,
        title: title,
        text: text,
        confirmButtonText: "Aceptar",
      });
    }
    if (response.statusCode == 201) {
      showSuccessAlert("success", "Product created", response.response);
    } else {
      showSuccessAlert("error", "errorazo", response.message);
    }
    console.log(data);
  } catch (error) {
    throw error;
  }
}

document
  .querySelector("#create")
  .addEventListener("click", (e) => createProduct(e));
