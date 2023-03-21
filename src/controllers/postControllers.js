// postControllers.js

const postModel = require("../models/postModels");

const listAll = async (req, res) => {
  try {
    const produto = await postModel.listAll();
    const responseBody = JSON.stringify(produto);

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(responseBody),
    });

    res.write(responseBody);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const createProd = async (produto) => {
  try {
    const criar = await postModel.createProd(produto);
    const responseBody = JSON.stringify(criar);

    return responseBody;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};


const deleteProd = async (id, res) => {
  try {
    const result = await postModel.deleteProd(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Produto deletado com sucesso." }));
    res.end();
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Internal Server Error" }));
    res.end();
  }
};

const updateProd = async (id ,nome) => {
  const updatedProd = await postModel.updateProd(id, nome);

  if (updatedProd.affectedRows === 0) {
    throw new Error("Produto não encontrado");
  }

  return { message: "Produto atualizado com sucesso" };
}

module.exports = {
  listAll,
  createProd,
  deleteProd,
  updateProd
};
