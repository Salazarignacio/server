import iProducts from "../data/fs/ProductManager.js";

export default async (socket) => {
  console.log(`Socket ID: ${socket.id}`);
  socket.emit('products',await iProducts.read())
  socket.emit('real',await iProducts.read())

  socket.on("create", async (data) => {
    
    await iProducts.create(data);
    socket.emit("products", await iProducts.read());
  });
  
  socket.on('destroy', async (data) => {
    console.log(data); 
     await iProducts.destroy(data);  
    socket.emit('products', await iProducts.read());
});
};
