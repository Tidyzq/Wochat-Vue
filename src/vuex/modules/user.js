import auth from '../../api/auth'
import io from '../../api/socket'
import { refreshOnFailure } from './utils'
import * as types from '../mutation-types'

let saveStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

let loadStorage = (key, def) => {
  let data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (e) {
    return def
  }
}

let extractUser = (token) => {
  try {
    if (token && typeof token === 'string') {
      let encoded = token.split('.')[1]
      let decoded = JSON.parse(atob(encoded))
      return decoded.user || {}
    }
  } catch (e) {
    return {}
  }
  return {}
}

export default {
  state: {
    user: extractUser(loadStorage('refreshToken', '')),
    accessToken: loadStorage('accessToken', ''),
    refreshToken: loadStorage('refreshToken', ''),
  },
  mutations: {
    [types.UPDATE_ACCESS_TOKEN] (state, accessToken) {
      state.accessToken = accessToken
      saveStorage('accessToken', accessToken)
    },
    [types.UPDATE_REFRESH_TOKEN] (state, refreshToken) {
      state.refreshToken = refreshToken
      saveStorage('refreshToken', refreshToken)
      let user = extractUser(refreshToken)
      state.user = user
      saveStorage('user', extractUser(refreshToken))
    }
  },
  actions: {
    userLogin ({ commit, state }, { username, password }) {
      return auth.login(username, password)
        .then(({ user, accessToken, refreshToken }) => {
          commit(types.UPDATE_ACCESS_TOKEN, accessToken)
          commit(types.UPDATE_REFRESH_TOKEN, refreshToken)
        })
    },
    userLogout ({ commit, state }) {
      commit(types.UPDATE_ACCESS_TOKEN, '')
      commit(types.UPDATE_REFRESH_TOKEN, '')
      commit(types.CLEAR_CONTACT)
      commit(types.CLEAR_INVITATION)
      commit(types.CLEAR_MESSAGE)
    },
    userRefresh ({ commit, state, dispatch }) {
      console.log('refreshing')
      return auth.refresh(state.refreshToken)
        .then(({ accessToken, refreshToken }) => {
          commit(types.UPDATE_ACCESS_TOKEN, accessToken)
          commit(types.UPDATE_REFRESH_TOKEN, refreshToken)
        })
        .catch((err) => {
          dispatch('userLogout')
          throw err
        })
    },
    socketConnect ({ commit, state, dispatch }) {
        return io.connect()
          .then(() => {
            console.log('socket connected')
            return refreshOnFailure(() => {
              console.log('socket auth')
              return io.auth(state.accessToken)
            })
          })
    }
  }
}