<template lang='pug'>
  .chat-wrapper
    template(v-for='token in getTokens(text)')
      .chat-text(v-if='token.type == "text"') {{ token.value }}
      img.chat-emotion(v-if='token.type == "emotion"', :src='token.value')
</template>
<script>
import emotionsApi from '../api/emotions'

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
        emotion: /^\[[^\[\]]+\]/,
        text: /^[\s\S]+?(?=\[|$)/
      }
      var cap
      var count = 0
      while (src) {
        console.log(src)
        // emotion
        if (cap = rules.emotion.exec(src)) {
          src = src.substring(cap[0].length);
          let emotion = emotions[cap[0]]
          if (emotion) {
            tokens.push({
              type: 'emotion',
              value: emotion.src
            })
          } else {
            tokens.push({
              type: 'text',
              value: cap[0]
            })
          }
          continue
        }
        // text
        if (cap = rules.text.exec(src)) {
          src = src.substring(cap[0].length);
          tokens.push({
            type: 'text',
            value: cap[0]
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
  .chat-text {
    float: left;
  }
  .chat-emotion {
    float: left;
    width: 24px;
    height: 24px;
  }
}

</style>