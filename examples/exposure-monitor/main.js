
import App from './App.vue'
import ExposureMonitor from './exposure-monitor.js'

Vue.config.debug = true;

Vue.directive('exposure', ExposureMonitor);

new Vue({
  el: 'body',
  components: { App }
})