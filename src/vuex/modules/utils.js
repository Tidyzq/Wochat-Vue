import Vue from 'vue'
import authApi from '../../api/auth'

export const refreshOnFailure = (method) => {
  if (typeof method == 'function') {
    return method()
      .catch((err) => {
        console.log('refreshOnFailure got error:', err)
        if (err.status == 401) {
          return Vue.store.dispatch('userRefresh')
            .then(() => {
              return method()
            })
        }
        throw err
      })
  } else {
    return Promise.reject(Error('method is not a function'))
  }
}
