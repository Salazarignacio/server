let template = `<button id="submitButton">Log In</button>`;
const submit = document.querySelector("#submit");
submit.innerHTML = template;

const submitButton = document.querySelector("#submitButton");

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = {
    password: document.querySelector("#password").value,
    email: document.querySelector("#email").value,
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let response = await fetch("/api/sessions/login", opts);

  response = await response.json();

  if (response.statusCode == 200) {
    
     location.replace("/"); 
  } else {
    Swal.fire({
      title: 'Error!',
      text: response.message,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
    console.log(response);
  }
});
