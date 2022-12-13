<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <h2>總產品比例</h2>
        <div id="productsChart" />
      </div>
      <div class="col-6">
        <h2>當月銷售產品數量</h2>
        <div id="productsChart" />
      </div>
      <div class="col-12">
        <h2>各月訂單數量</h2>
        <div id="ordersChart" />
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/axios'
import c3 from 'c3'

export default {
  data () {
    return {
      products: {},
      productsForClassification: [],
      ordersPagesNum: 0,
      allOrders: []
    }
  },
  methods: {
    /**
     * 取得所有的產品
     */
    getAllProducts () {
      api.getProductsForChart().then(res => {
        this.products = res.data.products
        this.countProductClassification()
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 統計產品主分類的數量
     */
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
      this.productsChart()
    },
    /**
     * 圖表 - 產品總比例
     */
    productsChart () {
      c3.generate({
        bindto: '#productsChart',
        data: {
          type: 'pie',
          columns: this.productsForClassification
        }
      })
    },
    /**
     * 圖表 - 當月銷售產品數量
     */
    Chart2 () {
      c3.generate({
        bindto: '#productsChart',
        data: {
          type: 'pie',
          columns: this.productsForClassification
        }
      })
    },
    /**
     * 取得訂單頁數
     */
    getAllOrdersNum () {
      api.getOrdersPagesNumForChart().then(res => {
        this.ordersPagesNum = res.data.pagination.total_pages
        this.getAllOrdersAndChangeTimestamp(this.ordersPagesNum)
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 取得所有訂單
     */
    async getAllOrdersAndChangeTimestamp (num) {
      // 取得所有訂單
      for (let i = 1; i <= num; i++) {
        await api.getOrdersForChart(i).then(res => {
          res.data.orders.forEach(order => {
            this.allOrders.push(order)
          })
        }).catch(err => {
          console.log(err)
        })
      }
      // 轉換 timestamp 成 YYYY/MM/DD
      this.allOrders.map(order => {
        order.create_at = new Date(order.create_at * 1000).toLocaleDateString()
        order.paid_date = new Date(order.paid_date * 1000).toLocaleDateString()
        return order
      })

      // 依據 paid_date 使用 YYYY/MM 進行分類
      // 格式為 {'YYYY/MM': 訂單數} - {{'2022/12': 30},{'2022/11': 130}}
      const orderDateFilter = {}
      this.allOrders.forEach(order => {
        if (order.paid_date !== 'Invalid Date') {
          const str = order.paid_date.split('/')
          const newStr = `${str[0]}/${str[1]}`
          if (orderDateFilter[newStr]) {
            orderDateFilter[newStr] += 1
          } else {
            orderDateFilter[newStr] = 1
          }
        }
      })

      // 增加 MM 不存在的月份，其值為 0
      // 注意，這邊只能算同年份
      const firstMonth = parseInt(Object.keys(orderDateFilter)[Object.keys(orderDateFilter).length - 1].split('/')[1])
      const lastMonth = parseInt(Object.keys(orderDateFilter)[0].split('/')[1])

      for (let i = firstMonth; i < lastMonth; i++) {
        const newYearMonth = `2022/${i}`
        if (Object.keys(orderDateFilter).includes(newYearMonth) === false) {
          orderDateFilter[newYearMonth] = 0
        }
      }
      console.log(orderDateFilter)

      // 將 orderDateFilter 的內容轉換成 [['date', '2018/1/26', '2018/2/26', '2018/5/26', '2018/12/26'],['訂單數', 30, 50, 60, 900]]
      const result = [['date'], ['訂單數']]
      Object.keys(orderDateFilter).forEach(orderDate => {
        result[0].push(orderDate)
        result[1].push(orderDateFilter[orderDate])
      })
      console.log(result)
      this.chartForMonthOrder(result)
    },
    /**
     * 圖表 - 各月訂單數量
     */
    chartForMonthOrder (chartDate) {
      c3.generate({
        bindto: '#ordersChart',
        data: {
          x: 'date',
          xFormat: '%Y/%m', // how the date is parsed
          columns: chartDate
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y/%m' // how the date is displayed
            }
          }
        }
      })
    }
  },
  computed: {
  },
  mounted () {
    this.getAllProducts()
    this.getAllOrdersNum()
  }
}
</script>

<style lang="scss"></style>
