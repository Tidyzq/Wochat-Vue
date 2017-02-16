<template lang='pug'>
  .timetag-wrapper
    p.timetag {{ time | solveTime }}
</template>
<script>
import Moment from 'moment'

export default {
  props: {
    time: {
      type: String,
      default: ''
    }
  },
  filters: {
    solveTime (time) {
      return Moment(time).calendar(null, {
        sameDay: 'HH:mm',
        lastDay: '[Yesterday] HH:mm',
        lastWeek: 'dddd HH:mm',
        sameElse: 'YYYY/MM/DD HH:mm'
      })
    }
  }
}

</script>
<style lang='less'>

.timetag-wrapper {
  text-align: center;
}

.timetag {
  display:inline-block;
  color: #fff;
  background-color: #999;
  margin: 0 auto;
  width: auto;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>