<template lang='pug'>
  .wochat-navbar-wrapper
    navbar(placement='top' formPlacement='right')
      a.navbar-brand(slot='brand' href='/') Wochat
      send-invitation-modal(:show='showSendInvitationModal', :userList='searchRst', v-on:toggle='showSendInvitationModal = arguments[0]')
      accept-invitation-modal(:show='showAcceptInvitationModal', v-on:toggle='showAcceptInvitationModal = arguments[0]')
      li
        a(href="#" role="button" aria-haspopup="true" aria-expanded="false" @click.prevent='showAcceptInvitationModal = true')
          | Invitation
          span.label.label-danger(v-show='numberOfInvitations != 0') {{ numberOfInvitations }}
      li(slot='right')
        .navbar-form
          .form-group
            input.form-control(type='text' placeholder='Search' v-model='search')
            button.btn.btn-default(type='submit' @click.prevent='searchUser(search)') Submit
      li(slot='right')
        button.btn.btn-warning.navbar-btn(type='button' @click='logout()') Logout
</template>

<script>
import Vue from 'vue'
import Navbar from '../components/Navbar'
import userApi from '../api/user'
import SendInvitationModal from '../components/SendInvitationModal'
import AcceptInvitationModal from '../components/AcceptInvitationModal'

export default {
  name: 'wochat-navbar',
  data () {
    return {
      search: '',
      showSendInvitationModal: false,
      showAcceptInvitationModal: false,
      searchRst: []
    }
  },
  computed: {
    userState () {
      return this.$store.state.user
    },
    numberOfInvitations() {
      return Object.keys(this.$store.state.messages.invitations).length
    }
  },
  components: {
    Navbar,
    SendInvitationModal,
    AcceptInvitationModal
  },
  methods: {
    logout () {
      this.$store.dispatch('userLogout')
      this.$router.push({ name: 'Login' })
    },
    searchUser (search) {
      userApi.search(search)
        .then((searchRst) => {
          this.showSearchRst(searchRst)
        })
    },
    showSearchRst (searchRst) {
      this.searchRst = searchRst
      this.showSendInvitationModal = true
    }
  }
}
</script>
<style lang='less'>

.wochat-navbar-wrapper {
  position: absolute;
  .navbar {
    margin: 0;
  }
}

</style>

