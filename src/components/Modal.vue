<template lang='pug'>
  div(role='dialog', v-bind:class="{\
    'modal':true,\
    'fade':effect === 'fade',\
    'zoom':effect === 'zoom'\
  }")
    div(v-bind:class="{'modal-dialog':true,'modal-lg':large,'modal-sm':small}", role='document', v-bind:style='{width: optionalWidth}')
      .modal-content
        slot(name='modal-header')
          .modal-header
            button.close(type='button', @click='close')
              span ×
            h4.modal-title
              slot(name='title')
                | {{title}}
        slot(name='modal-body')
          .modal-body
        slot(name='modal-footer')
          .modal-footer
            button.btn.btn-default(type='button', @click='close') {{ cancelText }}
            button.btn.btn-primary(type='button', @click='callback') {{ okText }}
</template>

<script>
import $ from 'jquery'

export default {
  props: {
    okText: {
      type: String,
      default: 'Save changes'
    },
    cancelText: {
      type: String,
      default: 'Close'
    },
    title: {
      type: String,
      default: ''
    },
    show: {
      required: true,
      type: Boolean
    },
    width: {
      default: null
    },
    callback: {
      type: Function,
      default () {}
    },
    effect: {
      type: String,
      default: null
    },
    backdrop: {
      type: Boolean,
      default: true
    },
    large: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    optionalWidth () {
      if (this.width === null) {
        return null
      } else if (Number.isInteger(this.width)) {
        return this.width + 'px'
      }
      return this.width
    }
  },
  watch: {
    show (val) {
      const el = this.$el
      const body = document.body
      if (val) {
        $(el).find('.modal-content').focus()
        el.style.display = 'block'
        setTimeout(() => $(el).addClass('in'), 0)
        $(body).addClass('modal-open')
        if (this.backdrop) {
          $(el).on('click', e => {
            if (e.target === el) this.$emit('toggle', false)
          })
        }
      } else {
        body.style.paddingRight = null
        $(body).removeClass('modal-open')
        $(el).removeClass('in').on('transitionend', () => {
          $(el).off('click transitionend')
          el.style.display = 'none'
        })
      }
    }
  },
  methods: {
    close () {
      this.$emit('toggle', false)
    }
  }
}
</script>
<style>
.modal {
  transition: all 0.3s ease;
}
.modal.in {
  background-color: rgba(0,0,0,0.5);
}
.modal.zoom .modal-dialog {
  -webkit-transform: scale(0.1);
  -moz-transform: scale(0.1);
  -ms-transform: scale(0.1);
  transform: scale(0.1);
  top: 300px;
  opacity: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}
.modal.zoom.in .modal-dialog {
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  -webkit-transform: translate3d(0, -300px, 0);
  transform: translate3d(0, -300px, 0);
  opacity: 1;
}
</style>