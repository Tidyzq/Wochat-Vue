<template lang='pug'>
  //- span(v-el:trigger)
  span
    slot
  //- div(v-el:popover v-if="show"
  div(v-if="show"
    :class="['popover',placement]"
    :transition="effect")
    .arrow
    h3.popover-title(v-if="title")
      slot(name="title") {{ title }}
    .popover-content
      slot(name="content") {{{ content }}}
</template>

<script>
//- import PopoverMixin from './utils/popoverMixins.js'
export default {
  //- mixins: [PopoverMixin],
  props: {
    trigger: {
      type: String,
      default: 'click'
    }
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