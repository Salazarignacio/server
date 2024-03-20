const crypto = require("crypto");
const fs = require("fs");

/* se crea la clase ProductManager */
class ProductManager {
  constructor(path) {
    this.path = path;
    this.init();
  }
  init() {
    if (fs.existsSync(this.path)) {
      console.log("Nota ya existente");
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }
  /* metodo create */
  async create(data) {
    try {
      /* propiedades de cada producto */
      if (data.title && data.category && data.price && data.stock) {
        const product = {
          /* se agrega la opcion de pasar un ID por parametro para poder testear los metodos que buscan el producto por ID */
          id: data.id || crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "data:image/jpeg;base64,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",
          category: data.category,
          price: data.price,
          stock: data.stock,
        };

        let prodFile = await fs.promises.readFile(this.path, "utf-8");
        prodFile = JSON.parse(prodFile);
        prodFile.push(product);
        prodFile = JSON.stringify(prodFile, null, 2);

        await fs.promises.writeFile(this.path, prodFile);
      } else {
        throw new Error("ingrrese todos los campos requeridos");
      }
    } catch (err) {
      console.log(err);
    }
  }
  /* metodo que retorna los productos cargados */
  async read() {
    try {
      const readFile = await fs.promises.readFile(this.path, "utf-8");
      if (readFile) {
        return readFile;
      } else {
        throw new Error("El archivo no contiene notas");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async readOne(id) {
    let readFile = await fs.promises.readFile(this.path, "utf-8");
    try {
      readFile = JSON.parse(readFile);
      const findId = readFile.find((element) => element.id == id);
      if (findId) {
        return findId;
      } else {
        throw new Error("Nota no encontrada");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async destroy(id) {
    let readFile = await fs.promises.readFile(this.path, "utf-8");
    try {
      readFile = JSON.parse(readFile);
      let filterId = readFile.filter((element) => element.id != id);
      if (readFile.length != filterId.length) {
        filterId = JSON.stringify(filterId, null, 2);

        return fs.promises.writeFile(this.path, filterId);
      } else {
        throw new Error("No se puede eliminar, ID no encontrado");
      }
    } catch (err) {
      console.log(err);
    }
  }
}
async function run() {
  /* instancia de ProductManager */
  const instanceOfProducts = new ProductManager("./files/products");
  /* se crean 10 productos */
  await instanceOfProducts.create({
    id: 1,
    title: "zapatillas",
    photo: "zapatillas.jpg",
    category: "shoes",
    price: 65,
    stock: 2000,
  });
  await instanceOfProducts.create({
    id: 2,
    title: "zapatillas",
    photo: "zapatillas.jpg",
    category: "shoes",
    price: 65,
    stock: 2000,
  });

  await instanceOfProducts.create({
    title: "remera",
    photo: "remera.jpg",
    category: "t-shirt",
    price: 10,
    stock: 2000,
  });
  await instanceOfProducts.create({
    title: "bermuda",
    photo: "bermuda.jpg",
    category: "shorts",
    price: 30,
    stock: 1500,
  });
  await instanceOfProducts.create({
    title: "medias",
    photo: "medias.jpg",
    category: "socks",
    price: 5,
    stock: 3000,
  });
  await instanceOfProducts.create({
    title: "jeans",
    photo: "jeans.jpg",
    category: "jeans",
    price: 65,
    stock: 1000,
  });
  await instanceOfProducts.create({
    title: "chomba",
    photo: "chomba.jpg",
    category: "shirt",
    price: 65,
    stock: 1000,
  });
  await instanceOfProducts.create({
    title: "chomba roja",
    photo: "chombaroja.jpg",
    category: "shirt",
    price: 25,
    stock: 1000,
  });
  await instanceOfProducts.create({
    title: "zapatilla nike",
    photo: "nike.jpg",
    category: "shoes",
    price: 105,
    stock: 1000,
  });
  await instanceOfProducts.create({
    title: "zapatilla asics",
    photo: "asics.jpg",
    category: "shoes",
    price: 165,
    stock: 2000,
  });
  await instanceOfProducts.create({
    title: "sandalia",
    photo: "sandalia.jpg",
    category: "flip-flop",
    price: 15,
    stock: 2000,
  });
  await instanceOfProducts.create({
    title: "campera nieve roja",
    photo: "jacket.jpg",
    category: "jackets",
    price: 165,
    stock: 1000,
  });
  console.log(await instanceOfProducts.read())
}

run();
