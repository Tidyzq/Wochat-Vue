import Vue from 'vue'
import contacts from '../../api/contacts'
import user from '../../api/user'
import * as types from '../mutation-types'

export default {
  state: {
    contacts: {}
  },
  mutations: {
    [types.ADD_CONTACT] (state, contact) {
      let id = contact.contact._id
      Vue.set(state.contacts, id, contact)
    },
    [types.REMOVE_CONTACT] (state, contact) {
      let id = contact.contact._id
      Vue.delete(state.contacts, id)
    },
    [types.REFRESH_CONTACTS] (state, contacts) {
      contacts.forEach((contact) => {
        let id = contact.contact._id
        Vue.set(state.contacts, id, contact)
      })
    }
  },
  actions: {
    getContacts ({ commit, state, rootState }) {
      return contacts.getContacts(rootState.user.user, rootState.user.accessToken)
        .then((contacts) => {
          commit(types.REFRESH_CONTACTS, contacts)
        })
    }
  }
}