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
            { titulo: "A Culpa é das Estrelas", img: "/img/livros_de_romance/19_a_culpa_e_das_estrelas_c.jpg", preco: 39.9, descricao: "Dois jovens se apaixonam enquanto enfrentam doenças graves." },
            { titulo: "Sonhando com Você", img: "/img/livros_de_romance/9786555655889.jpeg.170x255_q85_upscale.jpg", preco: 29.9, descricao: "Uma história de amor e superação." },
            { titulo: "A Serpente e as Asas Feitas de Noite", img: "/img/livros_de_romance/a-serpente-e-as-asas-feitas-de-noite.jpg", preco: 34.9, descricao: "Romance envolvente cheio de mistério e paixão." },
            { titulo: "Devolta para Casa", img: "/img/livros_de_romance/devolta.jpg", preco: 34.9, descricao: "Uma emocionante jornada de volta ao lar." }
          ]
        },
        {
          nome: "Comédia",
          livros: [
            { titulo: "Capitão Cueca", img: "/img/livros_de_comedia/humor-na-literatura-infantil-uma-ferramenta-sofisticada_3.jpg", preco: 24.9, descricao: "Aventuras hilárias de dois amigos e seu super-herói favorito." },
            { titulo: "Diário de um Banana", img: "/img/livros_de_comedia/livro+diario+de+um+banana+casa+dos+horrores+jeff+kinney-0.jpg", preco: 19.9, descricao: "O cotidiano engraçado de Greg Heffley." },
            { titulo: "Era Quatro Vezes", img: "/img/livros_de_comedia/livroComedia1.jpg", preco: 27.9, descricao: "Uma comédia inesperada em quatro atos." },
            { titulo: "Piadas Ribeirinhas", img: "/img/livros_de_comedia/livroComedia2.jpg", preco: 27.9, descricao: "Piadas regionais que vão te fazer rir muito." }
          ]
        },
        {
          nome: "Autoajuda",
          livros: [
            { titulo: "Reinos Mágicos", img: "/img/livrosAA/livroAA1.jpg", preco: 49.9, descricao: "Descubra o poder da mente e da magia interior." },
            { titulo: "Dragões e Heróis", img: "/img/livrosAA/livroAA2.jpg", preco: 44.9, descricao: "Como enfrentar desafios e conquistar objetivos." },
            { titulo: "Feitiços e Magia", img: "/img/livrosAA/livroAA3.jpg", preco: 39.9, descricao: "Técnicas de motivação e autoconhecimento." },
            { titulo: "Crescer e Evoluir", img: "/img/livrosAA/livroAA4.jpg", preco: 39.9, descricao: "Desenvolvimento pessoal para uma vida melhor." }
          ]
        },
        {
          nome: "Terror",
          livros: [
            { titulo: "Noite Sombria", img: "/img/livrosTerror/livroTerror1.png", preco: 49.9, descricao: "Histórias aterrorizantes para corajosos." },
            { titulo: "Casa Assombrada", img: "/img/livrosTerror/livroTerror2.jpg", preco: 44.9, descricao: "Mistério e suspense em cada página." },
            { titulo: "Feitiços Malditos", img: "/img/livrosTerror/livroTerror3.jpg", preco: 39.9, descricao: "Sombras e terror aguardam os leitores." },
            { titulo: "A Última Vez", img: "/img/livrosTerror/livroTerror4.jpg", preco: 39.9, descricao: "Um suspense que arrepia até os mais corajosos." }
          ]
        },
      ],
      modalAberto: false,
      livroModal: {}
    };
  },
  methods: {
    abrirModal(livro) {
      this.livroModal = livro;
      this.modalAberto = true;
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
.livros {
  padding: 40px 20px;
}
.categoria {
  margin-bottom: 50px;
}
.categoria h2 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: var(--CorPrincipal);
}
.cards-container {
  display: flex;
  overflow-x: auto;
  justify-content: space-between;
  padding: 20px;
  scroll-behavior: smooth;
}
.cards-container::-webkit-scrollbar {
  height: 8px;
}
.cards-container::-webkit-scrollbar-thumb {
  background-color: var(--CorPrincipal);
  border-radius: 4px;
}
.card {
  flex: 0 0 200px;
  border-radius: 15px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid var(--CorPrincipal);
}
.card:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}
.card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}
.card:hover img {
  transform: scale(1.08);
}
.info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(26, 35, 126, 0.85);
  color: #fff;
  text-align: center;
  padding: 10px 5px;
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
  margin: 0 0 5px 0;
}
.preco {
  font-weight: bold;
  margin: 0 0 10px 0;
}
.comprar {
  background: #ff9800;
  border: none;
  padding: 5px 15px;
  border-radius: 20px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}
.comprar:hover {
  background: #e68a00;
  transform: scale(1.05);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  text-align: center;
}
.modal-content img {
  width: 100%;
  height: auto;
  margin: 15px 0;
  border-radius: 5px;
}
.modal-content .descricao {
  margin-bottom: 15px;
  color: #333;
}
.modal-content .fechar {
  margin-top: 10px;
  padding: 5px 15px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background: #ccc;
  transition: all 0.3s ease;
}
.modal-content .fechar:hover {
  background: #999;
}
</style>
