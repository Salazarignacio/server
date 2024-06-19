import fs from "fs";
import crypto from "crypto";

class CartManager {
  constructor() {
    this.path = "./src/data/fs/files/carts.json";
    this.init();
  }

  init() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    }
  }

  async create(data) {
    try {
      if (data.user_id && data.product_id) {
        const cart = {
          id: data.id || crypto.randomBytes(12).toString("hex"),
          user_id: data.user_id,
          product_id: data.product_id,
          quantity: data.quantity || 1,
          state: data.state || "reserved",
        };

        let cartFile = await fs.promises.readFile(this.path, "utf-8");
        cartFile = JSON.parse(cartFile);
        cartFile.push(cart);
        cartFile = JSON.stringify(cartFile, null, 2);

        await fs.promises.writeFile(this.path, cartFile);
        return cart;
      } else {
        throw new Error("ENTER THE REQUIRED FIELDS");
      }
    } catch (err) {
      throw err;
    }
  }

  async read() {
    try {
      let readFile = await fs.promises.readFile(this.path, "utf-8");

      if (readFile) {
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

const iCarts = new CartManager();

export default iCarts;
