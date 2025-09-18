<template>
  <div class="cart-wrapper">
    <!-- Ícone do carrinho -->
    <div class="cart-icon" @click="toggleCart" ref="cartIcon">
      <i class="bi bi-cart3"></i>
      <span v-if="items.length" class="badge">{{ items.reduce((acc, item) => acc + item.quantidade, 0) }}</span>
    </div>

    <!-- Elemento animado temporário -->
    <div v-if="flyItem.show" class="fly-item" :style="flyItem.style">
      <img :src="flyItem.img" />
    </div>

    <!-- Carrinho lateral -->
    <div class="cart-sidebar" :class="{ open: isOpen }">
      <div class="cart-header">
        <h3>Meu Carrinho</h3>
        <button class="close-btn" @click="toggleCart">✖</button>
      </div>

      <div v-if="items.length" class="cart-items">
        <div v-for="(item, index) in items" :key="index" class="cart-item">
          <img :src="item.img" :alt="item.titulo" />
          <div class="info">
            <h4>{{ item.titulo }}</h4>
            <p class="preco">{{ formatarPreco(item.preco) }}</p>

            <div class="quantidade">
              <button @click="diminuirQuantidade(index)">-</button>
              <span>{{ item.quantidade }}</span>
              <button @click="aumentarQuantidade(index)">+</button>
            </div>
          </div>
          <button class="remove-btn" @click="removerItem(index)">🗑</button>
        </div>

        <div class="cart-footer">
          <h4>Total: {{ formatarPreco(total) }}</h4>
        </div>
      </div>

      <div v-else class="empty-cart">
        <p>Seu carrinho está vazio.</p>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from "../eventBus";

export default {
  name: "Cart",
  data() {
    return {
      isOpen: false,
      items: [],
      flyItem: {
        show: false,
        img: "",
        style: {}
      }
    };
  },
  computed: {
    total() {
      if (this.items.reduce((acc, item) => acc + item.preco * item.quantidade, 0) >= 70) {
        return this.items.reduce((acc, item) => acc + item.preco * item.quantidade, 0) - (10 * this.items.reduce((acc, item) => acc + item.preco * item.quantidade, 0))/100 
      }else{
        return this.items.reduce((acc, item) => acc + item.preco * item.quantidade, 0)
      }
    }
  },
  methods: {
    toggleCart() {
      this.isOpen = !this.isOpen;
    },
    aumentarQuantidade(index) {
      this.items[index].quantidade++;
    },
    diminuirQuantidade(index) {
      if (this.items[index].quantidade > 1) this.items[index].quantidade--;
    },
    removerItem(index) {
      this.items.splice(index, 1);
    },
    formatarPreco(valor) {
      return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
    animateToCart(imgSrc, event) {
      const cartIcon = this.$refs.cartIcon;
      const rect = cartIcon.getBoundingClientRect();

      this.flyItem.img = imgSrc;
      this.flyItem.show = true;
      this.flyItem.style = {
        top: `${event.clientY}px`,
        left: `${event.clientX}px`,
        transform: `translate(0,0)`,
        opacity: 1
      };

      setTimeout(() => {
        this.flyItem.style = {
          top: `${event.clientY}px`,
          left: `${event.clientX}px`,
          transform: `translate(${rect.left - event.clientX}px, ${rect.top - event.clientY}px) scale(0.2)`,
          opacity: 0
        };
      }, 50);

      setTimeout(() => {
        this.flyItem.show = false;
      }, 700);
    }
  },
  mounted() {
    emitter.on("add-to-cart", (livro, event) => {
      const precoNumerico = typeof livro.preco === "string"
        ? parseFloat(livro.preco.replace("R$", "").replace(",", "."))
        : livro.preco;

      const itemExistente = this.items.find(i => i.titulo === livro.titulo);
      if (itemExistente) itemExistente.quantidade++;
      else this.items.push({ ...livro, preco: precoNumerico, quantidade: 1 });

      this.isOpen = true;

      if (event) this.animateToCart(livro.img, event);
    });
  }
};
</script>

<style scoped>
.cart-wrapper {
  position: relative;
  display: inline-block;
}

.cart-icon {
  position: relative;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--CorPrincipal);
  transition: transform 0.2s ease;
}
.cart-icon:hover {
  transform: scale(1.1);
}

.badge {
  position: absolute;
  top: -8px;
  right: -12px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 7px;
  font-size: 0.75rem;
  font-weight: bold;
}

.cart-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 350px;
  height: 100%;
  background: #fff;
  box-shadow: -4px 0 12px rgba(0,0,0,0.2);
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  padding: 20px;
}
.cart-sidebar.open {
  right: 0;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.cart-header h3 {
  margin: 0;
  color: var(--CorPrincipal);
  font-size: 1.5rem;
}
.close-btn {
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
  color: #555;
}
.close-btn:hover {
  color: red;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
}
.cart-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  border-radius: 10px;
  background: #f9f9f9;
}
.cart-item img {
  width: 60px;
  height: auto;
  border-radius: 5px;
}
.cart-item .info {
  flex: 1;
}
.preco {
  font-weight: bold;
  margin: 5px 0;
}

.quantidade {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
}
.quantidade button {
  width: 28px;
  height: 28px;
  border: 1px solid var(--CorPrincipal);
  background: #fff;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
}
.quantidade span {
  min-width: 20px;
  text-align: center;
  display: inline-block;
}

.remove-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: red;
  transition: transform 0.2s ease;
}
.remove-btn:hover {
  transform: scale(1.2);
}

.cart-footer {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid #eee;
  text-align: right;
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--CorPrincipal);
}

.empty-cart {
  text-align: center;
  color: #999;
  margin-top: 50px;
  font-size: 1rem;
}

/* Animacao do livro voando */
.fly-item {
  position: fixed;
  width: 60px;
  height: auto;
  z-index: 99999;
  pointer-events: none;
  transition: transform 0.6s ease, opacity 0.6s ease;
}
</style>
