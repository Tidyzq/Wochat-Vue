<template lang='pug'>
  modal(:show='show' v-on:toggle='$emit("toggle", arguments[0])' effect='fade' width='400')
    .modal-header(slot='modal-header')
      h4.modal-title Search Result
    .modal-body(slot='modal-body')
      tab-set(:active='activeTab' v-on:select='activeTab = arguments[0]')
        tab
          .row(v-for='(user, index) in userList')
            .col-sm-10
              h5 {{ user.username }} {{ user.nickname }}
            .col-sm-2
              button.btn.btn-warning(:class='{"disabled": invited[index]}' type='button' @click='selectInviteTarget(index)') Invite
        tab
          form
            .form-group
              input.form-control(type='text' placeholder='Invite Message' v-model='inviteMsg')
    .modal-footer(slot='modal-footer')
      button.btn.btn-default(type='button' v-show='activeTab == 0' @click='closeModal()') Close
      button.btn.btn-default(type='button' v-show='activeTab == 1' @click='activeTab = 0') Back
      button.btn.btn-primary(type='button' v-show='activeTab == 1' @click='sendInvitation(inviteTarget, inviteMsg)') Send
</template>

<script>
import Modal from './mixins/Modal'
import TabSet from './mixins/TabSet'
import Tab from './mixins/Tab'

export default {
  name: 'send-invitation-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    userList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      invited: [],
      inviteTarget: 0,
      inviteMsg: '',
      activeTab: 0
    }
  },
  watch: {
    show (val) {
      if (val)
        this.activeTab = 0
    },
    userList (val) {
      const count = val.length
      for (var i = 0; i < count; ++i) {
        this.$set(this.invited, i, false)
      }
    },
    activeTab (val) {
      if (val == 1)
        this.inviteMsg = ''
    }
  },
  components: {
    Modal,
    TabSet,
    Tab
  },
  methods: {
    selectInviteTarget (index) {
      if (!this.invited[index]) {
        this.inviteTarget = index
        this.activeTab = 1
      }
    },
    sendInvitation (index, message) {
      if (!this.invited[index]) {
        let user = this.userList[index]
        this.$store.dispatch('sendInvitation', { to: user._id, message: message })
          .then(() => {
            this.$set(this.invited, index, true)
            this.activeTab = 0
          })
      }
    },
    closeModal () {
      this.$emit('toggle', false)
    }
  }
}
</script>