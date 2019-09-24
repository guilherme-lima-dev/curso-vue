<template>

  <div class="mt-5">
        <p v-show="mensagem" class="alert text-center alert-primary">{{ mensagem }}</p>
        <h1 v-if="foto._id" class="text-center mb-3">Alteração</h1>
        <h1 v-else class="text-center mb-3">Inclusão</h1>
        <h3 class="text-center mb-3">{{ foto.titulo }}</h3>

        <form @submit.prevent="grava()">
            <div class="form-group">
                <label for="titulo">TÍTULO</label>
                <input v-validate="'required'" name='titulo' class="form-control" v-model.lazy="foto.titulo" id="titulo" autocomplete="off">
                <br v-show="errors.first('titulo')">
                <span class="alert alert-danger" v-show="errors.first('titulo')">{{ errors.first('titulo') }}</span>
            </div>

            <div class="form-group">
                <label for="url">URL</label>
                <input v-validate="'required'" name="url" class="form-control" v-model.lazy="foto.url" id="url" autocomplete="off">
                <br v-show="errors.first('url')">
                <span class="alert alert-danger" v-show="errors.first('url')">{{ errors.first('url') }}</span>
                <div class="caixa-imagem">
                        <imagem-responsiva class="img-thumbnail" v-show="foto.url" :url="foto.url" :titulo="foto.titulo"/>
                </div>
            </div>

            <div class="form-group">
                <label for="descricao">DESCRIÇÃO</label>
                <textarea class="form-control" v-model="foto.descricao" id="descricao" autocomplete="off"></textarea>
            </div>

            <div class="text-center">
                <meu-botao estilo="sucesso" rotulo="GRAVAR" tipo="submit"/>
                <router-link :to="{name: 'home'}"><meu-botao estilo="nada" rotulo="VOLTAR" tipo="button"/></router-link>
            </div>

        </form>
  </div>
</template>

<script>

import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
import Botao from '../shared/botao/Botao.vue';
import Foto from '../../domain/foto/Foto.js';
import FotoService from '../../domain/foto/FotoService';

export default {

    components: {

        'imagem-responsiva': ImagemResponsiva, 
        'meu-botao': Botao
    }, 
    data(){
            return{
                foto: new Foto(),
                id: this.$route.params.id,
                mensagem: '',
                
            }
    },

    methods: {

        grava() {

        this.$validator
          .validateAll()
          .then(success => {
            if(success) {

              this.service
                .cadastra(this.foto)
                .then(() => {
                  if(this.id) this.$router.push({ name: 'home'});
                  this.foto = new Foto()
                }, 
                err => console.log(err));
            }
        });
    }
  }, 

    created() {

        this.service = new FotoService(this.$resource);
        if(this.id) {
            this.service
                .busca(this.id)
                .then(foto => this.foto = foto);
        }
    }
}

</script>
<style scoped>
  .caixa-imagem{
      width: 30%;
      height: 30%;
  }

</style>