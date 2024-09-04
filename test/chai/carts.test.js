import { expect } from "chai";
import environment from "../../utils/env.util.js";
import dao from "../../src/data/dao.factory.js";

const { carts } = dao;

describe("testing", () => {
  let id;
  const data = {
    user_id: "667b3772802ca3bea0430100",
    product_id: "00eed056947d19e0da274262",
    quantity: 1,
    state: "reserved",
  };
  it("Testeando que el objeto recibido tenga la propiedad 'product_id'", () => {
    expect(data).to.have.property("product_id");
  });
  it("Testeando que el objeto tenga la propiedad 'quantity'", () => {
    expect(data).to.have.property("quantity");
  });
  it("Testeando que la propiedad 'product_id' sea un objeto", () => {
    
    expect(data.title).to.be.a("object");
  });
  it("Testeando que la propiedad 'quantity' sea un number", () => {
    expect(data.price).to.be.a("number");
  });
  it("Testeando que la creacion de un cart devuelva una propiedad '_id'", async () => {
    const response = await carts.create(data);
    id = response._id;
    expect(response).to.have.property("_id");
  });
  it("Testeando la actualizacion del cart", async () => {
    const response = await carts.readOne(id);
    const update = await carts.update(id, { title: "modificado en chai" });
    expect(response.title).is.not.equal(update.title);
  });
  it("Testeando la eliminacion de un product", async () => {
    await carts.destroy(id);
    const one = await carts.readOne(id);

    expect(one).not.exist;
  });
});
