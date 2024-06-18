class UserManager {
  static #user = [];

  create(data) {
    UserManager.#user.push(data);
    return data;
  }

  read() {
    return UserManager.#user;
  }
}

const usuarios = new UserManager();
usuarios.create({
  photo: "jpg",
  password: "CoderHouse",
  email: "Coderhouse@hotmail.com",
});
usuarios.create({
  photo: "coderjpg",
  password: "housecoder",
  email: "HouseCoder@hotmail.com",
});

export default usuarios
