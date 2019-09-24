<template>
   <div class="mt-5">

    <h1 class="text-center mb-3">{{ titulo }}</h1>

    <p v-show="mensagem" class="alert text-center alert-primary">{{ mensagem }}</p>

    <input type="search" class="form-control mb-3" @input="filtro = $event.target.value" placeholder="filtre pelo título da foto">
    <div class="row">
            <div class="card-group col-4 mt-3 mb-3" v-for="foto in fotosComFiltro" >
                
                <meu-painel :titulo="foto.titulo" v-meu-transform="{incremento: 360, animate: true, eixo: 'Y', tempo: 1}">
                    <imagem-responsiva class="card-img-top img-fluid" :url="foto.url" :titulo="foto.titulo" v-meu-transform:scale.reverse="{incremento: 2, animate: true, eixo: 'X', tempo: 3}"/>
                    <div class="row">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <meu-botao rotulo="remover" tipo="button" @botaoAtivado="remove(foto)" :confirmacao="true" estilo="perigo"/>
                        </div>
                        <div class="col-md-4">
                            <router-link :to="{ name: 'altera', params: { id : foto._id }}">
                                <meu-botao rotulo="Alterar" tipo="button"/>
                            </router-link> 
                        </div>
                        <div class="col-md-2"></div>
                    </div>
                </meu-painel>
            </div>
    </div>

  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import FotoService from '../../domain/foto/FotoService';

export default {

    components: {
        'meu-painel' : Painel,
        'imagem-responsiva': ImagemResponsiva,
        'meu-botao' : Botao
    },
    data(){
        return{
            titulo: 'Home',
            fotos:[], 
            filtro: '',
            mensagem: ''
        }
    },
    methods: {

        remove(foto) {

        this.service
            .apaga(foto._id)
            .then(
            () => {
                let indice = this.fotos.indexOf(foto);
                this.fotos.splice(indice, 1);
                this.mensagem = 'Foto removida com sucesso!'
            }, 
            err => {
                this.mensagem = 'Não foi possível remover a foto';
                console.log(err);
            }
            )
        }

    },
    computed: {
        fotosComFiltro() {
            if (this.filtro) {
                let exp = new RegExp(this.filtro.trim(), 'i');
                return this.fotos.filter(foto => exp.test(foto.titulo));
                
            } else {
                // se o campo estiver vazio, não filtramos, retornamos a lista
                
                return this.fotos;
            }
        }
    },
    created(){
        this.service = new FotoService(this.$resource);

        this.service.lista()
            .then(fotos => this.fotos = fotos, err => this.mensagem = err.message);


    }
}
</script>

<style>

</style>
