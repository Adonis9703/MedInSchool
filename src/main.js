import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketIo from 'vue-socket.io'
import socketIo from 'socket.io-client'

// Vue.use(VueSocketIo, socketIo('http://localhost:3000'))
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
