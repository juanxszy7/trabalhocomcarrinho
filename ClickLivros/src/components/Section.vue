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
            <button class="comprar" @click="adicionarAoCarrinho(livro, $event)">Adicionar ao Carrinho</button>
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
            { titulo: "Devolta para Casa", img: "/img/livros_de_romance/devolta.jpg", preco: 34.9, descricao: "Uma emocionante jornada de volta ao lar." },
            { titulo: "Acredite", img: "/img/livros_de_romance/Romance.jpg", preco: 34.9, descricao: "Uma história de amor e coragem em um mundo dividido entre Braites e Lalulis." },
            { titulo: "My Last Night", img: "/img/livros_de_romance/Romance2.jpg", preco: 34.9, descricao: "um romance muito romântico que te deixa quentinho por dentro, com amor à flor da pele, encontros inesquecíveis e aquele sentimento aconchegante que permanece muito depois da última página." },
            { titulo: "Crush", img: "/img/livros_de_romance/Romance3.jpg", preco: 34.9, descricao: "um romance contemporâneo sobre Tati, que se muda para o Rio, reencontra seu crush da adolescência e descobre o amor enquanto trabalha em uma agência de publicidade." }
          ]
        },
        {
          nome: "Comédia",
          livros: [
            { titulo: "Capitão Cueca", img: "/img/livros_de_comedia/humor-na-literatura-infantil-uma-ferramenta-sofisticada_3.jpg", preco: 24.9, descricao: "Aventuras hilárias de dois amigos e seu super-herói favorito." },
            { titulo: "Diário de um Banana", img: "/img/livros_de_comedia/livro+diario+de+um+banana+casa+dos+horrores+jeff+kinney-0.jpg", preco: 19.9, descricao: "O cotidiano engraçado de Greg Heffley." },
            { titulo: "Era Quatro Vezes", img: "/img/livros_de_comedia/livroComedia1.jpg", preco: 27.9, descricao: "Uma comédia inesperada em quatro atos." },
            { titulo: "Piadas Ribeirinhas", img: "/img/livros_de_comedia/livroComedia2.jpg", preco: 27.9, descricao: "Piadas regionais que vão te fazer rir muito." },
            { titulo: "A Divina Comédia", img: "/img/livros_de_comedia/Comedia.jpg", preco: 27.9, descricao: "A Divina Comédia narra a jornada de Dante pelo Inferno, Purgatório e Paraíso, explorando pecado, redenção e salvação." },
            { titulo: "Melhor do Que Nos Filmes", img: "/img/livros_de_comedia/Comedia2.jpg", preco: 27.9, descricao: "Melhor do que nos filmes segue Liz, uma adolescente apaixonada por comédias românticas, que tenta viver sua própria história de amor quando seu crush de infância retorna à cidade." },
            { titulo: "A Divina Comédia", img: "/img/livros_de_comedia/Comedia3.jpg", preco: 27.9, descricao: "A Divina Comédia, de Dante Alighieri, narra a jornada de Dante pelos reinos do Inferno, Purgatório e Paraíso, explorando pecado, redenção e a busca pela salvação." }
          ]
        },
        {
          nome: "Autoajuda",
          livros: [
            { titulo: "Reinos Mágicos", img: "/img/livrosAA/livroAA1.jpg", preco: 49.9, descricao: "Descubra o poder da mente e da magia interior." },
            { titulo: "Dragões e Heróis", img: "/img/livrosAA/livroAA2.jpg", preco: 44.9, descricao: "Como enfrentar desafios e conquistar objetivos." },
            { titulo: "Feitiços e Magia", img: "/img/livrosAA/livroAA3.jpg", preco: 39.9, descricao: "Técnicas de motivação e autoconhecimento." },
            { titulo: "Crescer e Evoluir", img: "/img/livrosAA/livroAA4.jpg", preco: 39.9, descricao: "Desenvolvimento pessoal para uma vida melhor." },
            { titulo: "O Amor Não Está à Venda", img: "/img/livrosAA/AutoAjuda.jpg", preco: 39.9, descricao: "O Amor Não Está à Venda reflete sobre o Cântico dos Cânticos, explorando o amor humano e sua conexão com o divino." },
            { titulo: "Chega de Desculpas", img: "/img/livrosAA/AutoAjuda2.jpg", preco: 39.9, descricao: "Chega de Desculpas, de Téo Calvo, traz reflexões sobre autoconhecimento e mudanças, incentivando uma vida mais autêntica e sem desculpas." },
            { titulo: "Pare de Sabotar e Dê a Volta Por Cima", img: "/img/livrosAA/AutoAjuda3.png", preco: 39.9, descricao: "Pare de se sabotar e dê a volta por cima, de Flip Flippen, ensina a identificar e superar comportamentos que impedem o crescimento pessoal e profissional." }
          ]
        },
        {
          nome: "Terror",
          livros: [
            { titulo: "Noite Sombria", img: "/img/livrosTerror/livroTerror1.png", preco: 49.9, descricao: "Histórias aterrorizantes para corajosos." },
            { titulo: "Casa Assombrada", img: "/img/livrosTerror/livroTerror2.jpg", preco: 44.9, descricao: "Mistério e suspense em cada página." },
            { titulo: "Feitiços Malditos", img: "/img/livrosTerror/livroTerror3.jpg", preco: 39.9, descricao: "Sombras e terror aguardam os leitores." },
            { titulo: "A Última Vez", img: "/img/livrosTerror/livroTerror4.jpg", preco: 39.9, descricao: "Um suspense que arrepia até os mais corajosos." },
            { titulo: "O da Terra do Nunca", img: "/img/livrosTerror/Terror.jpg", preco: 39.9, descricao: "O Rei da Terra do Nunca, de Nikki St. Crowe, é uma releitura sombria e adulta de Peter Pan, com romance dark e personagens complexos." },
            { titulo: "A Noite dos Mortos Vivos", img: "/img/livrosTerror/Terror2.png", preco: 39.9, descricao: "A Noite dos Mortos-Vivos, de John Russo, é um clássico do terror sobre pessoas tentando sobreviver a uma noite cercadas por mortos-vivos em uma fazenda isolada." },
            { titulo: "O Fantasma dos Canterville", img: "/img/livrosTerror/Terror3.jpg", preco: 39.9, descricao: "O Fantasma dos Canterville e Outros Contos, de Oscar Wilde, traz histórias curtas que combinam humor, crítica social e sobrenatural." }
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
  padding: 50px 20px;
  background: #f5f6fa;
}

.categoria {
  margin-bottom: 60px;
}
.categoria h2 {
  font-size: 2.2rem;
  margin-bottom: 20px;
  color: var(--CorPrincipal);
  border-left: 5px solid var(--CorPrincipal);
  padding-left: 10px;
  font-weight: 700;
}

.cards-container {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 20px 0;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: var(--CorPrincipal) rgba(0,0,0,0.1);
}
.cards-container::-webkit-scrollbar {
  height: 8px;
}
.cards-container::-webkit-scrollbar-thumb {
  background-color: var(--CorPrincipal);
  border-radius: 10px;
}
.cards-container::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.05);
}

.card {
  flex: 0 0 220px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(145deg, #ffffff, #e6e9f0);
  cursor: pointer;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  position: relative;
  border: none;
}
.card:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.card img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  transition: transform 0.4s ease, filter 0.4s ease;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.card:hover img {
  transform: scale(1.1);
  filter: brightness(1.1);
}

.info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(26, 35, 126, 0.9), rgba(26, 35, 126, 0.7));
  color: #fff;
  text-align: center;
  padding: 15px 10px;
  transform: translateY(100%);
  opacity: 0;
  transition: all 0.4s ease;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.card:hover .info {
  transform: translateY(0);
  opacity: 1;
}

.info h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
  font-weight: 600;
}
.preco {
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 1rem;
}

.comprar {
  background: linear-gradient(45deg, #ff9800, #f57c00);
  border: none;
  padding: 8px 20px;
  border-radius: 25px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.15);
}
.comprar:hover {
  background: linear-gradient(45deg, #f57c00, #ffb74d);
  transform: scale(1.08);
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.4s ease forwards;
}
@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}

.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: 20px;
  width: 450px;
  max-width: 90%;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  transform: translateY(-50px);
  animation: modalPop 0.4s ease forwards;
}
@keyframes modalPop {
  from {opacity: 0; transform: translateY(-50px);}
  to {opacity: 1; transform: translateY(0);}
}

.modal-content img {
  width: 100%;
  height: auto;
  margin: 20px 0;
  border-radius: 15px;
  transition: transform 0.3s ease;
}
.modal-content img:hover {
  transform: scale(1.05);
}

.modal-content .descricao {
  margin-bottom: 20px;
  color: #333;
  font-size: 0.95rem;
  line-height: 1.5;
}

.modal-content .fechar {
  margin-top: 15px;
  padding: 8px 25px;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  background: #ccc;
  font-weight: 600;
  transition: all 0.3s ease;
}
.modal-content .fechar:hover {
  background: #999;
  transform: scale(1.05);
}

</style>
