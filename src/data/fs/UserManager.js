import fs from "fs";
import crypto from "crypto";

/* se crea la clase UserManager */
class UserManager {
  constructor() {
    this.path = "./src/data/fs/files/users.json";
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
      /* propiedades de cada usuario */
      if (data.email && data.password) {
        let userFile = await fs.promises.readFile(this.path, "utf-8");
        userFile = JSON.parse(userFile);
        userFile.push(data);
        userFile = JSON.stringify(userFile, null, 2);

        await fs.promises.writeFile(this.path, userFile);
        return data;
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
        throw new Error("CAN NOT READ USER");
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
        throw new Error("USER NOT FOUND");
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
const iUsers = new UserManager();
async function run() {
  await iUsers.create({
    id: 1,
    email: "nachomalcorra@gmail.com",
    photo:
      "https://www.elciudadanoweb.com/wp-content/uploads/2023/10/malcorra-clasico-1-1024x683.jpg",
    password: "malcorrazo",
    role: "admin",
  });
  await iUsers.create({
    id: 2,
    email: "rubenmarco@gmail.com",
    photo:
      "https://pbs.twimg.com/profile_images/574633842151063552/hRVGICQA_400x400.png",
    password: "9deoro",
    role: "admin",
  });
  await iUsers.create({
    id: 3,
    email: "miguelo@gmail.com",
    photo:
      "https://media.lmneuquen.com/p/ca4f819231aa63f49c9dc7a995e0e6bd/adjuntos/195/imagenes/007/694/0007694301/770x0/smart/imagepng.png",
    password: "estoescentral",
    role: "admin",
  });
  await iUsers.create({
    id: 3,
    email: "quintana@gmail.com",
    photo: "https://www.cadena3.com/admin/playerswf/fotos/ARCHI_1043733.jpg",
    password: "kingtana",
    role: "user",
  });
}
/* run()  */

export default iUsers;
