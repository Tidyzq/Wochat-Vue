import Vue from 'vue'

export default {
  getContacts (user, accessToken) {
    return Vue.http.get('http://localhost:1337/api/users/' + user._id + '/contacts?populate=1', {
        headers: {
          Authorization: 'JWT ' + accessToken
        }
      })
      .then(({ body }) => {
        return body
      })
  }
}