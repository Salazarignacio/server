const crypto = require("crypto");

/* se crea la clase ProductManager */
class ProductManager {
  /* variable privada de la clase donde se acumulan los productos */
  static #products = [];

  /* metodo create */
  create(data) {
    /* propiedades de cada producto */
    const product = {
      id: data.id || crypto.randomBytes(12).toString("hex"),
      title: data.title,
      photo: data.photo,
      category: data.category,
      price: data.price,
      stock: data.stock,
    };
    ProductManager.#products.push(product);
  }
  /* metodo que retorna los productos cargados */
  read() {
    try {
      if (ProductManager.#products.length != 0) {
        return ProductManager.#products;
      } else {
        throw new Error("No hay productos cargados");
      }
    } catch (err) {
      console.log(err);
    }
  }
  readOne(id) {
    const findId = ProductManager.#products.find((element) => element.id == id);
    try {
      if (findId) {
        return findId;
      } else {
        throw new Error("El ID no fue encontrado, ingrese un ID valido");
      }
    } catch (err) {
      console.log(err);
    }
  }
  destroy(id) {
    const filterId = ProductManager.#products.filter(
      (element) => element.id != id
    );
    try {
      if (filterId.length == ProductManager.#products.length) {
        console.log("err");
        throw new Error("No se pudo eliminar archivo, ID no encontrado");
      } else {
        ProductManager.#products = filterId;
        return ProductManager.#products;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

/* instancia de ProductManager */
const instanceOfProducts = new ProductManager();
/* se crean 5 productos */
instanceOfProducts.create({
  title: "zapatillas",
  photo: "zapatillas.jpg",
  category: "shoes",
  price: 65,
  stock: 1000,
});

instanceOfProducts.create({
  id: 1,
  title: "remera",
  photo: "remera.jpg",
  category: "t-shirt",
  price: 10,
  stock: 2000,
});
instanceOfProducts.create({
  title: "bermuda",
  photo: "bermuda.jpg",
  category: "shorts",
  price: 30,
  stock: 1500,
});
instanceOfProducts.create({
  title: "medias",
  photo: "medias.jpg",
  category: "socks",
  price: 5,
  stock: 3000,
});
instanceOfProducts.create({
  title: "jeans",
  photo: "jeans.jpg",
  category: "jeans",
  price: 65,
  stock: 1000,
});
console.log(instanceOfProducts.destroy(1));
