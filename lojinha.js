// Substitua pelo seu número com DDD (ex: 5582999999999)
const SEU_WHATSAPP = "55082991595924";

const produtos = [
  {
    id: "teresinha",
    nome: "Santa Teresinha",
    tituloDetalhe: "Santa Teresinha e as crianças",
    imagem: "modelo-teresinha.jpg", 
    descricao: "Santa Teresinha do Menino Jesus nos ensina que a verdadeira santidade não exige grandes feitos, mas sim o abandono confiante nos braços de Deus, exatamente como faz uma criança no colo de seus pais. Ao viver a sua 'Pequena Via', ela mostrou que o amor puro, a simplicidade e a humildade são os caminhos mais curtos para o Céu."
  },
  {
    id: "jose",
    nome: "São José",
    tituloDetalhe: "São José e as crianças",
    imagem: "modelo-jose.jpg", 
    descricao: "São José, o protetor da Sagrada Família, ensina nossas crianças o valor do cuidado, da proteção e da simplicidade. Como pai adotivo de Jesus, ele exemplifica o amor paciente e dedicado que acolhe e guia os pequenos no caminho da fé."
  },
  {
    id: "jesus-azul",
    nome: "Jesus e Maria (Azul)",
    tituloDetalhe: "Jesus, Maria e as crianças",
    imagem: "modelo-jesus-azul.png",
    descricao: "Sob o olhar amoroso de Nossa Senhora e o abraço acolhedor de Jesus, nossas crianças aprendem que Deus caminha ao lado delas em cada momento, enchendo seus corações de paz e alegria."
  },
  {
    id: "jesus-rosa",
    nome: "Jesus e Maria (Rosa)",
    tituloDetalhe: "Jesus, Maria e as crianças",
    imagem: "modelo-jesus-rosa.png",
    descricao: "Jesus é nosso Bom Pastor e conduz nossas crianças com doçura e amor. Esta estampa celebra a pureza dos pequenos sob a proteção maternal de Maria Santíssima."
  },
  {
    id: "aparecida",
    nome: "Nsa Senhora Aparecida",
    tituloDetalhe: "Nossa Senhora Aparecida e as crianças",
    imagem: "modelo-aparecida.png",
    descricao: "A Mãe Aparecida acolhe todas as crianças sob o seu manto sagrado, cobrindo-as de bênçãos, proteção e carinho maternal na caminhada da fé."
  }
];

let carrinho = [];
let produtoSelecionado = null;

// Renderizar produtos na Pagina 1
function carregarVitrine() {
  const container = document.getElementById("grid-produtos");
  container.innerHTML = "";

  produtos.forEach(prod => {
    container.innerHTML += `
      <div class="card-item">
        <img src="${prod.imagem}" alt="${prod.nome}" onclick="abrirDetalhes('${prod.id}')">
        <button class="btn-modelo" onclick="abrirDetalhes('${prod.id}')">${prod.nome}</button>
      </div>
    `;
  });
}

function navegarPara(idPagina) {
  document.querySelectorAll(".pagina-lojinha").forEach(p => p.classList.remove("ativa"));
  document.getElementById(idPagina).classList.add("ativa");
}

function abrirDetalhes(idProduto) {
  produtoSelecionado = produtos.find(p => p.id === idProduto);
  if (!produtoSelecionado) return;

  document.getElementById("detalhe-titulo").innerText = produtoSelecionado.tituloDetalhe;
  document.getElementById("detalhe-img").src = produtoSelecionado.imagem;
  document.getElementById("detalhe-texto").innerText = produtoSelecionado.descricao;

  navegarPara("pag-2");
}

function adicionarAtualAoCarrinho() {
  if (produtoSelecionado) {
    carrinho.push(produtoSelecionado);
    atualizarCarrinho();
    navegarPara("pag-3");
  }
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  document.getElementById("qtd-carrinho").innerText = carrinho.length;
  const listContainer = document.getElementById("lista-carrinho");
  listContainer.innerHTML = "";

  if (carrinho.length === 0) {
    listContainer.innerHTML = "<p class='carrinho-vazio'>Seu carrinho está vazio.</p>";
  } else {
    carrinho.forEach((prod, index) => {
      listContainer.innerHTML += `
        <div class="item-carrinho">
          <span>${prod.nome} - R$ 50,00</span>
          <button onclick="removerDoCarrinho(${index})">❌</button>
        </div>
      `;
    });
  }

  const total = carrinho.length * 50;
  document.getElementById("total-carrinho").innerText = `Total: R$ ${total},00`;
}

function finalizarPedidoWhatsapp() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Gostaria de encomendar as seguintes camisetas da Pastoral da Recreação:\n\n";
  carrinho.forEach((prod, i) => {
    mensagem += `${i + 1}. Camiseta: ${prod.nome} (R$ 50,00)\n`;
  });
  
  const total = carrinho.length * 50;
  mensagem += `\n*Total:* R$ ${total},00\n\nComo posso prosseguir com o pagamento e entrega?`;

  const link = `https://wa.me/${SEU_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}

// Inicialização
carregarVitrine();
atualizarCarrinho();