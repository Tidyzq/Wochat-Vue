<template lang='pug'>
  sidebar.contact-list
    .list-group
      div(v-for='(contact, id) in contacts')
        router-link.contact-item.list-group-item(:class='{ active: $route.params && $route.params.id == id }', :to='{ name: "ChatView", params: { id: id }}')
          .row
            img.avatar-sm.contact-avatar(:src='contact.contact.avatar')
            h5.contact-name {{ contact.contact.username }}
</template>

<script>
import Sidebar from './mixins/Sidebar'

export default {
  name: 'contact-list',
  computed: {
    contacts () {
      return this.$store.state.contacts.contacts
    }
  },
  components: {
    Sidebar
  },
}
</script>
<style lang='less'>

.contact-list {
  background-color: rgb(221, 221, 221);
  padding: 0 !important;
  .contact-item {
    border-radius: 0;
  }
  .list-group-item {
    &:first-child, &:last-child {
      border-radius: 0;
    }
  }
  .contact-avatar {
    margin: 0 20px;
    float: left;
  }
  .contact-name {
    margin-top: 0;
    float: left;
  }
}

</style>
