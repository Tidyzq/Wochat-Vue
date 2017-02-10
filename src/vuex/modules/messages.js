import Vue from 'vue'
import io from '../../api/socket'
import * as types from '../mutation-types'

export default {
  state: {
    messages: {}
  },
  mutations: {
    [types.ADD_CHAT] (state, { to, message }) {
      if (!state.messages[to])
        Vue.set(state.messages, to, [])
      let id = message._id
      state.messages[to].push(message)
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
          commit(types.ADD_CHAT, {
            to: to,
            message: msg
          })
        })
    },
    receiveMessages ({ commit, state, rootState }) {
      io.on('message', (messages) => {
        console.log('receiveMessages', messages)
        messages.forEach((message) => {
          let to = message.sender
          commit(types.ADD_CHAT, {
            to: to,
            message: message
          })
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