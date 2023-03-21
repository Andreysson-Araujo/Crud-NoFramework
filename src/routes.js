const postController = require("./controllers/postControllers");


function router(req, res) {
  if (req.method === "GET" && req.url === "/produto") {
    return postController.listAll(req, res);
  } else if (req.method === "POST" && req.url === "/produto") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      try {
        const produto = JSON.parse(body);
        const result = await postController.createProd(produto);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(result));
        res.end();
      } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Internal Server Error" }));
        res.end();
      }
    });
  } else if (req.method === "DELETE" && req.url.startsWith("/produto/")) {
    const id = req.url.split("/")[2];
    postController
      .deleteProd(id)
      .then(() => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Produto deletado com sucesso." }));
        res.end();
      })
      .catch((error) => {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Internal Server Error" }));
        res.end();
      });
  } else if (req.method === "PUT" && req.url.startsWith("/produto/")) {
    const id = req.url.split("/")[2];

    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const produtoAtualizado = JSON.parse(body);
        const produto = await postController.updateProd(id, produtoAtualizado.nome);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(produto));
        res.end();
      } catch (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Internal Server Error" }));
        res.end();
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Page not found" }));
    res.end();
  }
}


module.exports = router;
