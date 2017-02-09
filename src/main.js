// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueResource from 'vue-resource'
import $ from 'jquery'
import bootstrapCss from 'bootstrap/dist/css/bootstrap.css'
import bootstrapJs from 'bootstrap/dist/js/bootstrap.js'
import socketIO from 'socket.io-client'

Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
