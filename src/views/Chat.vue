<template lang='pug'>
.chat-wrapper
  h3(v-if='contact') {{ contact.contact.username }}
  div(v-if='contact')
    li(v-for='chat in contact.chats') {{ chat.content }}
  input(v-model='message' placeholder='Message')
  button.btn.btn-success(@click='sendMsg(message)') Send
</template>

<script>
import io from '../api/socket'

export default {
  name: 'chat',
  data () {
    return {
      message: ''
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    contact () {
      return this.$store.state.contacts.contacts[this.$route.params.id]
    }
  },
  methods: {
    sendMsg (message) {
      this.message = ''
      io.message({
          receiver: this.id,
          content: message
        })
        .then((msg) => {
          this.$store.dispatch('addChats', [msg])
        })
    }
  }
}
</script>
