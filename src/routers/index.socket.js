import iProducts from "../data/fs/ProductManager.js";
import iUsers from "../data/fs/UserManager.js";
import { socketServer } from "../../server.js";
let messages = [];

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
    socket.emit("realUsers", await iUsers.read());
  });

  /* chat */
  socket.on("chatUser", async (user) => {
    if (messages.length >= 20) {
      messages.shift();
    }
    messages.push(
      `<p class="py-1"><span class="fw-bolder text-${user.color}">${user.nickname}</span> is online</p>`
    );
    socketServer.emit("messages", messages);
  });
  socket.on("all messages", (allMessages) => {
    messages = allMessages;
    socketServer.emit("messages", messages);
  });
};
