<template lang='pug'>
  .chat-wrapper
    template(v-for='token in getTokens(text)')
      .chat-newline(v-if='token.type == "newline"') {{ token.text }}
      .chat-text(v-if='token.type == "text"') {{ token.text }}
      img.chat-emotion(v-if='token.type == "emotion"', :src='token.src', :alt='token.text')
</template>
<script>
import emotionsApi from '../../api/emotions'

export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    getTokens (text) {
      console.log(text)
      let tokens = []
      var src = text
      let emotions = emotionsApi.getAll()
      const rules = {
        newline: /^\n/,
        emotion: /^\[[^\[\]]+\]/,
        text: /^[\s\S]+?(?=\[|\n|$)/
      }
      var cap
      var count = 0
      while (src) {
        // newline
        if (cap = rules.newline.exec(src)) {
          src = src.substring(cap[0].length);
          tokens.push({
            type: 'newline',
            text: cap[0]
          })
          continue
        }
        // emotion
        if (cap = rules.emotion.exec(src)) {
          src = src.substring(cap[0].length);
          let emotion = emotions[cap[0]]
          if (emotion) {
            tokens.push({
              type: 'emotion',
              src: emotion.src,
              text: emotion.value
            })
          } else {
            tokens.push({
              type: 'text',
              text: cap[0]
            })
          }
          continue
        }
        // text
        if (cap = rules.text.exec(src)) {
          src = src.substring(cap[0].length);
          tokens.push({
            type: 'text',
            text: cap[0]
          })
          continue
        }
        return []
      }
      return tokens
    }
  }
}

</script>
<style lang='less'>

.chat-wrapper {
  .chat-newline {
    float: left;
    clear: both;
  }
  .chat-text {
    float: left;
    line-height: 24px;
  }
  .chat-emotion {
    float: left;
    width: 24px;
    height: 24px;
  }
}

</style>