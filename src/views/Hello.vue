<template lang='pug'>
.hello-wrapper
  button(@click='logout()') logout
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
import io from '../api/socket'

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
      return this.$router.push('login')
    }
    io.connect()
      .then(() => {
        return io.auth(this.userState.accessToken)
          .catch(() => {
            return this.$store.dispatch('userRefresh')
          })
          .then(() => {
            return io.auth(this.userState.accessToken)
          })
      })
      .then(() => {
        console.log('auth success')
        this.$store.dispatch('getContacts')
        io.emit('receive')
      })
      .then(() => {
        io.on('message', (messages) => {
          console.log(messages)
          this.$store.dispatch('addChats', messages)
        })
      })
      .catch(() => {
        this.$store.dispatch('userLogout')
        this.$router.push('login')
      })
  },
  components: {
    Navbar
  },
  methods: {
    logout () {
      this.$store.dispatch('userLogout')
      this.$router.push('login')
    }
  }
}
</script>
