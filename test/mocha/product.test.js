import assert from "assert";
import environment from '../../utils/env.util.js'
import dao from "../../src/data/dao.factory.js";
const { productsManagerMongo } = dao;

describe("Testing product", () => {
  const data = {
    title: "ASSERT PRODUCT",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3UPfGlTCdWJBSMxh5wKzmtp1uZ8fFUeek6Q&usqp=CAU",
    category: "boots",
    price: 15,
    stock: 40000,
  };
  it("Testeando que el produto reciba un objeto con la prop title", ()=> {assert.ok(data.title)});
});
