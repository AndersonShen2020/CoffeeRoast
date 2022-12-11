<template>
  <div class="container">
    <h1>後臺首頁</h1>
    <div id="chart" />
  </div>
</template>

<script>
import c3 from 'c3'

export default {
  data () {
    return {}
  },
  mounted () {
    c3.generate({
      bindto: '#chart',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    })
  }
}
</script>

<style lang="scss"></style>
