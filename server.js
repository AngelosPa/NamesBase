require("dotenv").config();
const http = require("http");
const app = require("./app");
// to create a server with a port number 5000
const PORT = process.env.PORT || 5002;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`now Server is listening on http://localhost:${PORT}`);
});
