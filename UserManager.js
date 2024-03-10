class UserManager {
  static #user = [];

  create(data) {
    const user = {
      id: UserManager.#user.length === 0
        ? 1
        : UserManager.#user[UserManager.#user.length - 1].id + 1,
      password: data.password,
      photo: data.photo,
      role: 0,
      email: data.email,
    };
    UserManager.#user.push(user);
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

console.log(usuarios.read());
