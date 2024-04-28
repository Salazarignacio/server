import crypto from "crypto";

class Cartmanager {
  static #cart = [];
  create(data) {
    try {
      if (data.user_id && data.product_id) {
        const cart = {
          id: data.id || crypto.randomBytes(12).toString("hex"),
          user_id: data.user_id,
          product_id: data.product_id,
          quantity: data.quantity || 1,
          state: data.state || "reserved",
        };
        Cartmanager.#cart.push(cart);
        return `cart was created succesfully, ID: ${cart.id}`;
      } else {
        throw new Error("Can not create file");
      }
    } catch (error) {
      throw error;
    }
  }
  read() {
    try {
      if (Cartmanager.#cart.length != 0) {
        return Cartmanager.#cart;
      } else {
        throw new Error("The cart is empty");
      }
    } catch (error) {
      throw error;
    }
  }
  readOne(id) {
    const find = Cartmanager.#cart.find((element) => element.id == id);
    try {
      if (find) {
        return find;
      } else {
        throw new Error("ID not found");
      }
    } catch (error) {
      throw error;
    }
  }
  update(id, data) {
    let find = Cartmanager.#cart.find((element) => element.id == id);
    try {
      if (find) {
        for (let element in data) {
          find[element] = data[element];
        }
        return Cartmanager.#cart;
      } else {
        throw new Error("Can not update data. ID not found");
      }
    } catch (error) {
      throw error;
    }
  }
  destroy(id) {
    try {
      const filter = Cartmanager.#cart.filter(
        (element) => element.id != id
      );
      if(filter.length != Cartmanager.#cart){
        filter = Cartmanager.#cart
      }else {
        throw new Error('file can not be deleted. ID not found')
      }
    } catch (error) {
      throw error;
    }
  }
}

const cart = new Cartmanager();
try {
  cart.read();
} catch (error) {
  console.log(error);
}
cart.create({
  id: 1,
  user_id: 2,
  product_id: 2,
  quantity: 1,
  state: "reserved",
});
cart.create({ user_id: 1, product_id: 4, quantity: 1, state: "paid" });
console.log(cart.read());
console.log(cart.readOne(1));
console.log(cart.update(1, { quantity: 7, state: "paid" }));
console.log("separador");
console.log(cart.destroy(1));
