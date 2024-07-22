async function recovery(e) {
  try {
    e.preventDefault();
    const verifyCode = document.querySelector("#code").value;
    const password = document.querySelector("#password").value;
    const email = document.querySelector("#email").value;

    const data = {
      password: password,
      email: email,
      verifyCode: verifyCode,
    };

    const url = "http://localhost:8080/api/users/password";
    const opts = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(url, opts);
    response = await response.json();
    function showSuccessAlert(bool, title, text) {
      Swal.fire({
        icon: bool,
        title: title,
        text: text,
        confirmButtonText: "Aceptar",
      });
    }
    // Llamar a la función para mostrar la alerta
    if (response.statusCode == 200) {
      showSuccessAlert("success", "Exito!", response.response);
      setTimeout(() => {
        window.location.replace("login");
      }, 2500);
    } else {
      showSuccessAlert("error", "Error", response.message);
    }
  } catch (error) {
    console.log(error);
  }
}
document.querySelector("#rec").addEventListener("click", (e) => recovery(e));
