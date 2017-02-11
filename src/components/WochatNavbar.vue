<template lang='pug'>
  navbar(placement='top' formPlacement='right')
    a.navbar-brand(slot='brand' href='/') Wochat
    modal(:show='showModal' v-on:toggle='showModal = arguments[0]' effect='fade' width='400')
      div.modal-header(slot='modal-header')
        h4.modal-title Search Result
      div.modal-body(slot='modal-body')
        .hidden
          a#homeTab(href="#home" aria-controls="home" role="tab" data-toggle="tab")
          a#messageTab(href="#message" aria-controls="message" role="tab" data-toggle="tab")
        .tab-content
          #home.tab-pane.fade.in.active(role="tabpanel")
            .row(v-for='(user, index) in searchRst')
              .col-sm-10
                h5 {{ user.username }} {{ user.nickname }}
              .col-sm-2
                button.btn.btn-warning(:class='{"disabled": invited[index]}' type='button' @click='selectInviteTarget(index)') Invite
          #message.tab-pane.fade(role="tabpanel")
            form
              .form-group
                input.form-control(type='text' placeholder='Invite Message' v-model='inviteMsg')
              .form-group
                button.btn.btn-success(type='submit' @click.prevent='sendInvite(inviteTarget)') Submit
      div.modal-footer(slot='modal-footer')
        button.btn.btn-default(type='button' @click='showModal = false') Close
    li.dropdown
      a.dropdown-toggle(href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false") Invitation
      ul.dropdown-menu
        li.row(v-for='invitation in invitations')
          .col-sm-6
            p {{ extractMessageFromInvitation(invitation.content) }}
          .col-sm-6
            button.btn.btn-success(type='button' @click='acceptInvitation(invitation)') Accept
    div(slot='form')
      .form-group
        input.form-control(type='text' placeholder='Search' v-model='search')
        button.btn.btn-default(type='submit' @click='searchUser') Submit
    li(slot='right')
      button.btn.btn-warning.navbar-btn(type='button' @click='logout()') Logout
</template>

<script>
import Vue from 'vue'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import userApi from '../api/user'
import $ from 'jquery'

export default {
  name: 'wochat-navbar',
  data () {
    return {
      search: '',
      showModal: false,
      searchRst: [],
      invited: [],
      inviteTarget: 0,
      inviteMsg: ''
    }
  },
  computed: {
    userState () {
      return this.$store.state.user
    },
    invitations () {
      return this.$store.state.messages.invitations
    }
  },
  components: {
    Navbar,
    Modal
  },
  methods: {
    logout () {
      this.$store.dispatch('userLogout')
      this.$router.push({ name: 'Login' })
    },
    searchUser (e) {
      e && e.preventDefault()
      userApi.search(this.search)
        .then((searchRst) => {
          this.showSearchRst(searchRst)
        })
    },
    selectInviteTarget (index) {
      if (!this.invited[index]) {
        this.inviteTarget = index
        this.switchTab('message')
      }
    },
    sendInvite (index) {
      if (!this.invited[index]) {
        let user = this.searchRst[index]
        userApi.sendInvitation(user._id, this.inviteMsg, this.userState.accessToken)
          .then(() => {
            this.inviteMsg = ''
            Vue.set(this.invited, index, true)
            this.switchTab('home')
          })
      }
    },
    acceptInvitation (invitation) {
      userApi.acceptInvitation(this.userState.user._id, invitation.content, this.userState.accessToken)
    },
    showSearchRst (searchRst) {
      this.searchRst = searchRst
      for (var i = 0; i < searchRst.length; ++i) {
        Vue.set(this.invited, i, false)
      }
      this.switchTab('home')
      this.showModal = true
    },
    switchTab (tab) {
      $('#' + tab + 'Tab').tab('show')
    },
    extractMessageFromInvitation (invitation) {
      let payload = JSON.parse(atob(invitation.split('.')[1]))
      return payload.message
    }
  }
}
</script>
