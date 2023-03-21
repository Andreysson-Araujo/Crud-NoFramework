const http = require('http');
const router = require("./routes");
const { URL } = require("url");


const server = http.createServer((req, res) => {
  // Define a política de origem permitida
  const allowedOrigins = ["http://localhost:3000","http://localhost:3000/produto" ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Define os cabeçalhos permitidos
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Define os métodos HTTP permitidos
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTION");

  router(req, res);
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
