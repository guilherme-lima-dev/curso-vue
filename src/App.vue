<template>
    <transition name="pagina">
        <div class="container">
            <meu-menu :rotas="routes"></meu-menu> 
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
  import { routes }  from './routes';
  import Menu from './components/shared/menu/Menu.vue';

  export default {
    components: {
      'meu-menu' : Menu,
    },
    data() {

      return {

        routes: routes.filter(route => route.menu)
      }

    }
  }
</script>

<style>

  .pagina-enter-active, .pagina-leave-active {
    transition: opacity .2s
  }
  .pagina-enter, .pagina-leave-active {
    opacity: 0
  }
</style>