<template lang='pug'>
.hello-wrapper
  navbar(placement='top' formPlacement='right')
    a.navbar-brand(slot='brand' href='/') Wochat
    modal(:show='showCustomModal' v-on:toggle='showCustomModal = arguments[0]' effect='fade' width='400')
      div.modal-header(slot='modal-header')
        h4.modal-title Search Result
      div.modal-body(slot='modal-body') body
      div.modal-footer(slot='modal-footer')
        button.btn.btn-default(type='button' @click='showCustomModal = false') Exit
        button.btn.btn-success(type='button' @click='showCustomModal = false') Custom Save
    div(slot='form')
      .form-group
        input.form-control(type='text' placeholder='Search' v-model='search')
        button.btn.btn-default(type='submit' @click='searchUser') Submit
    li(slot='right')
      button.btn.btn-warning.navbar-btn(type='button' @click='logout()') Logout
  .container
    h1 User State
    li user: {{ userState.user }}
    li accessToken: {{ userState.accessToken }}
    li refreshToken: {{ userState.refreshToken }}
    h1 Contacts
    li(v-for='(contact, id) in contacts')
      router-link(:to='{ name: "Chat", params: { id: id }}') {{ contact.contact.username }}
    h1 Chat
    router-view
</template>

<script>
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import userApi from '../api/user'

export default {
  name: 'hello',
  data () {
    return {
      search: '',
      showCustomModal: false
    }
  },
  computed: {
    userState () {
      return this.$store.state.user
    },
    contacts () {
      return this.$store.state.contacts.contacts
    }
  },
  created () {
    if (! this.userState.accessToken) {
      console.log('jump to login')
      return this.$router.push({ name: 'Login'})
    }
    this.$store.dispatch('socketConnect')
      .then(() => {
        console.log('auth success')
        this.$store.dispatch('getContacts')
        this.$store.dispatch('receiveMessages')
      })
      .catch(() => {
        this.$store.dispatch('userLogout')
        this.$router.push('login')
      })
  },
  components: {
    Navbar,
    Modal
  },
  methods: {
    logout () {
      this.$store.dispatch('userLogout')
      this.$router.push('login')
    },
    searchUser (e) {
      e && e.preventDefault()
      userApi.search(this.search)
        .then((searchRst) => {
          console.log(searchRst)
          this.showCustomModal = true
        })
    }
  }
}
</script>
