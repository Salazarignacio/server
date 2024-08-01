import { expect } from "chai";
import supertest from "supertest";
import environment from "../../utils/env.util.js";
import usersRepository from "../../src/repositories/users.rep.js";
import productsRepository from "../../src/repositories/products.rep.js";

const requester = supertest(`http://localhost:8080/api`); /* cambiar aca luego */

describe("Testeando SERVER", ()=>{
    let token = ""
    const superProduct = {
        id:1,
        title: "SUPERTEST",
        photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3UPfGlTCdWJBSMxh5wKzmtp1uZ8fFUeek6Q&usqp=CAU",
        category: "boots",
        price: 155,
        stock: 3000
      }
    const user = {
        email:"ignaciosalazar986@gmail.com",
        password: "123"
      }
    it("Inicio de sesion de un usuario", async()=>{
        const response = await requester.post("/sessions/login").send(user)
        const {_body, headers} = response
        console.log(_body, headers);
        token = headers["set-cookie"][0].split(";")[0];
        expect(_body.statusCode).to.be.equals(200)
    })
    it("Creando product con el user logueado", async ()=>{
        const response = await requester.post("/products").send(superProduct).set("Cookie", token)
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(201);
    })
    
    it("Eliminando product con el user logueado", async ()=>{
        const response = await requester.delete("/products/66aba4d98ee713cb534044e6").set("Cookie", token)
        const { _body } = response;
        expect(_body.statusCode).to.be.equals(200);
    }) 
})