<template>
    <button @click="disparaAcao()" class="botao" :class="estiloDoBotao" :type="tipo">{{rotulo}}</button>
</template>
<script>
    export default {
        props: {
            tipo: {
                type: String, 
                required: true
            },

            rotulo: {
                type: String, 
                required: true
            },

            confirmacao: Boolean,
            estilo: String
        },
        methods: {
            disparaAcao(){
                if(this.confirmacao){
                    if(confirm("Deseja mesmo realizar a operação?")){
                        this.$emit('botaoAtivado');
                    }
                }else{
                    this.$emit('botaoAtivado');
                }
            }
        },
        computed: {
            estiloDoBotao(){
                if(this.estilo == 'padrao' || !this.estilo) return 'btn-primary';
                if(this.estilo == 'perigo') return 'btn-danger';
                if(this.estilo == 'sucesso') return 'btn-success';
                if(this.estilo != 'padrao' && this.estilo != 'perigo') return 'btn-default';
            }
        }
    }
</script>
<style scoped>
    .botao {
        display: inline-block;
        padding: 10px;
        border: none;
        border-radius: 5px;
        margin: 10px;
        font-size: 1.2em;
        cursor: pointer; position: relative;
    }

    .botao-perigo {
        background: firebrick;
        color: white;
    }

    .botao-padrao {
        background: darkcyan;
        color: white;
    }

</style>
