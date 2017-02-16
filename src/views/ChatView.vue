<template lang='pug'>
  sidebar.chat-wrapper.no-padding(placement='right')
    .chat-header
      p.contact-name(v-if='contact') {{ contact.contact.username }}
    .chats-wrapper
      .chats-container.container-fluid
        div(v-if='messages')
          .chat-row(v-for='(message, index) in arrayMessages')
            .row(v-if='index == 0 || diffMinutes(message.time, arrayMessages[index-1].time) >= 2')
              .col-xs-12.col-sm-12
                timetag(:time='message.time')
            .row
              //- .col-xs-2.col-sm-2(:class='{"pull-right": isSenderSelf(message)}')
                img.avatar-sm(:src='contacts[message.sender].contact.avatar')
              img.avatar-sm.chat-avatar(:class='{"pull-right": isSenderSelf(message)}', :src='contacts[message.sender].contact.avatar')
              .col-xs-7.col-sm-7.no-padding(:class='{"pull-right": isSenderSelf(message)}')
                chatbox(:type='isSenderSelf(message) ? "success" : "info"',
                  :placement='isSenderSelf(message) ? "left" : "right"')
                  //- | {{ message.content }}
                  chat(:text='message.content')
    .fixd-bottom
      .col-sm-12.no-padding
        textarea.form-control.no-radius(type='text' rows='3' v-model='inputMsg'
          placeholder='Message' @keydown.enter='onInputEnterTriggered')
</template>

<script>
import Sidebar from '../components/mixins/Sidebar'
import Chatbox from '../components/mixins/Chatbox'
import Chat from '../components/mixins/Chat'
import Timetag from '../components/mixins/Timetag'
import Moment from 'moment'

export default {
  name: 'chat-view',
  components: {
    Sidebar,
    Chatbox,
    Chat,
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
      e.preventDefault()
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
    this.$nextTick(() => {
      this.scrollToBottom()
    })
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

.chat-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: @chat-header-height;
  border-bottom-color: rgb(221, 221, 221);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  .contact-name {
    color: #333;
    float: left;
    margin: 8px 40px;
    font-size: 24px;
  }
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
    .chat-avatar {
      margin: 0 20px;
      float: left;
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
