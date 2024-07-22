let template = `<button id="submitButton">Log In</button>`;
const submit = document.querySelector("#submit");
const recoveryButton = document.querySelector("#recovery");
submit.innerHTML = template;

const submitButton = document.querySelector("#submitButton");

recoveryButton.addEventListener("click", async (e)=>{
  e.preventDefault()
  const data = {email: document.querySelector("#email").value}
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let changePass = await fetch("/api/password", opts);
  changePass = await changePass.json()
})

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
