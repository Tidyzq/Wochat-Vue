<template lang='pug'>
  modal(:show='show' v-on:toggle='$emit("toggle", arguments[0])' effect='fade' width='400')
    .modal-header(slot='modal-header')
      h4.modal-title Invitations
    .modal-body(slot='modal-body')
      .row(v-for='invitation in invitations')
        .col-sm-10
            p {{ extractMessageFromInvitation(invitation.content) }}
        .col-sm-2
          button.btn.btn-success(type='button' @click='acceptInvitation(invitation)') Accept
    .modal-footer(slot='modal-footer')
      button.btn.btn-default(type='button' @click='closeModal()') Close
</template>

<script>
import Modal from './mixins/Modal'

export default {
  name: 'accept-invitation-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    invitations () {
      return this.$store.state.messages.invitations
    }
  },
  components: {
    Modal
  },
  methods: {
    acceptInvitation (invitation) {
      this.$store.dispatch('acceptInvitation', invitation._id)
    },
    extractMessageFromInvitation (invitation) {
      let payload = JSON.parse(atob(invitation.split('.')[1]))
      return payload.message
    },
    closeModal () {
      this.$emit('toggle', false)
    }
  }
}
</script>