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
      Vue.set(contact, 'chats', [])
      Vue.set(state.contacts, id, contact)
    },
    [types.REMOVE_CONTACT] (state, contact) {
      let id = contact.contact._id
      Vue.delete(state.contacts, id)
    },
    [types.REFRESH_CONTACTS] (state, contacts) {
      contacts.forEach((contact) => {
        if (!contact.chats)
          Vue.set(contact, 'chats', [])
        let id = contact.contact._id
        Vue.set(state.contacts, id, contact)
      })
    },
    [types.ADD_CHAT] (state, chat) {
      let id = chat.sender
      let contact = state.contacts[id]
      contact.chats.push(chat)
    }
  },
  actions: {
    getContacts ({ commit, state, rootState }) {
      return contacts.getContacts(rootState.user.user, rootState.user.accessToken)
        .then((contacts) => {
          commit(types.REFRESH_CONTACTS, contacts)
        })
    },
    addChats ({ commit, state, rootState }, chats) {
      chats.forEach((chat) => {
        let id = chat.sender
        if (state.contacts[id]) {
          commit(types.ADD_CHAT, chat)
        }
      })
    }
  }
}