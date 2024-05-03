console.log("hola desde el importado");

fetch("http://localhost:8080/api/products/e33e8cf00de70f2d149c5ade")
.then(
  (data) => { console.log(data)})
;

