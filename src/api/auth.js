import Vue from 'vue'

export default {
  login (username, password) {
    return Vue.http.post('http://localhost:1337/api/auth/login', {
        username: username,
        password: password
      })
      .then(({ body }) => {
        return body
      })
  },
  register (username, nickname, password) {
    return Vue.http.post('http://localhost:1337/api/auth/register', {
        username: username,
        nickname: nickname,
        password: password
      })
      .then(({ body }) => {
        return body
      })
  },
  refresh (refreshToken) {
    return Vue.http.post('http://localhost:1337/api/auth/refresh', {
        refreshToken: refreshToken
      })
      .then(({ body }) => {
        return body
      })
  }
}