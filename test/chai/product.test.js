import { expect } from "chai";
import environment from "../../utils/env.util.js";
import dao from "../../src/data/dao.factory.js";

const { products } = dao;

describe("testing", () => {
  let id;
  const data = {
    title: "CHAI PRODUCT",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3UPfGlTCdWJBSMxh5wKzmtp1uZ8fFUeek6Q&usqp=CAU",
    category: "boots",
    price: 15,
    stock: 40000,
  };
  it("Testeando que el objeto recibido tenga la propiedad 'title'", () => {
    expect(data).to.have.property("title");
  });
  it("Testeando que el objeto tenga la propiedad 'price'", () => {
    expect(data).to.have.property("price");
  });
  it("Testeando que la propiedad 'title' sea un string", () => {
    expect(data.title).to.be.a("string");
  });
  it("Testeando que la propiedad 'price' sea un string", () => {
    expect(data.price).to.be.a("number");
  });
  it("Testeando que la creacion de un product devuelva una propiedad '_id'", async () => {
    const response = await products.create(data);
    id = response._id;
    expect(response).to.have.property("_id");
  });
  it("Testeando la actualizacion de una mascota", async () => {
    const response = await products.readOne(id);
    const update = await products.update(id, { title: "modificado en chai" });
    expect(response.title).is.not.equal(update.title);
  });
  it("Testeando la eliminacion de una mascota", async () => {
    await products.destroy(id);
    const one = await products.readOne(id);

    expect(one).not.exist;
  });
});
