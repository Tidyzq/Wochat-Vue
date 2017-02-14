<template lang='pug'>
  aside.sidebar(v-bind:class="{\
      left:placement === 'left',\
      right:placement === 'right'\
    }")
    slot
</template>

<script>
import $ from 'jquery'

export default {
  name: 'sidebar',
  props: {
    placement: {
      type: String,
      default: 'left'
    }
  }
}
</script>

<style>
.sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0;
  height: 100%;
  white-space: nowrap;
}
.sidebar.left {
  left: 0;
  right: auto;
}
.sidebar.right {
  left: auto;
  right: 0;
}
.sidebar:focus {
  outline: 0
}

</style>