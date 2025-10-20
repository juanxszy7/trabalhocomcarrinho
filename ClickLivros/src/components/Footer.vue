<template>
    <footer>
        <div id="txtFooter">
            <p>&copy; ClickLivros 2025 | Todos os Direitos Reservados</p>
        </div>
        <div id="links">
            <a href="#"><i class="bi bi-instagram"></i></a>
            <p>|</p>
            <a href="#"><i class="bi bi-whatsapp"></i></a>
            <p>|</p>
            <a href="#"><i class="bi bi-twitter-x"></i></a>
        </div>
        <div id="termos">
            <RouterLink to="/termos">Termos de Uso</RouterLink>
            <RouterLink to="/politica">Politica de Privacidade</RouterLink>
        </div>
    </footer>
</template>

<script>
export default{
    name: 'Footer'
}
</script>

<style scoped>
footer{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--CorPrincipal);
    flex-direction: column;
    padding: 70px;
    gap: 40px;
}
#links{
    display: flex;
    flex-direction: row;
    gap: 20px;
}
a,
#links p{
    color: white;
}
p{
    cursor: default;
}
a{
    text-decoration: none;
}
a:hover{
    text-decoration: underline;
}
#txtFooter{
    color: white;
    font-weight: bold;
    font-size: 1.3rem;
}
#termos{
    display: flex;
    flex-direction: row;
    gap: 30px;
}
</style>