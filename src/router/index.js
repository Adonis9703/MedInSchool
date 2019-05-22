import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login'
import home from '../pages/home'
import chat from '../pages/functions/chat'
import history from '../pages/functions/history'
import medcine from '../pages/functions/medicine'
import doctor from  '../pages/functions/doctor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/chat',
          name: 'chat',
          component: chat
        },
        {
          path: '/history',
          name: 'history',
          component: history
        },
        {
          path: '/medicine',
          name: 'medicine',
          component: medcine
        },
        {
          path: '/doctor',
          name: 'doctor',
          component: doctor
        }
      ]
    }
  ]
})
