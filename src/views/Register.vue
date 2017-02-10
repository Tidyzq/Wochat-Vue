<template lang='pug'>
.login-wrapper
  .container
    .col-sm-6.col-md-4.col-sm-offset-3.col-md-offset-4
      alert(type='danger', v-model='showAlert', :duration='3000', placement='top-right')
        | {{ errMsg }}
      h1 Register
      br
      form
        .form-group
          input.form-control(type='username' placeholder='Enter Your Username' v-model='username')
        .form-group
          input.form-control(type='username' placeholder='Enter Your Nickname' v-model='nickname')
        .form-group
          input.form-control(type='password' placeholder='Enter Your Password' v-model='password')
        .form-group(v-bind:class='{"has-error": repeatPwd != password}')
          input.form-control(type='password' placeholder='Repeat Your Password' v-model='repeatPwd')
        br
        .form-group
          button.btn.btn-success(type='submit' @click='sendRegister') Submit
          router-link.btn.btn-primary(:to='{name: "Login"}' tag='button') Login
</template>

<script>
import Alert from '../components/Alert'
import auth from '../api/auth'

export default {
  name: 'register',
  data () {
    return {
      showAlert: false,
      username: '',
      nickname: '',
      password: '',
      repeatPwd: '',
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
      console.log('jump to login')
      this.$router.push({ name: 'Login' })
    }
  },
  methods: {
    sendRegister (event) {
      event.preventDefault() // disable default form submit

      auth.register(this.username, this.nickname, this.password)
        .then(() => {
          console.log('jump to login')
          this.$router.push({ name: 'Login' })
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
