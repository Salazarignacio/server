async function signIn() {
  try {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const age = document.querySelector("#age").value;
    const role = document.querySelector("#role").value;
    const photo = document.querySelector("#photo").value;

    const data = {
      email: email,
      password: password,
      age: age,
      role: role,
      photo: photo,
    };

    const url = "http://localhost:8080/api/sessions/register";
    const opts = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(url, opts);
    response = await response.json();
  } catch (error) {
    console.log(error);
  }
}
document.querySelector("#reg").addEventListener("click", () => signIn());
