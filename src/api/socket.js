import io from 'socket.io-client'

export default {
  socket: null,
  connect () {
    if (this.socket) this.socket.close()
    let socket = io('http://localhost:1337')
    return new Promise((resolve, reject) => {
      socket.on('connect', () => {
        this.socket = socket
        resolve()
      })
      socket.on('connect_error', () => {
        reject()
      })
      socket.on('connect_timeout', () => {
        reject()
      })
    })
  },
  emit (event, data) {
    if (this.socket)
      this.socket.emit(event, data)
  },
  on (event, handler) {
    if (this.socket)
      this.socket.on(event, handler)
  },
  off (event, handler) {
    if (this.socket)
      this.socket.removeListener(event, handler)
  },
  once (event, handler) {
    let listener = () => {
      handler.apply(this, arguments)
      this.socket.removeListener(event, listener)
    }
    if (this.socket)
      this.socket.on(event, listener)
  },
  auth (accessToken) {
    return new Promise((resolve, reject) => {
      this.emit('auth', accessToken)
      var onSuccess, onFail

      onSuccess = () => {
        this.off('auth:success', onSuccess)
        this.off('auth:fail', onFail)
        resolve()
      }

      onFail = () => {
        this.off('auth:success', onSuccess)
        this.off('auth:fail', onFail)
        reject()
      }

      this.on('auth:success', onSuccess)
      this.on('auth:fail', onFail)
    })
  },
  close () {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  }
}