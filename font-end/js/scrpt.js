const { deleteProd, updateProd } = require("../../back-end/src/models/postModels");

const tbody = document.querySelector("tbody");
const addForm = document.querySelector(".add-form");
const inputProd = document.querySelector(".input-prod");

const fetchProd = async () => {
  const response = await fetch("http://localhost:3000/produto");
  const acharProd = await response.json();
  return acharProd;
};

const addProd = async (event) => {
  event.preventDefault();

  const produto = { nome: inputProd.value };

  await fetch("http://localhost:3000/produto", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(produto),
  });
  
  // limpar o campo de input após adicionar o produto
  inputProd.value = "";
  
  loadProd();
};

const createElement = (tag, innerText = "", innerHtml = "") => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }
  if (innerHtml) {
    element.innerHtml = innerHtml;
  }
  return element;
};

const createRow = (produto) => {
  const { id, nome } = produto;

  const tr = createElement("tr");
  const tdProdutos = createElement("td", nome);
  const tdAction = createElement("td");

  const editButton = createElement("button", "Edit");
  const deleteButton = createElement("button", "Delete");

  editButton.classList.add("btn-action");
  deleteButton.classList.add("btn-action");

  tdAction.appendChild(editButton);
  tdAction.appendChild(deleteButton);

  tr.appendChild(tdProdutos);
  tr.appendChild(tdAction);

  //Botões de deletar e editar 
  editInput.value =nome;
  editForm.appendChild(editInput);
  
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
  
    updateProd({id, title: editInput.value});
  });
  
  editButton.addEventListener("click", () => {
    tdTitle.innerText = "";
    tdTitle.appendChild(editForm);
  });
  
  editButton.classList.add("btn-action");
  deleteButton.classList.add("btn-action");
  
  deleteButton.addEventListener("click", () => deleteProd(id));

  return tr;
  
};

const loadProd = async () => {
    const produtos = await fetchProd();
  
    // limpar linhas anteriores da tabela
    tbody.innerHTML = "";
  
    // criar uma linha na tabela para cada produto
    produtos.forEach((produto) => {
      const tr = createRow(produto);
      tbody.appendChild(tr);
    });
   
  };

/*
document.addEventListener("DOMContentLoaded", () => {
  createRow(produto);
});
*/

addForm.addEventListener("submit", addProd);
createRow()
loadProd();