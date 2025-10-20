<template>
    <div class="termos-container">
      
        
      <main>
        <section class="termos">
          <h2>Termos de Uso</h2>
  
          <p>Bem-vindo à ClickLivros! Ao acessar nosso site e utilizar nossos serviços, você concorda com os seguintes termos e condições:</p>
  
          <h3>1. Aceitação dos Termos</h3>
          <p>O uso do site ClickLivros implica a aceitação integral destes Termos de Uso. Se você não concorda com algum ponto, por favor, não utilize nosso site.</p>
  
          <h3>2. Cadastro de Usuário</h3>
          <p>Alguns serviços da ClickLivros exigem cadastro. Você se compromete a fornecer informações verdadeiras, atualizadas e completas. O usuário é responsável pela confidencialidade da sua conta e senha.</p>
  
          <h3>3. Compras e Pagamentos</h3>
          <p>Ao realizar compras, você concorda em fornecer informações válidas e precisas. Os pagamentos são processados de forma segura e podem estar sujeitos a confirmação de dados pela instituição financeira.</p>
  
          <h3>4. Entrega e Prazos</h3>
          <p>A ClickLivros se compromete a enviar os produtos dentro do prazo informado. No entanto, atrasos podem ocorrer por motivos alheios à nossa responsabilidade, como problemas logísticos ou dos correios.</p>
  
          <h3>5. Cancelamento e Devoluções</h3>
          <p>As solicitações de cancelamento e devolução devem seguir nossa política de devoluções, disponível no site. Produtos danificados ou entregues incorretamente serão trocados sem custo adicional.</p>
  
          <h3>6. Propriedade Intelectual</h3>
          <p>Todo o conteúdo do site ClickLivros, incluindo textos, imagens e layout, é protegido por direitos autorais. É proibida a reprodução sem autorização expressa da ClickLivros.</p>
  
          <h3>7. Responsabilidade</h3>
          <p>A ClickLivros não se responsabiliza por danos diretos ou indiretos decorrentes do uso do site, exceto quando houver dolo ou culpa grave.</p>
  
          <h3>8. Alterações nos Termos</h3>
          <p>Podemos atualizar estes Termos de Uso a qualquer momento. Recomendamos que você revise esta página periodicamente. O uso contínuo do site após alterações constitui aceitação dos novos termos.</p>
  
          <h3>9. Lei Aplicável</h3>
          <p>Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes da cidade-sede da ClickLivros.</p>
  
          <p id="agradecimento"><b>Obrigado por confiar na ClickLivros!</b></p>
        </section>
      </main>

    </div>
  </template>
  
  <script>
  export default {
    name: 'TermosUso'
  }
  </script>
  
  <style scoped>
  .termos-container {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f8f8f8;
    color: #333;
    min-height: 100vh;
  }
  
  header h1 {
    margin: 0;
  }
  
  main {
    max-width: 800px;
    margin: 30px auto;
    padding: 0 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h2, h3 {
    color: var(--CorPrincipal);
  }
  
  section.termos p {
    margin-bottom: 15px;
  }

  .termos{
    padding-bottom: 10px;
  }

  #agradecimento{
    text-align: center;
  }
  </style>
  