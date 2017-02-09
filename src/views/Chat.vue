<template lang='pug'>
.chat-wrapper
  h3(v-if='contact') {{ contact.contact.username }}
  li(v-for='chat in (contact ? contact.chats : [])') {{ chat.content }}
</template>

<script>
export default {
  name: 'chat',
  data () {
    return {
    }
  },
  computed: {
    contact () {
      return this.$store.state.contacts.contacts[this.$route.params.id]
    }
  },
}
</script>
