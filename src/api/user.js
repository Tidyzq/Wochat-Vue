import Vue from 'vue'

export default {
  find (id, accessToken) {
    return Vue.http.get('http://localhost:1337/api/users/' + id, {
        headers: {
          Authorization: 'JWT ' + accessToken
        }
      })
      .then(({ body }) => {
        return body
      })
  }
}