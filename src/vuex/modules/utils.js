import Vue from 'vue'
import authApi from '../../api/auth'

export const refreshOnFailure = (dispatch) => {
  return (method) => {
    if (typeof method == 'function') {
      return method()
        .catch((err) => {

          return dispatch('userRefresh')
            .then(() => {
              return method()
            })
        })
    } else {
      return Promise.reject(Error('method is not a function'))
    }
  }
}
