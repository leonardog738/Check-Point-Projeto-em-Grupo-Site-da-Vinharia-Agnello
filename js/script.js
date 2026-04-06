document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("pesquisa");
  const filtroCategoria = document.getElementById("tipo");
  const produtos = document.querySelectorAll(".produto");
  const notFoundArea = document.getElementById("not-found"); 

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function filtrarProdutos() {
    const busca = normalizar(searchInput.value);
    const categoria = normalizar(filtroCategoria.value);
    
    let produtosVisiveis = 0; 

    produtos.forEach((produto) => {
      const textoProduto = normalizar(produto.innerText);
      let tipo = "";

      if (textoProduto.includes("tinto")) tipo = "tinto";
      if (textoProduto.includes("rose")) tipo = "rose";
      if (textoProduto.includes("branco")) tipo = "branco";
      if (textoProduto.includes("espumante")) tipo = "espumante";

      const matchBusca = textoProduto.includes(busca);
      const matchCategoria = categoria === "" || tipo === categoria;

      if (matchBusca && matchCategoria) {
        produto.style.display = "flex";
        produtosVisiveis++;
      } else {
        produto.style.display = "none";
      }
    });

    
    if (produtosVisiveis === 0) {
      notFoundArea.style.display = "block";
    } else {
      notFoundArea.style.display = "none";
    }
  }

 
  window.limparFiltros = () => {
    searchInput.value = "";
    filtroCategoria.value = "";
    filtrarProdutos(); 
  };

  searchInput.addEventListener("input", filtrarProdutos);
  filtroCategoria.addEventListener("change", filtrarProdutos);
});