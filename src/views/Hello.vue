<template lang='pug'>
.hello-wrapper
  wochat-navbar
  .hello-container.container
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
import Vue from 'vue'
import WochatNavbar from '../components/WochatNavbar'
import userApi from '../api/user'
import $ from 'jquery'

export default {
  name: 'hello',
  data () {
    return {

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
    WochatNavbar
  },
  methods: {

  }
}
</script>
<style>
.hello-container {
  margin-top: 50px
}
</style>
