<template lang='pug'>
.hello-wrapper
  wochat-navbar
  .hello-container
    contact-list.col-xs-4.col-sm-4
    router-view.col-xs-8.col-sm-8
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
  beforeDestroy () {
    console.log('before destroy')
      alert("This message was triggered from the onunload event")
  }
}
</script>
<style lang='less'>

@hello-min-width: 769px;
@hello-min-height: 385px;
@navbar-height: 50px;

.hello-wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
  min-width: @hello-min-width;
  min-height: @hello-min-height;
  top: 0;
  left: 0;
  overflow: auto;
  .hello-container {
    position: absolute;
    top: @navbar-height;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
}

.avatar-sm {
  height: 40px;
  width: 40px;
  border-radius: 4px;
}

</style>
