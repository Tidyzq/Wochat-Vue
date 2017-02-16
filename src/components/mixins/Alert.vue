<template lang='pug'>
  .fade-transition(
    v-bind:class="{\
      'fade-leave'    : !show,\
      'alert'         : true,\
      'alert-success' : (type == 'success'),\
      'alert-warning' : (type == 'warning'),\
      'alert-info'    : (type == 'info'),\
      'alert-danger'  : (type == 'danger'),\
      'top'           : (placement === 'top'),\
      'top-right'     : (placement === 'top-right'),\
      'bottom'        : (placement === 'bottom')\
    }"
    transition='fade'
    v-bind:style='{width:width}'
    role='alert')
    button.close(v-show='dismissable' type='button'
      @click='show = false')
      span &times;
    slot
</template>

<script>
export default {
  name: 'alert',
  props: {
    type: String,
    dismissable: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 0
    },
    width: String,
    placement: String
  },
  data () {
    return {
      show: this.value
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
      if (this._timeout) clearTimeout(this._timeout)
      if (val && Boolean(this.duration)) {
        this._timeout = setTimeout(() => { this.show = false }, this.duration)
      }
    }
  }
}
</script>

<style>
.fade-transition {
  transition: opacity .3s ease;
}
.fade-enter,
.fade-leave {
  height: 0;
  opacity: 0;
}
.alert.bottom {
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1050;
}
.alert.top {
  position: fixed;
  top: 0;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 1050;
}
.alert.top-right {
  position: fixed;
  top: 30px;
  right: 50px;
  z-index: 1050;
}
</style>
