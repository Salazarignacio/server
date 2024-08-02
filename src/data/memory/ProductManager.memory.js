import crypto from 'crypto' 

/* se crea la clase ProductManager */
class ProductManager {
  /* variable privada de la clase donde se acumulan los productos */
  static #products = [];

  /* metodo create */
  create(data) {
    /* propiedades de cada producto */
    const product = {
      id: data.id ||  crypto.randomBytes(12).toString("hex"),
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
        throw new Error("PRODUCTS NOT FOUND");
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
        throw new Error("ID NOT FOUND, INSERT A VALID ID");
      }
    } catch (err) {
      console.log(err);
    }
  }
  update(id, obj) {
    let read =  ProductManager.#products;
    let filter = read.find((element) => element.id == id);
    for (let a in obj) {
      filter[a] = obj[a];
    }

    return this.readOne(id);
  }
  destroy(id) {
    const filterId = ProductManager.#products.filter(
      (element) => element.id != id
    );
    try {
      if (filterId.length == ProductManager.#products.length) {
        console.log("err");
        throw new Error("CAN NOT DELETE FILE, ID NOT FOUND");
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
  price: 165,
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
/* console.log(instanceOfProducts.destroy(1)); */
console.log(instanceOfProducts.update(1, {title: 'new title'}));

const productsManagerMem = new ProductManager()

export default productsManagerMem

