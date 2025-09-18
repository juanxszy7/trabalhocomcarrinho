<template>
  <Anuncio/>
  <NavBar/>
  <RouterView />
  <Footer/>
</template>

<script>
import Anuncio from './components/Anuncio.vue';
import Footer from './components/Footer.vue';
import NavBar from './components/NavBar.vue';
export default{
  name: 'App',
  components:{
    NavBar,
    Anuncio,
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
</style>
