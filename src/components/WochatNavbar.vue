<template lang='pug'>
  .wochat-navbar-wrapper
    send-invitation-modal(:show='showSendInvitationModal', :userList='searchRst', v-on:toggle='showSendInvitationModal = arguments[0]')
    accept-invitation-modal(:show='showAcceptInvitationModal', v-on:toggle='showAcceptInvitationModal = arguments[0]')
    user-config-modal(:show='showUserConfigModal', v-on:toggle='showUserConfigModal = arguments[0]')
    navbar(placement='static')
      a.navbar-brand(slot='brand' href='/') Wochat
      ul.nav.navbar-nav
        li
          a(href="#" role="button" aria-haspopup="true" aria-expanded="false" @click.prevent='showAcceptInvitationModal = true')
            | Invitation
            span.label.label-danger(v-show='numberOfInvitations != 0') {{ numberOfInvitations }}
      .navbar-form.navbar-left
        .form-group
          input.form-control(type='text' placeholder='Search' v-model='search')
          button.btn.btn-default(type='submit' @click.prevent='searchUser(search)') Submit
      ul.nav.navbar-nav.navbar-right
        li.dropdown
          a.dropdown-toggle(href='#' data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false") {{ userState.user.username }}
            span.caret
          ul.dropdown-menu
            li
              a(href='#' @click.prevent='showUserConfigModal = true') Config
              a(href='#' @click.prevent='logout()') Logout
</template>

<script>
import Vue from 'vue'
import Navbar from '../components/Navbar'
import userApi from '../api/user'
import UserConfigModal from '../components/UserConfigModal'
import SendInvitationModal from '../components/SendInvitationModal'
import AcceptInvitationModal from '../components/AcceptInvitationModal'

export default {
  name: 'wochat-navbar',
  data () {
    return {
      search: '',
      showSendInvitationModal: false,
      showAcceptInvitationModal: false,
      showUserConfigModal: false,
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
    UserConfigModal,
    SendInvitationModal,
    AcceptInvitationModal,
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
  position: relative;
}

</style>

