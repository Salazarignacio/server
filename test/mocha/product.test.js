import assert from "assert";
import dao from "../../src/data/dao.factory.js";
import environment from "../../utils/env.util.js";
import dbConnect from "../../src/utils/dbConect.util.js";
const {productsManagerMongo} = dao

dbConnect()

describe(
    'Testing product', ()=>{
        const data = {
            
            title: "ASSERT PRODUCT",
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3UPfGlTCdWJBSMxh5wKzmtp1uZ8fFUeek6Q&usqp=CAU",
            category: "boots",
            price: 15,
            stock: 40000
          }
        it('Testeando que data el objeto tenga un title', assert.ok(data.title))
    }
)