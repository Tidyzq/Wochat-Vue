<template lang='pug'>
  sidebar.chat-wrapper.no-padding(placement='right')
    h3(v-if='contact') {{ contact.contact.username }}
    .chats-wrapper(v-if='messages')
      .chats-container.container-fluid
        .row.chat-row(v-for='message in messages')
          .col-sm-1(:class='{"pull-right": isSenderSelf(message)}')
            img.avatar-sm(:src='contacts[message.sender].contact.avatar')
          .col-sm-7(:class='{"pull-right": isSenderSelf(message)}')
            chatbox(:type='isSenderSelf(message) ? "success" : "info"', :placement='isSenderSelf(message) ? "left" : "right"')
              | {{ message.content }}
    .fixd-bottom
      .col-sm-12.no-padding
        input.form-control.no-radius(type='text' v-model='inputMsg' placeholder='Message' @keyup.enter='sendMsg(inputMsg)')
</template>

<script>
import Sidebar from '../components/Sidebar'
import Chatbox from '../components/Chatbox'

export default {
  name: 'chat',
  components: {
    Sidebar,
    Chatbox
  },
  data () {
    return {
      inputMsg: ''
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    userSelf () {
      return this.$store.state.user.user
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
    },
    isSenderSelf (message) {
      return message.sender == this.userSelf._id
    }
  }
}
</script>
<style lang='less'>

.fixd-bottom {
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
}

.chats-wrapper {
  position: absolute;
  top: 50px;
  bottom: 34px;
  right: 0;
  left: 0;
  .chats-container {
    position: relative;
    overflow: scroll;
    height: 100%;
    .chat-row {
      margin-bottom: 5px;
    }
  }
}

</style>
