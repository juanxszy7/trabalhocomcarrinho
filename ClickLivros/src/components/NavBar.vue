<template>
  <Anuncio/>
  <div class="header">
    <div class="logo-container">
      <RouterLink to="/">
        <img src="/img/Logo.png" alt="Logo" id="Logo" />
      </RouterLink>
    </div>

    <nav class="links">
      <RouterLink to="/">Início</RouterLink>
      <RouterLink to="/about">Sobre</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <!-- Carrinho -->
      <Cart />
    </nav>

  </div>
</template>

<script>
import Anuncio from "./Anuncio.vue";
import Cart from "./Cart.vue";

export default {
  name: "NavBar",
  components: { Cart, Anuncio }
};
</script>




<style scoped>
.header {
  background: linear-gradient(
    135deg,
    var(--CorSecundaria) 0%,
    #ffffff 100%
  );
  padding: 15px 40px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid var(--CorPrincipal);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  gap: 20px;
}

.logo-container {
  flex-shrink: 0;
}

#Logo {
  width: 90px;
  height: auto;
  transition: transform 0.3s ease;
}
#Logo:hover {
  transform: scale(1.08);
}

.search-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

#campoPesquisa {
  width: 100%;
  max-width: 350px;
  padding: 10px 15px;
  border-radius: 25px;
  background-color: #fff;
  border: 2px solid var(--CorPrincipal);
  color: var(--CorPrincipal);
  font-size: 1rem;
  transition: all 0.3s ease;
}
#campoPesquisa:focus,
#campoPesquisa:hover {
  box-shadow: 0 0 8px rgba(26, 35, 126, 0.3);
  transform: scale(1.02);
}

.links {
  display: flex;
  gap: 25px;
}

nav a {
  color: var(--CorPrincipal);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  position: relative;
  padding: 5px 0;
  transition: color 0.3s ease;
}

nav a::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -3px;
  left: 0;
  background: var(--CorPrincipal);
  transition: width 0.3s ease;
}

nav a:hover {
  color: #000;
}

nav a:hover::after {
  width: 100%;
}
</style>
