import Vue from 'vue'
import authApi from '../../api/auth'

export const refreshOnFailure = (method) => {
  if (typeof method == 'function') {
    return method()
      .catch((err) => {
        console.log('begin refresh', err)
        console.log(Vue.store)
        return Vue.store.dispatch('userRefresh')
          .then(() => {
            return method()
          })
      })
  } else {
    return Promise.reject(Error('method is not a function'))
  }
}
