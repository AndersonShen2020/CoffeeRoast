<template>
  <div class="container">
    <h1>產品比例</h1>
    <div id="chart" />
  </div>
</template>

<script>
import * as api from '@/api/axios'
import c3 from 'c3'

export default {
  data () {
    return {
      products: {},
      productsForClassification: []
    }
  },
  methods: {
    getAllProducts () {
      api.getProductsForChart().then(res => {
        this.products = res.data.products
        this.countProductClassification()
      }).catch(err => {
        console.log(err)
      })
    },
    countProductClassification () {
      const count = {}
      Object.values(this.products).forEach(product => {
        if (count[product.classification] === undefined) {
          count[product.classification] = 1
        } else {
          count[product.classification] += 1
        }
      })
      Object.keys(count).forEach((classification) => {
        this.productsForClassification.push([classification, count[classification]])
      })
      this.c3Generate()
    },
    c3Generate () {
      c3.generate({
        bindto: '#chart',
        data: {
          type: 'pie',
          columns: this.productsForClassification
        }
      })
    }
  },
  computed: {
  },
  mounted () {
    this.getAllProducts()
  }
}
</script>

<style lang="scss"></style>
