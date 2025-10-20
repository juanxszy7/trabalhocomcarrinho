<template>
  <NavBar/>
  <RouterView />
  <Footer/>
  <!-- Botão de voltar ao topo -->
  <button 
    v-show="mostrarBotaoTopo" 
    @click="voltarAoTopo" 
    class="botao-topo"
  >
    ↑
  </button>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import Footer from './components/Footer.vue';
import NavBar from './components/NavBar.vue';
export default{
  name: 'App',
  components:{
    NavBar,
    Footer
  },
  setup() {
    const mostrarBotaoTopo = ref(false);

    // Função para verificar rolagem
    const verificarRolagem = () => {
      mostrarBotaoTopo.value = window.scrollY > 200; // mostra após 200px
    };

    // Função para voltar ao topo
    const voltarAoTopo = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    onMounted(() => {
      window.addEventListener('scroll', verificarRolagem);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', verificarRolagem);
    });

    return { mostrarBotaoTopo, voltarAoTopo };
  },
}
</script>

<style>
:root{
  --CorPrincipal: #1a237e;
  --CorSecundaria: #eceff1;
  --CorTexto: #ffffff;
}
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
body::-webkit-scrollbar{
  display: none; 
}
.botao-topo {
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: var(--CorPrincipal);
  color: var(--CorTexto);
  border: none;
  padding: 12px 18px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  transition: opacity 0.3s;
  z-index: 1000;
}
.botao-topo:hover {
  background-color: #303f9f;
}
</style>
