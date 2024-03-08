/* se crea la clase ProductManager */
class ProductManager {
  /* variable privada de la clase donde se acumulan los productos */
    static #products = [];
  
    /* metodo create */
    create(data) {
      /* propiedades de cada producto */
      const product = {
        id:
          ProductManager.#products.length == 0
            ? 1
            : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
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
      return ProductManager.#products.length == 0
        ? "No hay productos cargados"
        : ProductManager.#products;
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
  console.log(instanceOfProducts.read());
  