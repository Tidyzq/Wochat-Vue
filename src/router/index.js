import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'views/Hello'
import Login from 'views/Login'
import Register from 'views/Register'
import ChatView from 'views/ChatView'

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
          name: 'ChatView',
          path: 'chat/:id',
          component: ChatView
        }
      ]
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
