<template>
    <footer>
        <div id="txtFooter">
            &copy; ClickLivros 2025
        </div>
        <div id="links">
            <a href="#">Instagram</a>
            <p>|</p>
            <a href="#">Whatsapp</a>
            <p>|</p>
            <a href="#">X</a>
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
#links a,
#links p{
    color: white;
}
#links a{
    text-decoration: none;
}
#links a:hover{
    text-decoration: underline;
}
#txtFooter{
    color: white;
    font-weight: bold;
    font-size: 1.3rem;
}
</style>