<template>
  <div class="container">
    <h1>後臺首頁</h1>
    <div id="chart" />
  </div>
</template>

<script>
import * as api from '@/api/axios'
import c3 from 'c3'

export default {
  data () {
    return {}
  },
  methods: {
    getAllProducts () {
      api.getProductsForChart().then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    },
    c3Generate () {
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
  },
  mounted () {
    this.c3Generate()
    this.getAllProducts()
  }
}
</script>

<style lang="scss"></style>
