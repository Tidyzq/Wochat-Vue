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
  },
  sendInvitation (receiver, message, accessToken) {
    return Vue.http.post('http://localhost:1337/api/users/' + receiver + '/invitation', {
        message: message
      }, {
        headers: {
          Authorization: 'JWT ' + accessToken
        }
      })
      .then(({ body }) => {
        return body
      })
  },
  acceptInvitation (id, invitation, accessToken) {
    return Vue.http.post('http://localhost:1337/api/users/' + id + '/invitation/accept', {
        invitation: invitation
      }, {
        headers: {
          Authorization: 'JWT ' + accessToken
        }
      })
      .then(({ body }) => {
        return body
      })
  }
}