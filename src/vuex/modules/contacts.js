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
    },
    [types.ADD_CHAT] (state, chat) {
      let id = chat.sender
      let contact = state.contacts[id]
      if (!contact.chats) contact.chats = []
      contact.chats.unshift(chat)
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
        if (!state.contacts[id]) {
          return user.find(id, rootState.user.accessToken)
            .then((sender) => {
              let contact = {
                contact: sender
              }
              commit(types.ADD_CONTACT, contact)
              commit(types.ADD_CHAT, chat)
            })
        } else {
          commit(types.ADD_CHAT, chat)
        }
      })
    }
  }
}