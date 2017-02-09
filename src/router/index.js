import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'views/Hello'
import Login from 'views/Login'
import Chat from 'views/Chat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Hello,
      children: [
        {
          name: 'Hello',
          path: ''
        },
        {
          name: 'Chat',
          path: 'chat/:id',
          component: Chat
        }
      ]
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
