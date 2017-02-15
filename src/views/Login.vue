<template lang='pug'>
.login-wrapper
  .container
    .col-sm-6.col-md-4.col-sm-offset-3.col-md-offset-4
      alert(type='danger', v-model='showAlert', :duration='3000', placement='top-right')
        | {{ errMsg }}
      h1 Log In
      br
      form
        .form-group
          input.form-control(type='username' placeholder='Enter Your Username' v-model='username')
        .form-group
          input.form-control(type='password' placeholder='Enter Your Password' v-model='password')
        br
        .form-group
          button.btn.btn-success(type='submit' @click='sendLogin') Submit
          router-link.btn.btn-primary(:to='{name: "Register"}' tag='button') Register
</template>

<script>
import Alert from '../components/Alert'

export default {
  name: 'login',
  data () {
    return {
      showAlert: false,
      username: '',
      password: '',
      rememberMe: false,
      errMsg: null,
    }
  },
  computed: {
    userState () {
      return this.$store.state.user
    }
  },
  created () {
    if (this.userState.accessToken) {
      console.log('jump to hello')
      this.$router.push({name: 'Hello'})
    }
  },
  methods: {
    sendLogin (event) {
      event.preventDefault() // disable default form submit
      this.$store.dispatch('userLogin', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          console.log('jump to hello')
          this.$router.push({ name: 'Hello' })
        })
        .catch(() => {
          this.showAlert = true
          this.errMsg = 'Invalid Username or Password'
        })
    }
  },
  components: {
    Alert
  }
}
</script>
