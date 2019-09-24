import Vue from 'vue';

Vue.directive('meu-transform', {
    bind(el, binding, vnode){
        let current = 0;
        el.addEventListener('dblclick', function() {
            let incremento = 90;
            let animate = false;
            let efeito;

            if(binding.value) {
                incremento = binding.value.incremento
                animate = binding.value.animate 

            }
            if(!binding.arg || binding.arg == 'rotate'){
                if(binding.modifiers.reverse){
                    current-=incremento;
                }else{
                    current+=incremento;
                }

                efeito = `rotate${binding.value.eixo}(${current}deg)`;
            }else if(binding.arg = "scale"){
                efeito = `scale(${incremento})`;
            }

            this.style.transform = efeito;
            if (animate) this.style.transition = `transform ${binding.value.tempo}s`;
        });
    }
});