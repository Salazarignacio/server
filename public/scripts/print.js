async function outline() {
  try {
    let response = await fetch("http://localhost:8080/api/sessions/signout");
    if (!response.ok) {
      throw new Error('Error al cerrar sesión');
    }
    let result = await response.json();
    location.replace("/");
  } catch (error) {
    console.error('Error en outline:', error);
  }
}

async function print() {
  try {
    let response = await fetch("http://localhost:8080/api/sessions/online");
    if (!response.ok) {
      if (response.status === 401) {
        console.log('Session no iniciada');
      } else {
        throw new Error('Error al verificar el estado de la sesión');
      }
    }
    let online = await response.json();
    
    let template = "";
    let loginHTML = "";
    if (online.statusCode === 200) {
      template = `<a class="btn btn-primary" aria-current="page" href="/carts/?user_id=662ed0fe4b699c3de2b9da62">Go to Cart <i class="fa-solid fa-cart-shopping"></i></a>`;
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
  } catch (error) {
    console.log('Error en print:', error.message);
    // Mostrar mensaje de error al usuario
    let loginHTML = `<a class="nav-link active" aria-current="page" href="/register">Sign In</a>
    <a class="nav-link active" aria-current="page" href="/login">Log In</a>`;
    document.querySelector("#login").innerHTML = loginHTML;
  }
}

print();
