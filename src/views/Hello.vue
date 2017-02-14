<template lang='pug'>
.hello-wrapper
  wochat-navbar
  .hello-container
    contact-list.col-sm-4
    router-view.col-sm-8
</template>

<script>
import WochatNavbar from '../components/WochatNavbar'
import ContactList from '../components/ContactList'

export default {
  name: 'hello',
  data () {
    return {

    }
  },
  computed: {
    userState () {
      return this.$store.state.user
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
    WochatNavbar,
    ContactList
  },
}
</script>
<style lang='less'>

.hello-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  padding-top: 50px;
  overflow: auto;
  .hello-container {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: auto;
  }
}

.avatar-sm {
  height: 40px;
  width: 40px;
  border-radius: 4px;
}

</style>
