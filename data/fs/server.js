const http = require("http");
const router = require("./files/router");

const server = http.createServer(router)
const PORT = 8080
const ready =()=> console.log('server ready on PORT ', PORT)

server.listen(PORT, ready);