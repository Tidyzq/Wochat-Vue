<template lang='pug'>
  sidebar.chat-wrapper.no-padding(placement='right')
    h3(v-if='contact') {{ contact.contact.username }}
    .chats-wrapper
      .chats-container.container-fluid
        div(v-if='messages')
          .chat-row(v-for='(message, index) in arrayMessages')
            .row(v-if='index == 0 || diffMinutes(message.time, arrayMessages[index-1].time) >= 2')
              .col-xs-12.col-sm-12
                timetag(:time='message.time')
            .row
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
import Timetag from '../components/Timetag'
import Moment from 'moment'

export default {
  name: 'chat',
  components: {
    Sidebar,
    Chatbox,
    Timetag
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
    },
    arrayMessages () {
      return Object.values(this.$store.state.messages.messages[this.$route.params.id])
    },
    chatContainer () {
      return this.$el.querySelector('.chats-container')
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
            .then(() => {
              this.scrollToBottom()
            })
        }
      } else {
        // 若 ctrl 按下，则在信息后加入换行
        this.inputMsg += '\n'
      }
    },
    isSenderSelf (message) {
      return message.sender == this.userSelf._id
    },
    diffMinutes (timeA, timeB) {
      return Math.abs(Moment(timeA).diff(Moment(timeB), 'minutes'))
    },
    objectToArray (object) {
      return Object.values(object)
    },
    scrollToBottom () {
      console.log(this.chatContainer)
      if (this.chatContainer) {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight
      }
    }
  },
  mounted () {
    this.scrollToBottom()
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

.timetag-wrapper {
  text-align: center;
}

.timetag {
  display:inline-block;
  color: #fff;
  background-color: #999;
  margin: 0 auto;
  width: auto;
  padding: 2px 6px;
  border-radius: 4px;
}

</style>
