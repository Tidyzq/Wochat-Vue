<template lang='pug'>
.navbar-wrapper
  nav.navbar(:class="{\
      'navbar-inverse'     : (type == 'inverse'),\
      'navbar-default'     : (type == 'default'),\
      'navbar-fixed-top'   : (placement === 'top'),\
      'navbar-fixed-bottom': (placement === 'bottom'),\
      'navbar-static-top'  : (placement === 'static')\
    }")
    .container
      .navbar-header
        slot(name='brand')
      .collapse.navbar-collapse.in
        slot
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
  created () {
    this._navbar = true
  },
  data () {
    return {
      collapsed: true,
    }
  }
}
</script>
<style lang='less'>
@navbar-padding-horizontal: 15px;
@navbar-padding-vertical  : 15px;

.navbar-wrapper {

.navbar {
  margin: 0;
}

.navbar-header {
    float: left;
}

.navbar-collapse {

    width: auto;
    border-top: 0;
    box-shadow: none;

    &.collapse {
      display: block !important;
      height: auto !important;
      padding-bottom: 0;
      overflow: visible !important;
    }

    &.in {
      overflow-y: visible;
    }

    .navbar-fixed-top &,
    .navbar-static-top &,
    .navbar-fixed-bottom & {
      padding-left: 0;
      padding-right: 0;
    }
}

.navbar-fixed-top,
.navbar-fixed-bottom {
  .navbar-collapse {
      max-height: 200px;
  }
}

.container,
.container-fluid {
  > .navbar-header,
  > .navbar-collapse {
      margin-right: 0;
      margin-left:  0;
  }
}

.navbar-static-top {
    border-radius: 0;
}

.navbar-fixed-top,
.navbar-fixed-bottom {
    border-radius: 0;
}

.navbar-brand {
    .navbar > .container &,
    .navbar > .container-fluid & {
      margin-left: -@navbar-padding-horizontal;
    }
}

.navbar-nav {
    float: left;
    margin: 0;

    > li {
      float: left;
      > a {
        padding-top:    @navbar-padding-vertical;
        padding-bottom: @navbar-padding-vertical;
      }
    }
    .open .dropdown-menu {
      position: absolute;
      float: none;
      width: auto;
      margin-top: 0;
      background-color: #fff;
      border: 1px;
      -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
      box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    }
}

.navbar-nav .open .dropdown-menu > li > a,
.navbar-nav .open .dropdown-menu .dropdown-header {
    padding: 3px 20px;
}

.navbar-default .navbar-nav .open .dropdown-menu > li > a {
  color: #333;
}

.navbar-form {

  .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;

    &:last-child {
      margin-bottom: 0;
    }
  }
  .form-control {
    display: inline-block;
    width: auto;
    vertical-align: middle;
  }
  width: auto;
  border: 0;
  margin-left: 0;
  margin-right: 0;
  padding-top: 0;
  padding-bottom: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.navbar-text {
    float: left;
    margin-left: @navbar-padding-horizontal;
    margin-right: @navbar-padding-horizontal;
}



.navbar-left  {
  float: left !important;
  .dropdown-menu {
    left: 0;
    right: auto;
  }
 }
.navbar-right {
  float: right !important;
  margin-right: -@navbar-padding-horizontal;

  ~ .navbar-right {
    margin-right: 0;
  }
  .dropdown-menu {
    right: 0;
    left: auto;
  }
}
}

</style>
