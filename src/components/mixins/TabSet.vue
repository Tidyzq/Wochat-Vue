<template lang='pug'>
  .tab-content
    slot
</template>

<script>
export default {
  props: {
    navStyle: {
      type: String,
      default: 'tabs'
    },
    effect: {
      type: String,
      default: 'fadein'
    },
    active: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      show: null,
      headers: [],
      tabs: []
    }
  },
  created () {
    this._tabset = true
  },
  watch: {
    active (val) {
      this.show = this.tabs[val]
    }
  },
  ready () {
    this.show = this.tabs[this.active]
  },
  methods: {
    select (tab) {
      if (!tab.disabled) {
        this.$emit('select', tab.index)
      }
    }
  }
}
</script>

<style scoped>
.nav-tabs {
  margin-bottom: 15px;
}
</style>