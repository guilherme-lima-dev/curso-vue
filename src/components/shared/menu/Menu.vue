<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Alurapic {{title}}</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item" v-for="rota in rotas">
                    <router-link class="nav-link" :to="rota.path ? rota.path : '/'">{{rota.titulo}}</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
    export default{
        props: ['rotas'] ,
        title: ''  
    }
</script>
<style>

</style>
