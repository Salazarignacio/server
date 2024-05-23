import fs from "fs";
import crypto from "crypto";

/* se crea la clase ProductManager */
class ProductManager {
  constructor() {
    this.path = "./src/data/fs/files/products.json";
    this.init();
  }
  init() {
    if (fs.existsSync(this.path)) {
    } else {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }
  /* metodo create */
  async create(data) {
    try {
      /* propiedades de cada producto */
      if (data.title) {
        const product = {
          /* se agrega la opcion de pasar un ID por parametro para poder testear los metodos que buscan el producto por ID */
          id: data.id || crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "data:image/jpeg;base64,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",
          category: data.category || "several",
          price: data.price || 0,
          stock: data.stock || 1,
        };

        let prodFile = await fs.promises.readFile(this.path, "utf-8");
        prodFile = JSON.parse(prodFile);
        prodFile.push(product);
        prodFile = JSON.stringify(prodFile, null, 2);

        await fs.promises.writeFile(this.path, prodFile);
        return product;
      } else {
        throw new Error("ENTER THE REQUIRED FIELDS");
      }
    } catch (err) {
      throw err;
    }
  }
  /* metodo que retorna los productos cargados */
  async read(category) {
    try {
      let readFile = await fs.promises.readFile(this.path, "utf-8");

      if (readFile) {
        /* parseo el archivo */
        readFile = JSON.parse(readFile);
        if (category) {
          readFile = readFile.filter((element) => element.category == category);
        }
        return readFile;
      } else {
        throw new Error("CAN NOT READ PRODUCT");
      }
    } catch (err) {
      throw err;
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
        throw new Error("PRODUCT NOT FOUND");
      }
    } catch (err) {
      throw err;
    }
  }
  async update(id, obj) {
    let read = await this.read();
    let filter = read.find((element) => element.id == id);
    for (let a in obj) {
      filter[a] = obj[a];
    }
    read = JSON.stringify(read, null, 2);
    await fs.promises.writeFile(this.path, read);
    return this.readOne(id);
  }
  async destroy(id) {
    let readFile = await fs.promises.readFile(this.path, "utf-8");
    try {
      readFile = JSON.parse(readFile);
      let filterId = readFile.filter((element) => element.id != id);
      if (readFile.length != filterId.length) {
        filterId = JSON.stringify(filterId, null, 2);

        fs.promises.writeFile(this.path, filterId);
        return `ID: ${id} DELETED SUCCESSFULLY`;
      } else {
        throw new Error("CAN NOT DELETE FILE, ID NOT FOUND");
      }
    } catch (err) {
      throw err;
    }
  }
}

const iProducts = new ProductManager();

export default iProducts;
