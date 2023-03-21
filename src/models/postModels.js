const connection = require("./conection");

const listAll = async () => {
  const [produto] = await connection.execute("SELECT * FROM produto");
  return produto;
};

const createProd = async (produto) => {
  if (!produto || !produto.nome) {
    return null ; // Retorna um valor nulo ou uma mensagem de erro adequada
  }

  const { nome } = produto;

  const query = "INSERT INTO produto(nome) VALUES (?)";

  const createdProd = await connection.execute(query, [nome]);

  return {isertId:createdProd.isertId};
};

const deleteProd = async (id) => {
  const removeProd = await connection.execute("DELETE FROM produto WHERE id = ?", [id]);
  return removeProd;
};

const updateProd = async (id, nome) => {
  const updateProd = await connection.execute("UPDATE produto SET nome = ? WHERE id = ?", [nome, id]);
 
  return updateProd;
};
module.exports = {
  listAll,
  createProd,
  deleteProd,
  updateProd
};