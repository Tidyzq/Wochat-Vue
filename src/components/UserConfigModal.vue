<template lang='pug'>
  modal(:show='show' v-on:toggle='$emit("toggle", arguments[0])' effect='fade' width='400')
    .modal-header(slot='modal-header')
      h4.modal-title User Config
    .modal-body(slot='modal-body')
      form

    .modal-footer(slot='modal-footer')
      button.btn.btn-default(type='button' @click='closeModal()') Close
      button.btn.btn-success(type='button' @click='') Save
</template>

<script>
import Modal from './mixins/Modal'

export default {
  name: 'user-config-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  components: {
    Modal
  },
  methods: {
    closeModal () {
      this.$emit('toggle', false)
    }
  }
}
</script>