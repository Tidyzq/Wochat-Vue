<template lang='pug'>
  sidebar.chat-wrapper.no-padding(placement='right')
    h3(v-if='contact') {{ contact.contact.username }}
    .chats-wrapper(v-if='messages')
      .chats-container.container-fluid
        .row.chat-row(v-for='message in messages')
          .col-xs-1.col-sm-1(:class='{"pull-right": isSenderSelf(message)}')
            img.avatar-sm(:src='contacts[message.sender].contact.avatar')
          .col-xs-7.col-sm-7(:class='{"pull-right": isSenderSelf(message)}')
            chatbox(:type='isSenderSelf(message) ? "success" : "info"',
              :placement='isSenderSelf(message) ? "left" : "right"')
              | {{ message.content }}
    .fixd-bottom
      .col-sm-12.no-padding
        textarea.form-control.no-radius(type='text' rows='3' v-model='inputMsg'
          placeholder='Message' @keyup.enter='onInputEnterTriggered')
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
    // 处理输入框的 enter 按下事件
    onInputEnterTriggered (e) {
      if (!e.ctrlKey) {
        // 若 ctrl 未按下，则发送信息
        if (this.inputMsg) {
          // 需要输入信息非空
          let message = this.inputMsg
          this.inputMsg = ''
          this.$store.dispatch('sendMessage', {
              to: this.id,
              message: message
            })
        }
      } else {
        // 若 ctrl 按下，则在信息后加入换行
        this.inputMsg += '\n'
      }
    },
    isSenderSelf (message) {
      return message.sender == this.userSelf._id
    }
  }
}
</script>
<style lang='less'>

@chat-header-height  : 50px;
@chat-inputbox-height: 74px;

.fixd-bottom {
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
}

.chats-wrapper {
  position: absolute;
  top: @chat-header-height;
  bottom: @chat-inputbox-height;
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
