<template lang='pug'>
  span(ref:trigger)
    slot
  .popover(ref:popover, v-if="show"
    :class="{
      'top': placement == 'top',\
      'left': placement == 'left',\
      'right': placement == 'right',\
      'bottom': placement == 'bottom'\
    }"
    :transition="effect")
    .arrow
    h3.popover-title(v-if="title")
      slot(name="title") {{ title }}
    .popover-content
      slot(name="content") {{{ content }}}
</template>

<script>
import $ from '../../utils/nodeList'

export default {
  props: {
    trigger: {
      type: String
      default: 'click'
    },
    effect: {
      type: String,
      default: 'fade'
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    header: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  data () {
    return {
      position: {
        top: 0,
        left: 0
      },
      show: false
    }
  },
  methods: {
    toggle (e) {
      if (e && this.trigger === 'contextmenu') e.preventDefault()
      if (!(this.show = !this.show)) { return }
      setTimeout(() => {
        const popover = this.$els.popover
        const trigger = this.$els.trigger.children[0]
        switch (this.placement) {
          case 'top' :
            this.position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2
            this.position.top = trigger.offsetTop - popover.offsetHeight
            break
          case 'left':
            this.position.left = trigger.offsetLeft - popover.offsetWidth
            this.position.top = trigger.offsetTop + trigger.offsetHeight / 2 - popover.offsetHeight / 2
            break
          case 'right':
            this.position.left = trigger.offsetLeft + trigger.offsetWidth
            this.position.top = trigger.offsetTop + trigger.offsetHeight / 2 - popover.offsetHeight / 2
            break
          case 'bottom':
            this.position.left = trigger.offsetLeft - popover.offsetWidth / 2 + trigger.offsetWidth / 2
            this.position.top = trigger.offsetTop + trigger.offsetHeight
            break
          default:
            console.warn('Wrong placement prop')
        }
        popover.style.top = this.position.top + 'px'
        popover.style.left = this.position.left + 'px'
      }, 0)
    }
  },
  ready () {
    let trigger = this.$els.trigger
    if (!trigger) return console.error('Could not find trigger v-el in your component that uses popoverMixin.')

    if (this.trigger === 'focus' && !~trigger.tabIndex) {
      trigger = $('a,input,select,textarea,button', trigger)
      if (!trigger.length) { trigger = null }
    }
    if (trigger) {
      let events = { contextmenu: 'contextmenu', hover: 'mouseleave mouseenter', focus: 'blur focus' }
      $(trigger).on(events[this.trigger] || 'click', this.toggle)
      this._trigger = trigger
    }
  },
  beforeDestroy () {
    if (this._trigger) $(this._trigger).off()
  }
}
</script>

<style>
.popover.top,
.popover.left,
.popover.right,
.popover.bottom {
  display: block;
}
.scale-enter {
  animation:scale-in 0.15s ease-in;
}
.scale-leave {
  animation:scale-out 0.15s ease-out;
}
@keyframes scale-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes scale-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>