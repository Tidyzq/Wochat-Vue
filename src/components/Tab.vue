<template lang='pug'>
  .tab-pane.active(role="tabpanel" v-show="show",
    :class="{hide: !show}",
    :transition="transition")
    slot
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    active () {
      return this._tabset.show === this
    },
    index () {
      return this._tabset.tabs.indexOf(this)
    },
    show () {
      return this._tabset && this._tabset.active === this._tabset.tabs.indexOf(this)
    },
    transition () {
      return this._tabset ? this._tabset.effect : null
    }
  },
  created () {
    this._ingroup = this.$parent && this.$parent._tabgroup
    let tabset = this
    while (tabset && tabset._tabset!==true && tabset.$parent) {
      tabset = tabset.$parent
    }
    if (!tabset._tabset) {
      this._tabset = {}
      console.warn('Warning: "tab" depend on "tabset" to work properly.')
    } else {
      tabset.tabs.push(this)
      this._tabset = tabset
    }
    if (this._ingroup) {
      this.$parent.tabs.push(this)
    }
  },
  beforeDestroy () {
    if (this._tabset.active === this.index) { this._tabset.active = 0 }
    if (this._ingroup) {
      this.$parent.tabs.splice(this.index, 1)
    }
    this.$parent.tabs.splice(this.index, 1)
  }
}
</script>