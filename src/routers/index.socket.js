import iProducts from "../data/fs/ProductManager.js";
import iUsers from "../data/fs/UserManager.js";

export default async (socket) => {
  console.log(`Socket ID: ${socket.id}`);
  socket.emit("products", await iProducts.read());
  socket.emit("realUsers", await iUsers.read());

  socket.on("create", async (data) => {
    await iProducts.create(data);
    socket.emit("products", await iProducts.read());
  });

  socket.on("createUser", async (data) => {
    await iUsers.create(data);
    socket.emit("realUsers", await iUsers.read());
  });

  socket.on("destroy", async (data) => {
    console.log(data);
    await iProducts.destroy(data);
    socket.emit("products", await iProducts.read());
  });

  socket.on("destroyUser", async (data) => {
    await iUsers.destroy(data);
    socket.emit('realUsers', await iUsers.read())
    
  });
};
