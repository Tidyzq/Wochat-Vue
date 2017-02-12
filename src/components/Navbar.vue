<template lang='pug'>
  nav.navbar(:class="{\
      'navbar-inverse'     : (type == 'inverse'),\
      'navbar-default'     : (type == 'default'),\
      'navbar-fixed-top'   : (placement === 'top'),\
      'navbar-fixed-bottom': (placement === 'bottom'),\
      'navbar-static-top'  : (placement === 'static')\
    }")
    .container-fluid
      .navbar-header
        button.navbar-toggle.collapsed(type='button' aria-expanded='false' @click='toggleCollapse')
          span.sr-only Toggle navigation
          span.icon-bar
          span.icon-bar
          span.icon-bar
        slot(name='brand')
      .collapse.navbar-collapse(:class="{in: !collapsed}")
        ul.nav.navbar-nav
          slot
        ul.nav.navbar-nav.navbar-right
          slot(name='right')
</template>

<script>
export default {
  name: 'navbar',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    placement: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      collapsed: true,
    }
  },
  methods: {
    toggleCollapse (e) {
      e && e.preventDefault()
      this.collapsed = !this.collapsed
    }
  }
}
</script>
<style>
.navbar {
  margin: 0;
}
</style>
