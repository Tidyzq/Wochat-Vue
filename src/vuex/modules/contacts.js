import Vue from 'vue'
import contacts from '../../api/contacts'
import user from '../../api/user'
import { refreshOnFailure } from './utils'
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
    [types.CLEAR_CONTACT] (state) {
      Vue.set(state, 'contacts', {})
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
    getContacts ({ commit, state, dispatch, rootState }) {
      return refreshOnFailure(dispatch)(() => {
        return contacts.getContacts(rootState.user.user, rootState.user.accessToken)
          .then((contacts) => {
            commit(types.REFRESH_CONTACTS, contacts)
          })
      })
    },
    getContact ({ commit, state, dispatch, rootState }, id) {
      if (!state.contacts[id]) {
        let promise = refreshOnFailure(dispatch)(() => {
            return user.find(id, rootState.user.accessToken)
          })
          .then((contact) => {
            commit(types.ADD_CONTACT, {
              contact: contact
            })
          })
        commit(types.ADD_CONTACT, {
          contact: {
            _id: id,
            promise: promise
          }
        })
        return promise
      } else {
        let contact = state.contacts[id]
        if (contact.promise) return contact.promise
        return Promise.resolve(contact)
      }
    }
  }
}