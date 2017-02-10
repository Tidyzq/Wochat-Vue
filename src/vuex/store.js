import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import messages from './modules/messages'
import contacts from './modules/contacts'

Vue.use(Vuex)

export default new Vuex.Store({
  // 组合各个模块
  modules: {
    user,
    contacts,
    messages
  }
})