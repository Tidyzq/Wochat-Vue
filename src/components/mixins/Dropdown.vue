<template lang='pug'>
  li(v-if="isLi", ref:dropdown, :class="classes")
    slot(name="button")
      a.dropdown-toggle(role="button", :class="{disabled: disabled}", @click='_show = !_show')
        | {{ text }}
        span.caret
    slot(name="dropdown-menu")
      ul.dropdown-menu
        slot
  div(v-else, ref:dropdown, :class="classes")
    slot(name="before")
    slot(name="button")
      button.btn.dropdown-toggle(type="button", :class="'btn-' + type", @click='_show = !_show', :disabled="disabled")
        | {{ text }}
        span.caret
    slot(name="dropdown-menu")
      ul.dropdown-menu
        slot
</template>
<script>

import $ from '../../utils/nodeList.js'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    class: null,
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    classes () {
      return [{open: this.show, disabled: this.disabled}, this.class, this.isLi ? 'dropdown' : this.inInput ? 'input-group-btn': 'btn-group']
    },
    inInput () { return this.$parent._input },
    isLi () { return this.$parent._navbar || this.$parent.menu || this.$parent._tabset },
    menu () {
      return !this.$parent || this.$parent.navbar
    },
    submenu () {
      return this.$parent && (this.$parent.menu || this.$parent.submenu)
    },
    slots () {
      return this._slotContents
    },
    _show: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('toggle', val)
      }
    }
  },
  methods: {
    blur () {
      this.unblur()
      this._hide = setTimeout(() => {
        this._hide = null
        this._show = false
      }, 100)
    },
    unblur () {
      if (this._hide) {
        clearTimeout(this._hide)
        this._hide = null
      }
    }
  },
  ready () {
    const $el = $(this.$els.dropdown)
    $el.onBlur((e) => { this._show = false })
    $el.findChildren('a,button.dropdown-toggle').on('click', e => {
      e.preventDefault()
      if (this.disabled) { return false }
      this._show = !this._show
      return false
    })
    $el.findChildren('ul').on('click', 'li>a', e => { this._show = false })
  },
  beforeDestroy () {
    const $el = $(this.$els.dropdown)
    $el.offBlur()
    $el.findChildren('a,button').off()
    $el.findChildren('ul').off()
  }
}
</script>

<style scoped>
.secret {
  position: absolute;
  clip: rect(0 0 0 0);
  overflow: hidden;
  margin: -1px;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
}
</style>