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
  },
  search (search) {
    return Vue.http.get('http://localhost:1337/api/users/search?search=' + search)
      .then(({ body }) => {
        return body
      })
  }
}