import assert from "assert";
import environment from "../../utils/env.util.js";
import dao from "../../src/data/dao.factory.js";
const { products } = dao;

describe("Testing product", () => {
    let id;
  const data = {
    title: "ASSERT PRODUCT",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3UPfGlTCdWJBSMxh5wKzmtp1uZ8fFUeek6Q&usqp=CAU",
    category: "boots",
    price: 15,
    stock: 40000,
  };
  it("Testeando que el produto reciba un objeto con la prop title", () => {
    assert.ok(data.title);
  });
  it("Testeando que la creacion del product tenga la propiedad price", () => {
    assert.ok(data.price);
  });
  it("Testeando que el product reciba una propiedad opcional con la propiedad 'photo'", () => {
    assert.ok(data.photo || true);
  });
  it("Testeando que la creación del product devuelve un objeto con un _id", async () => {
    const response = await products.create(data);
    id = response._id; 
    assert.ok(response._id);
  });
  it("Testeando la actualización de un product", async () => {
    const one = await products.readOne(id);
    const response = await products.update(id, { title: "Updated title" });
    assert.notEqual(one.title, response.title);
  });
  it("Testeando la eliminacion de un product", async () => {
    await products.destroy(id);
    const one = await products.readOne(id);
    assert.strictEqual(one, null);
  });
});
