<template>

    <transition name="painel-fade">
        <div class="card painel-conteudo">
            <div class="card-body painel-titulo">
                <div class="card-title ">
                    <h5 class="card-title">{{ titulo }}</h5> 
                </div>
            </div>
            <slot></slot>
        </div>
    </transition>

</template>

<script>
    export default {
        props: ['titulo'],
        data(){
            return{
                visivel: true
            }
        },
        methods: {
            mostraEsconde: function(){
                this.visivel = !this.visivel;
            }
        }
    }
</script>
<style>
    .painel-fade-enter, .painel-fade-leave-active {
        opacity: 0
    }

    .painel-fade-enter-active, .painel-fade-leave-active {
        transition: opacity .4s
    }
    .painel-conteudo{
        overflow: hidden;
    }



</style>