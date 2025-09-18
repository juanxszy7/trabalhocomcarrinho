<template>
  <div class="about-clicklivros">
    <div class="card">
      <h1>Sobre a ClickLivros</h1>

      <p>
        A <strong>ClickLivros</strong> é uma loja online apaixonada por livros, dedicada a oferecer variedade, qualidade e bons preços. Aqui você encontra desde lançamentos até os clássicos que atravessam gerações. Oferecemos entrega rápida e uma experiência de compra simples e segura. Seu próximo livro favorito está a um clique de distância.
      </p>

      <h2>O que você encontra na ClickLivros?</h2>
      <ul>
        <li>Livros de diversos gêneros: romance, ficção, autoajuda, clássicos e muito mais.</li>
        <li>Produtos novos, lacrados e com entrega rápida.</li>
        <li>Pagamento via cartão de crédito, boleto bancário e Mercado Pago.</li>
        <li>Opções de parcelamento sem juros.</li>
      </ul>

      <h2>Por que confiar?</h2>
      <p>
        A ClickLivros busca garantir a melhor experiência ao cliente com um processo de compra seguro, envio eficiente e atendimento dedicado. Ainda em crescimento, recomendamos verificar avaliações e começar com compras pequenas.
      </p>

      <h2>Dicas para uma compra segura</h2>
      <ul>
        <li>Verifique o estoque e o prazo de entrega antes de finalizar o pedido.</li>
        <li>Leia as políticas de troca e devolução.</li>
        <li>Guarde o comprovante da compra e tire fotos da embalagem, se necessário.</li>
      </ul>

      <p class="footer">
        Para saber mais, acesse:  
        <a href="https://www.lojaclicklivros.com.br" target="_blank">www.lojaclicklivros.com.br</a>
      </p>
      <div id="divButton">
        <RouterLink to="/" id="button">Voltar ao Inicio</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about-clicklivros {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 20px;
  background: linear-gradient(to right, #f3f4f6, #e7ecf0);
  min-height: 100vh;
}

.card {
  background-color: #ffffff;
  max-width: 900px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  line-height: 1.8;
  transition: all 0.3s ease-in-out;
}

.card h1 {
  font-size: 2.2rem;
  color: #1a237e;
  margin-bottom: 20px;
}

.card h2 {
  margin-top: 30px;
  font-size: 1.4rem;
  color: #3949ab;
  border-bottom: 2px solid #c5cae9;
  padding-bottom: 5px;
}

.card ul {
  list-style-type: disc;
  padding-left: 20px;
  margin-top: 10px;
}

.card ul li {
  margin-bottom: 10px;
}

.footer {
  margin-top: 30px;
  font-size: 0.95rem;
}

.footer a {
  color: #1e88e5;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.footer a:hover {
  color: #0d47a1;
}
#button{
    background-color: var(--CorPrincipal);
    padding: 5px;
    border-radius: 100px;
    color: white;
    text-decoration: none;
    transition: .3s ease;
}
#button:hover{
  background-color: transparent;
  border: 2px solid var(--CorPrincipal);
  color: var(--CorPrincipal);
}
#divButton{
    margin-top: 10px;
}
</style>

