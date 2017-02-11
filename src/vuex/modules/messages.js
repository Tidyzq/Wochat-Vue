import Vue from 'vue'
import io from '../../api/socket'
import * as types from '../mutation-types'

const messageTypes = {
  text: 0,
  image: 1,
  invitation: 2,
}

export default {
  state: {
    messages: {},
    invitations: {},
  },
  mutations: {
    [types.ADD_MESSAGE] (state, { to, message }) {
      if (!state.messages[to])
        Vue.set(state.messages, to, {})
      let id = message._id
      Vue.set(state.messages[to], id, message)
    },
    [types.ADD_INVITATION] (state, message) {
      let id = message._id
      Vue.set(state.invitations, id, message)
    }
  },
  actions: {
    sendMessage ({ commit, state }, { to, message }) {
      return io.message({
          receiver: to,
          content: message
        })
        .then((msg) => {
          console.log(to, msg)
          commit(types.ADD_MESSAGE, {
            to: to,
            message: msg
          })
        })
    },
    receiveMessages ({ commit, state, dispatch, rootState }) {
      io.on('message', (messages) => {
        console.log('receiveMessages', messages)
        messages.forEach((message) => {
          let to = message.sender
          switch (message.type) {
            case messageTypes.text:
            case messageTypes.image:
              if (!rootState.contacts.contacts[to])
                dispatch('getContact', to)
              commit(types.ADD_MESSAGE, {
                to: to,
                message: message
              })
              break
            case messageTypes.invitation:
              commit(types.ADD_INVITATION, message)
              break
          }
        })
        let acks = []
        messages.forEach((message) => {
          acks.push(message._id)
        })
        io.emit('ack', acks)
      })
      io.emit('receive')
    }
  }
}