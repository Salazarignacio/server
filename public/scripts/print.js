async function outline() {
  let outline = await fetch("http://localhost:8080/api/sessions/signout");
  outline = await outline.json();
  location.replace("/");
}

async function print() {
  let online = await fetch("http://localhost:8080/api/sessions/online");
  online = await online.json();

  let template = "";
  let loginHTML = "";
  if (online.statusCode == 200) {
    template = ` <a class="btn btn-primary" aria-current="page" href="/carts/?user_id=662ed0fe4b699c3de2b9da62">Go to Cart <i class="fa-solid fa-cart-shopping"></i></a>`;
    loginHTML = `<a class="nav-link active" id="signOut" aria-current="page">Sign Out</a>`;
    document.querySelector("#miDiv").innerHTML = template;
    document.querySelector("#login").innerHTML = loginHTML;
    document.querySelector("#userLogged").innerHTML = online.email;

    document.querySelector("#signOut").addEventListener("click", () => {
      outline();
    });
  } else {
    loginHTML = `<a class="nav-link active" aria-current="page" href="/register">Sign In</a>
    <a class="nav-link active" aria-current="page" href="/login">Log In</a>`;
    document.querySelector("#miDiv").innerHTML = template;
    document.querySelector("#login").innerHTML = loginHTML;
  }
}

print();
