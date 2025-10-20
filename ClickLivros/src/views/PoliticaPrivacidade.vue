<template>
    <div class="politica-container">
        
      <main>
        <section class="politica">
          <h2>Política de Privacidade</h2>
  
          <p>Na ClickLivros, sua privacidade é muito importante para nós. Esta política descreve como coletamos, usamos e protegemos suas informações.</p>
  
          <h3>1. Informações Coletadas</h3>
          <p>Coletamos informações que você fornece ao se cadastrar ou realizar compras, incluindo nome, email, endereço e dados de pagamento. Também podemos coletar informações automaticamente, como dados de navegação e cookies.</p>
  
          <h3>2. Uso das Informações</h3>
          <p>As informações coletadas são usadas para processar pedidos, enviar comunicações relacionadas à sua conta e melhorar nossos serviços. Não compartilhamos suas informações com terceiros para fins de marketing sem seu consentimento.</p>
  
          <h3>3. Proteção de Dados</h3>
          <p>Adotamos medidas de segurança técnicas e administrativas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.</p>
  
          <h3>4. Compartilhamento de Informações</h3>
          <p>Podemos compartilhar informações com parceiros confiáveis para entrega de produtos ou processamento de pagamentos, sempre seguindo normas de confidencialidade e segurança.</p>
  
          <h3>5. Cookies</h3>
          <p>Utilizamos cookies para melhorar a experiência de navegação, lembrar preferências e personalizar conteúdo. Você pode desativar cookies no seu navegador, mas isso pode afetar algumas funcionalidades do site.</p>
  
          <h3>6. Direitos do Usuário</h3>
          <p>Você pode solicitar acesso, correção ou exclusão de suas informações pessoais a qualquer momento, entrando em contato com nosso suporte.</p>
  
          <h3>7. Alterações na Política</h3>
          <p>Podemos atualizar esta política periodicamente. Recomendamos que você revise esta página regularmente. O uso contínuo do site após alterações constitui aceitação da nova política.</p>
  
          <h3>8. Lei Aplicável</h3>
          <p>Esta Política de Privacidade é regida pelas leis brasileiras. Quaisquer disputas serão resolvidas nos tribunais competentes da cidade-sede da ClickLivros.</p>
  
          <p id="agradecimento"><b>Obrigado por confiar na ClickLivros!</b></p>
        </section>
      </main>
  
    </div>
  </template>
  
  <script>
  export default {
    name: 'PoliticaPrivacidade'
  }
  </script>
  
  <style scoped>
  .politica-container {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f8f8f8;
    color: #333;
    min-height: 100vh;
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
  
  section.politica p {
    margin-bottom: 15px;
  }

  .politica{
    padding-bottom: 10px;
  }

  #agradecimento{
    text-align: center;
  }
  </style>
  