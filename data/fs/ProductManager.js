import fs from "fs";
import crypto from "crypto";

/* se crea la clase ProductManager */
class ProductManager {
  constructor() {
    this.path = "./data/fs/files/products.json";
    this.init();
  }
  init() {
    if (fs.existsSync(this.path)) {
      console.log("EXISTING PRODUCT");
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
  async read() {
    try {
      let readFile = await fs.promises.readFile(this.path, "utf-8");

      if (readFile) {
        /* parseo el archivo */
        readFile = JSON.parse(readFile);
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

async function run() {
  const instanceOfProducts = new ProductManager();
  /* instancia de ProductManager */
  /* se crean 40 productos */
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
  await instanceOfProducts.create({
    title: "boots adidas",
    photo: "adidas.jpg",
    category: "shoes",
    price: 185,
    stock: 3000,
  });
  await instanceOfProducts.create({
    title: "boots nike",
    photo: "nike.jpg",
    category: "shoes",
    price: 185,
    stock: 3000,
  });
  await instanceOfProducts.create({
    title: "boots puma",
    photo: "puma.jpg",
    category: "shoes",
    price: 185,
    stock: 3000,
  });
  await instanceOfProducts.create({
    title: "boots asics",
    photo: "asics.jpg",
    category: "shoes",
    price: 185,
    stock: 3000,
  });
  await instanceOfProducts.create({
    title: "boots umbro",
    photo: "umbro.jpg",
    category: "shoes",
    price: 125,
    stock: 3000,
  });
  await instanceOfProducts.create({
    title: "boots misuno",
    photo: "misuno.jpg",
    category: "shoes",
    price: 135,
    stock: 3000,
  });
  await instanceOfProducts.create({
    title: "boots topper",
    photo: "misuno.jpg",
    category: "shoes",
    price: 115,
    stock: 3000,
  });
  await instanceOfProducts.create({
    title: "boots new balance",
    photo: "new-balance.jpg",
    category: "shoes",
    price: 195,
    stock: 3000,
  });
  await instanceOfProducts.create({
    title: "boots kappa",
    photo: "kappa.jpg",
    category: "shoes",
    price: 155,
    stock: 3000,
  });
  await instanceOfProducts.create({
    title: "Nike Air Force 1",
    photo: "nikeairforce01.jpg",
    category: "shoes",
    price: 90,
    stock: 800,
  });

  await instanceOfProducts.create({
    title: "Vans Old Skool",
    photo: "vansoldskool05.jpg",
    category: "shoes",
    price: 55,
    stock: 1000,
  });

  await instanceOfProducts.create({
    title: "Converse Chuck Taylor All Star",
    photo: "conversechucktaylor02.jpg",
    category: "shoes",
    price: 50,
    stock: 950,
  });

  await instanceOfProducts.create({
    title: "New Balance 574",
    photo: "newbalance57403.jpg",
    category: "shoes",
    price: 75,
    stock: 700,
  });

  await instanceOfProducts.create({
    title: "Puma Suede Classic",
    photo: "pumasuedeclassic01.jpg",
    category: "shoes",
    price: 60,
    stock: 850,
  });

  await instanceOfProducts.create({
    title: "Adidas Superstar",
    photo: "adidassuperstar04.jpg",
    category: "shoes",
    price: 80,
    stock: 900,
  });

  await instanceOfProducts.create({
    title: "Reebok Classic Leather",
    photo: "reebokclassicleather02.jpg",
    category: "shoes",
    price: 70,
    stock: 750,
  });

  await instanceOfProducts.create({
    title: "Timberland 6-Inch Premium Waterproof Boots",
    photo: "timberlandboots01.jpg",
    category: "boots",
    price: 150,
    stock: 500,
  });

  await instanceOfProducts.create({
    title: "Dr. Martens 1460",
    photo: "drmartens1460.jpg",
    category: "boots",
    price: 130,
    stock: 600,
  });

  await instanceOfProducts.create({
    title: "UGG Classic Short II",
    photo: "uggclassicshortii.jpg",
    category: "boots",
    price: 160,
    stock: 450,
  });

  await instanceOfProducts.create({
    title: "Caterpillar Second Shift Steel Toe Work Boot",
    photo: "caterpillarworkboot.jpg",
    category: "boots",
    price: 110,
    stock: 550,
  });

  await instanceOfProducts.create({
    title: "Skechers Workshire Steel Toe Work Boot",
    photo: "skechersworkboot.jpg",
    category: "boots",
    price: 90,
    stock: 700,
  });

  await instanceOfProducts.create({
    title: "Fila Disruptor II",
    photo: "filadisruptorii.jpg",
    category: "shoes",
    price: 70,
    stock: 850,
  });

  await instanceOfProducts.create({
    title: "ASICS Gel-Kayano 27",
    photo: "asicsgelkayano27.jpg",
    category: "shoes",
    price: 160,
    stock: 600,
  });

  await instanceOfProducts.create({
    title: "Brooks Ghost 13",
    photo: "brooksgoast13.jpg",
    category: "shoes",
    price: 130,
    stock: 700,
  });

  await instanceOfProducts.create({
    title: "Salomon Speedcross 5",
    photo: "salomonspeedcross5.jpg",
    category: "shoes",
    price: 140,
    stock: 500,
  });

  await instanceOfProducts.create({
    title: "Merrell Moab 2 Waterproof",
    photo: "merrellmoab2waterproof.jpg",
    category: "shoes",
    price: 120,
    stock: 800,
  });

  await instanceOfProducts.create({
    title: "Keen Targhee III Waterproof",
    photo: "keentargheeiiiwaterproof.jpg",
    category: "shoes",
    price: 150,
    stock: 650,
  });

  await instanceOfProducts.create({
    title: "Hoka One One Bondi 7",
    photo: "hokaoneonebondi7.jpg",
    category: "shoes",
    price: 170,
    stock: 550,
  });

  await instanceOfProducts.create({
    title: "Under Armour HOVR Phantom 2",
    photo: "underarmourhovrphantom2.jpg",
    category: "shoes",
    price: 140,
    stock: 700,
  });
}
/* run()  */

const iProducts = new ProductManager();

export default iProducts;
