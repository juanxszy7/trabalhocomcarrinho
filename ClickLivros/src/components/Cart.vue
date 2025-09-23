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
          <h3>Subtotal: {{ formatarPreco(subtotal) }}</h3>
          <p v-if="desconto > 0" class="desconto">Desconto: -{{ formatarPreco(desconto) }}</p>
          <h3>Total: {{ formatarPreco(total) }}</h3>
          <button class="FinalCompraBtn" @click="finalizarCompra()">Finalizar Compra</button>
        </div>

      </div>

      <div v-else class="empty-cart">
        <p>Seu carrinho está vazio.</p>
      </div>
    </div>
  </div>

  <!-- Modal Finalização de compra (overlay) -->
  <div v-if="modalAberto" class="modal-overlay" @keydown.esc="fecharModal" tabindex="-1">
    <div class="modal-card" role="dialog" aria-modal="true">
      <header class="modal-header">
        <h2>Informações para Pagamento</h2>
        <button class="close-btn" @click="fecharModal">✖</button>
      </header>

      <section class="modal-body">
        <template v-if="!paymentCreated">
          <div class="divInput">
            <label for="campoNome" class="label">Nome:</label>
            <input v-model="cliente.nome" type="text" placeholder="Digite seu nome" name="nome" id="campoNome" class="campo">
          </div>

          <div class="divInput">
            <label for="campoEmail" class="label">Email:</label>
            <input v-model="cliente.email" type="email" placeholder="Digite seu email" name="email" id="campoEmail" class="campo">
          </div>

          <!-- opcional: simular dados do cartão (apenas para aparência) -->
          <div class="divInput">
            <label class="label">Número do cartão: (11 Digitos)</label>
            <input v-model="fakeCard.number" type="text" placeholder="0000 0000 0000 0000" class="campo">
          </div>

          <div class="divInput small-row">
            <div>
              <label class="label">Validade:</label>
              <input v-model="fakeCard.valid" type="text" placeholder="MM/AA" class="campo">
            </div>
            <div>
              <label class="label">CVV:</label>
              <input v-model="fakeCard.cvv" type="text" placeholder="123" class="campo">
            </div>
          </div>
        </template>

        <template v-else>
          <div class="payment-success">
            <h3>Pagamento criado com sucesso!</h3>
            <p class="small">Detalhes do pagamento:</p>

            <ul class="payment-details">
              <li><strong>ID:</strong> {{ paymentCreated.id }}</li>
              <li><strong>Método:</strong> {{ paymentCreated.metodo }}</li>
              <li><strong>Valor:</strong> {{ formatarPreco(paymentCreated.valor) }}</li>
              <li><strong>Cartão:</strong> **** **** **** {{ paymentCreated.last4 }}</li>
              <li><strong>Status:</strong> <span :class="{'status-approved': paymentCreated.status === 'Aprovado', 'status-pending': paymentCreated.status !== 'Aprovado'}">{{ paymentCreated.status }}</span></li>
              <li><strong>Nome:</strong> {{ cliente.nome }}</li>
              <li><strong>Email:</strong> {{ cliente.email }}</li>
            </ul>

            <div class="actions">
              <button class="FinalCompraBtn" @click="confirmarPagamento">Confirmar e Limpar Carrinho</button>
              <button class="close-secondary" @click="fecharModal">Fechar</button>
            </div>
          </div>
        </template>
      </section>

      <footer class="modal-footer" v-if="!paymentCreated">
        <button class="FinalCompraBtn" @click="enviarInfo" :disabled="isProcessing">
          <span v-if="!isProcessing">Enviar e Criar Pagamento</span>
          <span v-else>Processando...</span>
        </button>
      </footer>
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
      },
      modalAberto: false,

      // campos do modal
      cliente: {
        nome: "",
        email: ""
      },
      // campos apenas visuais do cartão fake
      fakeCard: {
        number: "",
        valid: "",
        cvv: ""
      },

      isProcessing: false,
      paymentCreated: null
    };
  },
  computed: {
    subtotal() {
      return this.items.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    },
    desconto() {
      // Regra: desconto de 10% quando subtotal >= 50 (mantive sua regra)
      return this.subtotal >= 50 ? this.subtotal * 0.10 : 0;
    },
    total() {
      return this.subtotal - this.desconto;
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
    },
    finalizarCompra(){
      this.isOpen = !this.isOpen;
      // resetar paymentCreated quando abrir o modal para novo fluxo
      this.paymentCreated = null;
      this.modalAberto = !this.modalAberto;
    },
    fecharModal(){
      this.modalAberto = false;
      this.isProcessing = false;
      // não limpa paymentCreated para permitir visualização se já criado
    },

    // === funções de pagamento fake ===
    validarCampos() {
      if (!this.cliente.nome.trim()) {
        alert("Por favor insira seu nome.");
        return false;
      }
      if (!this.cliente.email.trim()) {
        alert("Por favor insira seu email.");
        return false;
      }
      // validação pequena para o "cartão" (opcional)
      if (this.fakeCard.number && this.fakeCard.number.replace(/\s/g,'').length < 12) {
        alert("Número do cartão inválido.");
        return false;
      }
      return true;
    },

    criarPagamentoFake() {
      // Gera um pagamento fake com informações úteis
      const now = Date.now();
      const random = Math.floor(Math.random() * 9000) + 1000;
      const last4 = (this.fakeCard.number.replace(/\s/g,'').slice(-4) || String(random).slice(-4));

      const payment = {
        id: `PAY-${now}-${random}`,
        metodo: "Cartão de Crédito",
        last4: last4,
        status: "Aprovado",
        valor: this.total,
        criadoEm: new Date().toISOString()
      };

      return payment;
    },

    async enviarInfo() {
      if (!this.validarCampos()) return;

      this.isProcessing = true;

      // Simula um delay de rede (apenas UX) — rápido
      await new Promise(resolve => setTimeout(resolve, 700));

      // Cria pagamento fake
      const payment = this.criarPagamentoFake();
      this.paymentCreated = payment;
      this.isProcessing = false;
    },

    confirmarPagamento() {
      // ação final: limpar carrinho, fechar modal e mostrar feedback
      this.items = [];
      this.paymentCreated = null;
      this.cliente = { nome: "", email: "" };
      this.fakeCard = { number: "", valid: "", cvv: "" };
      this.modalAberto = false;
      this.isOpen = false;
      // opcional: mensagem simples
      setTimeout(() => {
        alert("Compra confirmada. Obrigado por comprar na ClickLivros!");
      }, 100);
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

/* (mantive seus estilos existentes) */
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
  width: 330px;
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
  padding: 20px;
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
  padding-right: 10px;
}
.empty-cart {
  text-align: center;
  color: #999;
  margin-top: 50px;
  font-size: 1rem;
}
.fly-item {
  position: fixed;
  width: 60px;
  height: auto;
  z-index: 99999;
  pointer-events: none;
  transition: transform 0.6s ease, opacity 0.6s ease;
}
.FinalCompraBtn{
  background: #ff9800;
  border: none;
  padding: 8px 18px;
  border-radius: 20px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}
.FinalCompraBtn:hover{
  background: #e68a00;
  transform: scale(1.03);
}
.desconto {
  color: green;
  font-weight: 600;
}

/* ====== Modal styles melhorados ====== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  padding: 20px;
}
.modal-card {
  background: var(--CorSecundaria);
  color: var(--CorPrincipal);
  width: 100%;
  max-width: 720px;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.35);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform-origin: center;
  animation: pop 180ms ease;
}
@keyframes pop {
  from { transform: translateY(-6px) scale(0.995); opacity: 0.02; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.modal-header h2 { margin: 0; font-size: 1.25rem; }
.modal-body {
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.divInput { display: flex; flex-direction: column; gap: 8px; }
.small-row { display: flex; gap: 12px; }
.small-row > div { flex: 1; display:flex; flex-direction: column; gap:8px; }

.campo{
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  background-color: #fff;
  border: 2px solid var(--CorPrincipal);
  color: var(--CorPrincipal);
  font-size: 1rem;
  transition: all 0.2s ease;
}
.campo:focus { outline: none; box-shadow: 0 4px 14px rgba(26,35,126,0.08); transform: translateY(-1px); }

.label { font-size: 0.9rem; margin-left: 2px; color: rgba(0,0,0,0.65); }

.modal-footer {
  padding: 14px 22px;
  border-top: 1px solid rgba(0,0,0,0.06);
  display: flex;
  justify-content: flex-end;
}

/* Success area */
.payment-success {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
}
.payment-details { list-style: none; padding: 0; margin: 0; }
.payment-details li { padding: 6px 0; border-bottom: 1px dashed rgba(0,0,0,0.05); font-size: 0.95rem; }

.status-approved { color: green; font-weight: 600; }
.status-pending { color: orange; font-weight: 600; }

.actions { display:flex; gap: 10px; margin-top: 8px; }
.close-secondary {
  background: transparent;
  border: 1px solid var(--CorPrincipal);
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  color: var(--CorPrincipal);
}
.close-secondary:hover { transform: translateY(-2px); }

/* ajustes responsivos */
@media (max-width: 480px) {
  .modal-card { max-width: 420px; width: 100%; }
  .cart-sidebar { width: 100%; max-width: 360px; }
}
</style>