<template>
  <section class="livros">
    <div v-for="(categoria, i) in categorias" :key="i" class="categoria">
      <h2>{{ categoria.nome }}</h2>
      <div class="cards-container">
        <div v-for="(livro, j) in categoria.livros" :key="j" class="card">
          <!-- Ao clicar na imagem abre modal -->
          <img :src="livro.img" :alt="livro.titulo" @click="abrirModal(livro)" />
          
          <div class="info">
            <h3>{{ livro.titulo }}</h3>
            <p class="preco">{{ formatarPreco(livro.preco) }}</p>
            <button class="comprar" @click="adicionarAoCarrinho(livro, $event)">Comprar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="modalAberto" class="modal-overlay" @click.self="fecharModal">
      <div class="modal-content">
        <h3>{{ livroModal.titulo }}</h3>
        <img :src="livroModal.img" :alt="livroModal.titulo" />
        <p class="descricao">{{ livroModal.descricao }}</p>
        <p class="preco">{{ formatarPreco(livroModal.preco) }}</p>
        <!-- Avaliação com estrelas -->
        <div class="avaliacao">
        <span v-for="estrela in 5" :key="estrela"  class="estrela" :class="{ ativa: estrela <= avaliacaoSelecionada }" @click="avaliarLivro(estrela)">★
        </span>
        </div>
        <button class="comprar" @click="adicionarAoCarrinho(livroModal, $event)">Comprar</button>
        <button class="fechar" @click="fecharModal">Fechar</button>
      </div>
    </div>
  </section>
</template>

<script>
import emitter from "../eventBus";

export default {
  name: "Livros",
  data() {
    return {
      categorias: [
        {
          nome: "Romance",
          livros: [
            { titulo: "A Culpa é das Estrelas", img: "/img/livros_de_romance/19_a_culpa_e_das_estrelas_c.jpg", preco: 39.9, descricao: "Hazel e Augustus são dois adolescentes com câncer que embarcam numa jornada cheia de amor, dor e descobertas sobre a vida e a morte." },
            { titulo: "Sonhando com Você", img: "/img/livros_de_romance/9786555655889.jpeg.170x255_q85_upscale.jpg", preco: 29.9, descricao: "Uma escritora ousada e um dono de cassino se apaixonam em meio aos perigos e seduções da Londres vitoriana." },
            { titulo: "A Serpente e as Asas Feitas de Noite", img: "/img/livros_de_romance/a-serpente-e-as-asas-feitas-de-noite.jpg", preco: 34.9, descricao: "Uma humana criada pelo rei dos vampiros entra em um torneio mortal para conquistar poder — e acaba se apaixonando por seu inimigo." },
            { titulo: "Devolta para Casa", img: "/img/livros_de_romance/devolta.jpg", preco: 34.9, descricao: "Após anos longe de casa, Cassie retorna à sua cidade natal e enfrenta segredos, reconciliações e a chance de recomeçar." },
            { titulo: "Acredite", img: "/img/livros_de_romance/Romance.jpg", preco: 34.9, descricao: "Uma jovem mágica que desafia as regras ao amar alguém de outro povo. É uma fábula sobre amor, coragem e acreditar em si mesmo.  " },
            { titulo: "My Last Night", img: "/img/livros_de_romance/Romance2.jpg", preco: 34.9, descricao: "Romance muito romântico que te deixa quentinho por dentro, com amor à flor da pele, encontros inesquecíveis e aquele sentimento aconchegante que permanece muito depois da última página." },
            { titulo: "Crush", img: "/img/livros_de_romance/Romance3.jpg", preco: 34.9, descricao: "Conta a história de Tati, que tenta recomeçar a vida e reencontra um antigo amor enquanto testa um app de namoro." }
          ]
        },
        {
          nome: "Comédia",
          livros: [
            { titulo: "Capitão Cueca", img: "/img/livros_de_comedia/humor-na-literatura-infantil-uma-ferramenta-sofisticada_3.jpg", preco: 24.9, descricao: "Duas crianças travessas criam um super-herói engraçado e enfrentam muitas confusões e risadas." },
            { titulo: "Diário de um Banana", img: "/img/livros_de_comedia/livro+diario+de+um+banana+casa+dos+horrores+jeff+kinney-0.jpg", preco: 19.9, descricao: "Greg Heffley enfrenta situações engraçadas e assustadoras enquanto tenta sobreviver a uma casa cheia de desafios e sustos." },
            { titulo: "Era Quatro Vezes", img: "/img/livros_de_comedia/livroComedia1.jpg", preco: 27.9, descricao: "Uma comédia divertida que narra quatro histórias diferentes, cheias de humor e situações inesperadas." },
            { titulo: "Piadas Ribeirinhas", img: "/img/livros_de_comedia/livroComedia2.jpg", preco: 27.9, descricao: "Uma coletânea de piadas típicas das regiões ribeirinhas, com muito humor regional e personagens caricatos que vão garantir boas risadas." },
            { titulo: "A Divina Comédia", img: "/img/livros_de_comedia/Comedia.jpg", preco: 27.9, descricao: "É a jornada de Dante pelo Inferno, Purgatório e Paraíso em busca de redenção." },
            { titulo: "Melhor do Que Nos Filmes", img: "/img/livros_de_comedia/Comedia2.jpg", preco: 27.9, descricao: "É sobre Liz, que tenta conquistar seu crush com a ajuda do vizinho... e acaba descobrindo o amor onde menos esperava." },
            { titulo: "A Divina Comédia", img: "/img/livros_de_comedia/Comedia3.jpg", preco: 27.9, descricao: "Narra a viagem de Dante pelos três reinos do além — Inferno, Purgatório e Paraíso — guiado por Virgílio e Beatriz, em busca de redenção e iluminação espiritual.0" }
          ]
        },
        {
          nome: "Autoajuda",
          livros: [
            { titulo: "Reinos Mágicos", img: "/img/livrosAA/livroAA1.jpg", preco: 49.9, descricao: "Uma jornada inspiradora por mundos encantados que despertam o poder interior, a imaginação e a autodescoberta." },
            { titulo: "Dragões e Heróis", img: "/img/livrosAA/livroAA2.jpg", preco: 44.9, descricao: "Uma história envolvente sobre coragem, superação e a força necessária para enfrentar grandes desafios." },
            { titulo: "Feitiços e Magia", img: "/img/livrosAA/livroAA3.jpg", preco: 39.9, descricao: "Descubra técnicas de autoconhecimento e transforme sua vida com sabedoria e poder interior." },
            { titulo: "Crescer e Evoluir", img: "/img/livrosAA/livroAA4.jpg", preco: 39.9, descricao: "Um guia prático de desenvolvimento pessoal para alcançar equilíbrio, propósito e evolução constante." },
            { titulo: "O Amor Não Está à Venda", img: "/img/livrosAA/AutoAjuda.jpg", preco: 39.9, descricao: "É uma reflexão sobre o amor verdadeiro, explorando desejo, liberdade e espiritualidade." },
            { titulo: "Chega de Desculpas", img: "/img/livrosAA/AutoAjuda2.jpg", preco: 39.9, descricao: "Incentiva mulheres a superarem medos e buscarem seus sonhos com coragem." },
            { titulo: "Pare de Sabotar e Dê a Volta Por Cima", img: "/img/livrosAA/AutoAjuda3.png", preco: 39.9, descricao: "Ajuda a identificar e superar padrões de autossabotagem, oferecendo estratégias práticas para alcançar o sucesso pessoal e profissional." }
          ]
        },
        {
          nome: "Terror",
          livros: [
            { titulo: "Noite Sombria", img: "/img/livrosTerror/livroTerror1.png", preco: 49.9, descricao: "Histórias sombrias e intensas que testam os limites da coragem em noites repletas de mistério e terror." },
            { titulo: "Casa Assombrada", img: "/img/livrosTerror/livroTerror2.jpg", preco: 44.9, descricao: "Mistérios e fenômenos sobrenaturais envolvem uma casa onde nada é o que parece." },
            { titulo: "Feitiços Malditos", img: "/img/livrosTerror/livroTerror3.jpg", preco: 39.9, descricao: "Antigos feitiços despertam forças sombrias que colocam todos em perigo." },
            { titulo: "A Última Vez", img: "/img/livrosTerror/livroTerror4.jpg", preco: 39.9, descricao: "Um suspense envolvente onde cada escolha pode ser a última." },
            { titulo: "O da Terra do Nunca", img: "/img/livrosTerror/Terror.jpg", preco: 39.9, descricao: "É uma releitura sombria e sensual de Peter Pan, onde Winnie Darling é levada para a Terra do Nunca aos 18 anos e se vê envolvida com Peter e os Garotos Perdidos em um jogo de poder e desejo." },
            { titulo: "A Noite dos Mortos Vivos", img: "/img/livrosTerror/Terror2.png", preco: 39.9, descricao: " Acompanha um grupo tentando sobreviver a um apocalipse zumbi dentro de uma casa isolada." },
            { titulo: "O Fantasma dos Canterville", img: "/img/livrosTerror/Terror3.jpg", preco: 39.9, descricao: "É uma história divertida sobre um fantasma que não consegue assustar uma família moderna." }
          ]
        },
      ],
      modalAberto: false,
      avaliacaoSelecionada: 0,
      avaliacoes: {}, // { 'A Culpa é das Estrelas': 5, ... }
      livroModal: {}
    };
  },
  methods: {
  avaliarLivro(estrela) {
    this.avaliacaoSelecionada = estrela;
    this.$set(this.avaliacoes, this.livroModal.titulo, estrela);
  },
  abrirModal(livro) {
    this.livroModal = livro;
    this.modalAberto = true;
    this.avaliacaoSelecionada = this.avaliacoes[livro.titulo] || 0;
  },
  fecharModal() {
    this.modalAberto = false;
  },
  adicionarAoCarrinho(livro, event) {
    emitter.emit("add-to-cart", livro, event);
  },
  formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
}

};
</script>

<style scoped>
.avaliacao-card {
  margin-top: 5px;
}
.avaliacao {
  margin: 10px 0;
}
.estrela {
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
}
.estrela.ativa {
  color: #ffcc00;
}
/* ===== Estrutura principal ===== */
.livros {
  padding: 40px 20px;
  background: #f9fafc; /* fundo mais clean */
  font-family: "Inter", sans-serif;
}

.categoria {
  margin-bottom: 60px;
}
.categoria h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--CorPrincipal);
  font-weight: 700;
  position: relative;
  border-left: 5px solid var(--CorPrincipal);
  border-radius: 5px;
  padding-left: 10px;
}
/* ===== Cards ===== */
.cards-container {
  display: flex;
  overflow-x: auto;
  gap: 24px;
  padding: 20px 0;
  scroll-behavior: smooth;
}
.cards-container::-webkit-scrollbar {
  height: 6px;
}
.cards-container::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff9800, #f57c00);
  border-radius: 10px;
}

/* Card */
.card {
  flex: 0 0 220px;
  border-radius: 18px;
  background: #fff;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  position: relative;
}
.card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 16px 30px rgba(0,0,0,0.15);
}
.card img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.card:hover img {
  transform: scale(1.08);
}
/* Info dentro do card */
.info {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(26,35,126,0.95), rgba(26,35,126,0.6));
  padding: 15px;
  text-align: center;
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.3s ease;
}
.card:hover .info {
  transform: translateY(0);
  opacity: 1;
}
.info h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 6px;
}
.preco {
  font-size: 0.95rem;
  font-weight: bold;
  color: #ffcc80;
  margin-bottom: 10px;
}
.comprar {
  background: linear-gradient(45deg, #ff9800, #f57c00);
  border: none;
  padding: 8px 20px;
  border-radius: 25px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 1s ease;
}
.comprar:hover {
  transform: scale(1.08);
  background: linear-gradient(45deg, #f57c00, #ffb74d);
}
/* ===== Modal ===== */
.modal-overlay {
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: #fff;
  padding: 24px;
  border-radius: 18px;
  width: 360px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.25);
  animation: modalPop 0.35s ease;
}
@keyframes modalPop {
  from { opacity: 0; transform: translateY(-40px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.modal-content h3 {
  margin-bottom: 10px;
  color: #1a237e;
  font-size: 1.2rem;
}
.modal-content img {
  width: 85%;
  max-height: 220px;
  object-fit: contain;
  margin: 15px auto;
  border-radius: 10px;
}
.modal-content .descricao {
  font-size: 0.95rem;
  margin-bottom: 10px;
  color: #555;
}
.modal-content .preco {
  font-size: 1.1rem;
  font-weight: bold;
  color: #f57c00;
  margin-bottom: 12px;
}
.avaliacao {
  margin: 12px 0;
}
.estrela {
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
}
.estrela.ativa {
  color: #ffcc00;
}
.modal-content .fechar {
  margin-top: 12px;
  padding: 6px 18px;
  border-radius: 25px;
  border: none;
  background: #e0e0e0;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}
.modal-content .fechar:hover {
  background: #bdbdbd;
}
.avaliacao-info {
  font-size: 0.85rem; /* menor */
  color: #666;
  margin-top: 4px;
}
</style>
