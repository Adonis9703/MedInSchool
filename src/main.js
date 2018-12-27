import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from '@/store/index'
import {post, get, api} from './utils'
import VueSocketIo from 'vue-socket.io'
import socketIo from 'socket.io-client'

import '@/assets/sass/sass_index.scss'
import '@/assets/iconfont/iconfont.css'
import '@/assets/sass/element-variables.scss';

Vue.use(VueSocketIo, socketIo('http://47.101.185.46:3000'))

Vue.use(ElementUI)

Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$apis = api
Vue.prototype.$store = store

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
