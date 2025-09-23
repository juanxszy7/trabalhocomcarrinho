<template>
  <p class="anuncio">
    <transition name="fade" mode="out-in">
      <span :key="anuncio">{{ anuncio }}</span>
    </transition>
  </p>
</template>

<script>
export default {
  name: "Anuncio",
  data() {
    return {
      mensagens: [
        "5% de Cashback em todas as categorias",
        "20% OFF com o cupom CLICKLIVROS20 no pix parcelado",
        "Parcele em até 6x sem juros",
        "Em compras acima de R$50,00 ganhe 10% de desconto"
      ],
      anuncio: "",
      indice: 0
    };
  },
  created() {
    this.anuncio = this.mensagens[this.indice];

    setInterval(() => {
      this.indice = (this.indice + 1) % this.mensagens.length;
      this.anuncio = this.mensagens[this.indice];
    }, 3000);
  }
};
</script>

<style scoped>
.anuncio {
  background-color: var(--CorPrincipal);
  color: white;
  text-align: center;
  padding: 20px;
  font-weight: bold;
  border-bottom: 3px solid white;
}

/* Fade suave */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
