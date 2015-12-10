import Vue from 'vue'
import App from './App.vue'

Vue.config.debug = true

window.test = new Vue({
  el: 'body',
  components: { App }
})
