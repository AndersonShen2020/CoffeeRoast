<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <h2>產品營收比重</h2>
        <div id="productsChart" />
      </div>
      <div class="col-6">
        <h2>當月銷售產品數量與總金額</h2>
        <div id="productsChart" />
      </div>
      <div class="col-12">
        <h2>各月訂單數量與金額</h2>
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
     * 圖表 - 產品營收比重
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
     * 圖表 - 當月銷售產品數量與總金額
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
      // 格式為 'YYYY/MM': {orders: 訂單數, totalCost: 訂單總金額} - {'2022/12': {orders: 30, totalCost: 18000}, '2022/11': {orders: 1, totalCost: 18000}}
      const orderDateFilter = {}
      this.allOrders.forEach(order => {
        if (order.paid_date !== 'Invalid Date') {
          const str = order.paid_date.split('/')
          const newStr = `${str[0]}/${str[1]}`
          if (orderDateFilter[newStr]) {
            orderDateFilter[newStr].orders += 1
            orderDateFilter[newStr].totalCost += order.total
          } else {
            orderDateFilter[newStr] = {
              orders: 1,
              totalCost: order.total
            }
          }
        }
      })
      console.log(orderDateFilter)

      const nowYear = parseInt(Object.keys(orderDateFilter)[0].split('/')[0])
      const firstMonth = parseInt(Object.keys(orderDateFilter)[Object.keys(orderDateFilter).length - 1].split('/')[1])
      const lastMonth = parseInt(Object.keys(orderDateFilter)[0].split('/')[1])

      if (nowYear > 2022) {
        // 2022
        for (let month = firstMonth; month <= 12; month++) {
          const newYearMonth = `2022/${month}`
          if (Object.keys(orderDateFilter).includes(newYearMonth) === false) {
            orderDateFilter[newYearMonth] = {
              orders: 0,
              totalCost: 0
            }
          }
        }
        // 2022 之後的年份
        for (let year = nowYear; year < nowYear; year++) {
          for (let month = 1; month <= lastMonth; month++) {
            const newYearMonth = `${year}/${month}`
            if (Object.keys(orderDateFilter).includes(newYearMonth) === false) {
              orderDateFilter[newYearMonth] = {
                orders: 0,
                totalCost: 0
              }
            }
          }
        }
      } else {
        for (let month = firstMonth; month <= 12; month++) {
          const newYearMonth = `2022/${month}`
          if (Object.keys(orderDateFilter).includes(newYearMonth) === false) {
            orderDateFilter[newYearMonth] = {
              orders: 0,
              totalCost: 0
            }
          }
        }
      }
      console.log(orderDateFilter)

      // 將 orderDateFilter 的內容轉換成 [['date', '2018/1/26', '2018/2/26', '2018/5/26', '2018/12/26'],['訂單數', 30, 50, 60, 900]]
      const result = [['date'], ['訂單數'], ['總金額']]
      Object.keys(orderDateFilter).forEach(orderDate => {
        console.log(orderDate)
        result[0].push(orderDate)
        result[1].push(orderDateFilter[orderDate].orders)
        result[2].push(orderDateFilter[orderDate].totalCost)
      })
      console.log(result)
      this.chartForMonthOrder(result)
    },
    /**
     * 圖表 - 各月訂單數量與金額
     */
    chartForMonthOrder (chartDate) {
      c3.generate({
        bindto: '#ordersChart',
        data: {
          x: 'date',
          xFormat: '%Y/%m', // how the date is parsed
          columns: chartDate,
          types: {
            訂單數: 'area-spline',
            總金額: 'area-spline'
          },
          axes: {
            總金額: 'y',
            訂單數: 'y2'
          }
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y/%m' // how the date is displayed
            }
          },
          y: {
            padding: { top: 0, bottom: 100 },
            label: {
              text: '總金額',
              position: 'outer-middle'
            }
          },
          y2: {
            padding: { top: 200, bottom: 0 },
            label: {
              text: '訂單數',
              position: 'outer-middle'
            },
            show: true
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
