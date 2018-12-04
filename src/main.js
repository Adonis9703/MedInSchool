import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import {post, get, api} from './utils'
import VueSocketIo from 'vue-socket.io'
import socketIo from 'socket.io-client'

// Vue.use(VueSocketIo, socketIo('ws://localhost:3000'))

const webSocket = new WebSocket('ws://127.0.0.1:3000')
Vue.use(ElementUI)

Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$apis = api
Vue.prototype.$ws = webSocket

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
