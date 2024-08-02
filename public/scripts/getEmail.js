const recoveryButton = document.querySelector("#rec");
function showSuccessAlert(bool, title, text) {
  Swal.fire({
    icon: bool,
    title: title,
    text: text,
    confirmButtonText: "Aceptar",
  });
}
recoveryButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = { email: document.querySelector("#email").value };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/api/password", opts);
  response = await response.json();

if (response.statusCode == 200) {
  showSuccessAlert("success", "Exito!", response.response);
} else {
  console.log(response);
  
  showSuccessAlert("error", "Error", response.message);
}
});