<template lang='pug'>
  .chatbox(:class='{\
      "chatbox-default": type == "default",\
      "chatbox-primary": type == "primary",\
      "chatbox-success": type == "success",\
      "chatbox-info"   : type == "info",\
      "chatbox-warning": type == "warning",\
      "chatbox-danger" : type == "danger",\
      "right"           : placement == "right",\
      "left"            : placement == "left",\
    }')
    .chatbox-arrow
    .chatbox-inner
      slot
</template>
<script>

export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'left'
    }
  }
}

</script>
<style lang='less'>

@chatbox-min-height: 40px;
@chatbox-arrow-width: 5px;
@chatbox-border-radius: 5px;
@chatbox-arrow-padding-top: 20px;

@chatbox-default-color:              #333;
@chatbox-default-bg:                 #fff;

@chatbox-primary-color:              #fff;
@chatbox-primary-bg:                 darken(#428bca, 6.5%);

@chatbox-success-color:              #fff;
@chatbox-success-bg:                 #5cb85c;

@chatbox-info-color:                 #fff;
@chatbox-info-bg:                    #5bc0de;

@chatbox-warning-color:              #fff;
@chatbox-warning-bg:                 #f0ad4e;

@chatbox-danger-color:               #fff;
@chatbox-danger-bg:                  #d9534f;

.chatbox-inner-variant(@color; @background) {
  .chatbox-inner {
    color: @color;
    background-color: @background;
  }
}

.chatbox-arrow-variant(@background) {
  &.right .chatbox-arrow {
    top: @chatbox-arrow-padding-top;
    left: 0;
    margin-top: -@chatbox-arrow-width;
    border-width: @chatbox-arrow-width @chatbox-arrow-width @chatbox-arrow-width 0;
    border-right-color: @background;
  }
  &.left .chatbox-arrow {
    top: @chatbox-arrow-padding-top;
    right: 0;
    margin-top: -@chatbox-arrow-width;
    border-width: @chatbox-arrow-width 0 @chatbox-arrow-width @chatbox-arrow-width;
    border-left-color: @background;
  }
}

.chatbox {
  position: relative;
  display: block;
  max-width: 100%;

  &.right  {
    margin-left:  3px;
    padding: 0 @chatbox-arrow-width;
    float: left;
  }
  &.left   {
    margin-left: -3px;
    padding: 0 @chatbox-arrow-width;
    float: right;
  }

  .chatbox-inner {
    height: 100%;
    min-height: @chatbox-min-height;
    width: 100%;
    overflow: auto;
    padding: 3px 8px;
    border-radius: @chatbox-border-radius;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }

  .chatbox-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
  }

  &.chatbox-default {
    .chatbox-inner-variant(@chatbox-default-color, @chatbox-default-bg);
    .chatbox-arrow-variant(@chatbox-default-bg);
  }
  &.chatbox-primary {
    .chatbox-inner-variant(@chatbox-primary-color, @chatbox-primary-bg);
    .chatbox-arrow-variant(@chatbox-primary-bg);
  }
  &.chatbox-success {
    .chatbox-inner-variant(@chatbox-success-color, @chatbox-success-bg);
    .chatbox-arrow-variant(@chatbox-success-bg);
  }
  &.chatbox-info {
    .chatbox-inner-variant(@chatbox-info-color, @chatbox-info-bg);
    .chatbox-arrow-variant(@chatbox-info-bg);
  }
  &.chatbox-warning {
    .chatbox-inner-variant(@chatbox-warning-color, @chatbox-warning-bg);
    .chatbox-arrow-variant(@chatbox-warning-bg);
  }
  &.chatbox-danger {
    .chatbox-inner-variant(@chatbox-danger-color, @chatbox-default-bg);
    .chatbox-arrow-variant(@chatbox-danger-bg);
  }
}

</style>