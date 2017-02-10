<template lang='pug'>
.chat-wrapper
  h3(v-if='contact') {{ contact.contact.username }}
  div(v-if='messages')
    li(v-for='message in messages') {{ message.sender }}: {{ message.content }}
  input(v-model='inputMsg' placeholder='Message')
  button.btn.btn-success(@click='sendMsg(inputMsg)') Send
</template>

<script>
import io from '../api/socket'

export default {
  name: 'chat',
  data () {
    return {
      inputMsg: ''
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    contacts () {
      return this.$store.state.contacts.contacts
    },
    contact () {
      return this.$store.state.contacts.contacts[this.$route.params.id]
    },
    messages () {
      return this.$store.state.messages.messages[this.$route.params.id]
    }
  },
  methods: {
    sendMsg (message) {
      this.inputMsg = ''
      this.$store.dispatch('sendMessage', {
          to: this.id,
          message: message
        })
    }
  }
}
</script>
