import iProducts from "../data/fs/ProductManager.js";

export default async (socket) => {
  console.log(`Socket ID: ${socket.id}`);
  socket.emit('products',await iProducts.read())
};
