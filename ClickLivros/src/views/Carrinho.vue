<template>
  <section class="carrinho">
    <h2>🛒 Meu Carrinho</h2>

    <div v-if="carrinho.length === 0">
      <p>Seu carrinho está vazio.</p>
    </div>

    <div v-else class="lista-carrinho">
      <div v-for="(item, i) in carrinho" :key="i" class="item">
        <img :src="item.img" :alt="item.titulo" />
        <div class="info">
          <h3>{{ item.titulo }}</h3>
          <p>{{ item.preco }}</p>
          <p>Quantidade: {{ item.quantidade }}</p>
          <button @click="removerItem(i)">Remover</button>
        </div>
      </div>

      <h3 class="total">Total: {{ calcularTotal }}</h3>
    </div>
  </section>
</template>

<script>
export default {
  name: "Carrinho",
  data() {
    return {
      carrinho: []
    };
  },
  mounted() {
    // Carrega o carrinho do localStorage
    const itens = localStorage.getItem("carrinho");
    if (itens) {
      this.carrinho = JSON.parse(itens);
    }
  },
  computed: {
    calcularTotal() {
      return this.carrinho
        .reduce((acc, item) => {
          const preco = parseFloat(item.preco.replace("R$", "").replace(",", "."));
          return acc + preco * item.quantidade;
        }, 0)
        .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
  },
  methods: {
    removerItem(index) {
      this.carrinho.splice(index, 1);
      localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
    }
  }
};
</script>

<style scoped>
.carrinho {
  padding: 30px;
}
.lista-carrinho {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.item {
  display: flex;
  gap: 15px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
.item img {
  width: 100px;
  height: 140px;
  object-fit: cover;
}
.total {
  margin-top: 20px;
  font-size: 1.3rem;
  color: var(--CorPrincipal);
}
button {
  background: #ff9800;
  border: none;
  padding: 5px 15px;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background: #e68a00;
}
</style>
