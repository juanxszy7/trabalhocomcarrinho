<template>
    <div id="banner">
        <div id="divTxt">
            <h2 id="txtBanner">ClickLivros - Sua leitura começa aqui</h2>
        </div>
        <div class="divButton">
            <RouterLink to="/about" id="button">Saiba mais</RouterLink>
        </div>
    </div>
    <div id="quote">
        <p>Só se vê bem com o coração, o essencial é invisível aos olhos - O Pequeno Príncipe, Antoine de Saint-Exupéry</p>
    </div>
</template>

<script>
export default{
    name: 'Banner'
}
</script>

<style scoped>
#banner{
    background-image: url(/img/image.png);
    background-size: cover;   /* cobre toda a tela */
    background-repeat: no-repeat; /* não repete */
    background-position: left;  /* centraliza a imagem */
    height: 477px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 100px;
    border-bottom: 4px solid var(--CorPrincipal);
}
#txtBanner{
    font-size: 3rem;
    color: var(--CorTexto);
}
#divTxt{
    background-color: var(--CorPrincipal);
    padding: 30px;
    border-radius: 100px;
    border: 2px solid white;
}
#button{
    background-color: var(--CorPrincipal);
    padding: 10px;
    border-radius: 100px;
    color: white;
    text-decoration: none;
    transition: .3s ease;
}
#button:hover{
    background-color: transparent;
    border: 2px solid white;
    color: white;
}
#quote{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    background-color: var(--CorPrincipal); 
    padding: 10px;

}
</style>