<template>
  <NavBar class="fixed-navbar"/>
  <RouterView />
  <Footer/>
</template>

<script>
import Footer from './components/Footer.vue';
import NavBar from './components/NavBar.vue';
export default{
  name: 'App',
  components:{
    NavBar,
    Footer
  }
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
.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* acima do conteúdo */
}
router-view, footer {
  margin-top: 70px; /* altura aproximada da navbar */
}
</style>
