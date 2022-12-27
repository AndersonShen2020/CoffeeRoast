<template>
  <div class="container">
    <div class="row">
      <!--  -->
      <div class="col-12 mt-4">
        <div class="row">
          <div class="col-3">
            <div class="border shadow-sm d-flex align-items-center bg-white">
              <div class="bg-danger bg-gradient p-1 text-white">
                <span class="material-symbols-outlined icon align-middle">
                  local_atm
                </span>
              </div>
              <div class="d-flex flex-column align-self-center pt-1 ps-3">
                <span class="fs-5">本月業績</span>
                <span class="fs-2 fw-bold">
                  {{ allPerformance?.[new Date().getFullYear()]?.[new Date().getMonth() + 1]?.totalCost.toLocaleString() }}
                </span>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="border shadow-sm d-flex align-items-center bg-white">
              <div class="bg-warning bg-gradient p-1 text-white">
                <span class="material-symbols-outlined icon align-middle">
                  monetization_on
                </span>
              </div>
              <div class="d-flex flex-column align-self-center pt-1 ps-3">
                <span class="fs-5">上月業績</span>
                <span class="fs-2 fw-bold">
                  {{ new Date().getMonth() === 0 ?
                    allPerformance?.[new Date().getFullYear() - 1]?.[12]?.totalCost.toLocaleString() :
                    allPerformance?.[new Date().getFullYear()]?.[new Date().getMonth()]?.totalCost.toLocaleString()
                  }}
                </span>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="border shadow-sm d-flex align-items-center  bg-white">
              <div class="bg-info bg-gradient p-1 text-white">
                <span class="material-symbols-outlined icon align-middle">
                  payments
                </span>
              </div>
              <div class="d-flex flex-column align-self-center pt-1 ps-3">
                <span class="fs-5">本季業績</span>
                <span class="fs-2 fw-bold">
                  {{ getThisSeasonTotal }}
                </span>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="border shadow-sm d-flex align-items-center bg-white">
              <div class="bg-success bg-gradient p-1 text-white">
                <span class="material-symbols-outlined icon align-middle">
                  savings
                </span>
              </div>
              <div class="d-flex flex-column align-self-center pt-1 ps-3">
                <span class="fs-5">今年業績</span>
                <span class="fs-2 fw-bold">
                  {{ allPerformance === {} || allPerformance[new Date().getFullYear()] === undefined ?
                    0 :
                    Object.values(allPerformance[new Date().getFullYear()]).reduce((acc, cur) => acc + cur.totalCost, 0).toLocaleString()
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chart col-12 mt-4">
        <div class="chart-content border shadow-sm bg-white">
          <h2>當月銷售產品數量</h2>
          <div id="monthlySalesVolumeChart" />
        </div>
      </div>
      <div class="chart col-12 mt-4">
        <div class="chart-content border shadow-sm bg-white">
          <h2>各月訂單數量與金額</h2>
          <div id="monthlyOrderQuantityAndAmountChart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/axios'
import c3 from 'c3'

// 建立各季對應月份的物件陣列
const season = {
  spring: [1, 2, 3],
  summer: [4, 5, 6],
  autumn: [7, 8, 9],
  winter: [10, 11, 12]
}

export default {
  data () {
    return {
      // 原始訂單
      ordersPagesNum: 0, // 因為後台不提供所有訂單，所以要找出訂單的頁數自己加總
      allOrders: [], // 所有的訂單

      // Performance 業績
      season,
      allPerformance: {}, // 所有業績，從這份資料來取出特定的業績
      productsForClassification: [], // 產品營收比重 <--- 沒用到

      // 圖表 1 - 當月銷售產品數量
      monthlySalesItemName: [], // 當月銷售產品數量 - 名稱
      monthlySalesVolume: ['銷售數量'], // 當月銷售產品數量 - 數量

      // 圖表 2 - 各月訂單數量與金額
      monthlyOrderQuantityAndAmount: [] // 各月訂單數量與金額

    }
  },
  methods: {
    /**
     * 取得所有的產品 (沒用到)
     */
    getAllProducts () {
      api.getProductsForChart().then(res => {
        this.originalProducts = res.data.products
      }).catch(err => {
        console.log(err)
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
     * 取得所有訂單並轉換其中的 Timestamp 成 YYYY/MM/DD
     *
     * @param {Number} num 總頁數
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

      this.StatisticsOrderDataToMonthlyChartData()
      this.proportionOfProductRevenue()
    },

    /**
     * 當月銷售產品數量
     */
    proportionOfProductRevenue () {
      // 依據 paid_date 使用 YYYY/MM 進行分類
      // 格式為 {'YYYY/MM': {產品名稱: 產品數量}} - {'2022/12': {百蜜花園咖啡豆(中焙): 2, 隨行精鋼磨豆機: 1}, '2022/11': {百蜜花園咖啡豆(中焙): 2, 隨行精鋼磨豆機: 1}}
      const orderList = {}
      this.allOrders.forEach((order, i) => {
        if (order.is_paid === true && order.paid_date !== 'Invalid Date') {
          const str = order.paid_date.split('/')
          const newStr = `${str[0]}/${str[1]}`

          Object.values(order.products).forEach(item => {
            if (orderList[newStr]) {
              if (orderList[newStr][item.product.title]) {
                orderList[newStr][item.product.title] += item.qty
              } else {
                orderList[newStr][item.product.title] = item.qty
              }
            } else {
              orderList[newStr] = {}
              orderList[newStr][item.product.title] = item.qty
            }
          })
        }
      })
      console.log(orderList)

      // 轉換格式並統整數據
      // monthlySalesItemName - ['百蜜花園咖啡豆(中焙)', '隨行精鋼磨豆機', ...]
      // monthlySalesVolume - [30, 120, ....]
      const date = new Date()
      const nowYearMonth = `${date.getFullYear()}/${date.getMonth() + 1}`
      const result = []
      Object.keys(orderList[nowYearMonth]).forEach(item => {
        // this.monthlySalesItemName.push(item)
        // this.monthlySalesVolume.push(orderList[nowYearMonth][item])
        result.push([item, orderList[nowYearMonth][item]])
      })
      result.sort((x, y) => y[1] - x[1])
      // this.monthlySalesVolume = result
      console.log(result)
      result.forEach(item => {
        this.monthlySalesItemName.push(item[0])
        this.monthlySalesVolume.push(item[1])
      })
      this.setMonthlySalesVolumeChart()
    },

    /**
     * 圖表 1 - 當月銷售產品數量
     */
    setMonthlySalesVolumeChart () {
      c3.generate({
        bindto: '#monthlySalesVolumeChart',
        data: {
          type: 'bar',
          columns: [this.monthlySalesVolume]
        },
        bar: {
          width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
          }
        },
        axis: {
          rotated: true, // 反轉圖表，X -> Y，Y -> X
          x: {
            show: true,
            type: 'category', // X 軸資料類型
            categories: this.monthlySalesItemName, // X 軸需顯示的資料
            tick: {
              multiline: false // 顯示換行設定
            }
          },
          y: {
            show: true
          }
        },
        size: {
          height: this.monthlySalesItemName.length * 60
        },
        color: {
          pattern: ['#ff7f0e']
        }
      })
    },

    StatisticsOrderDataToMonthlyChartData () {
      // 依據 paid_date 使用 YYYY/MM 進行分類
      // 格式為 'YYYY/MM': {orders: 訂單數, totalCost: 訂單總金額} - {'2022/12': {orders: 30, totalCost: 18000}, '2022/11': {orders: 1, totalCost: 18000}}
      const orderDateFilter = {}
      this.allOrders.forEach(order => {
        if (order.is_paid === true && order.paid_date !== 'Invalid Date') {
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
      // this.allPerformance = orderDateFilter
      this.allPerformance = Object.keys(orderDateFilter).reduce((acc, key) => {
        const [year, month] = key.split('/')
        if (!acc[year]) acc[year] = {}
        acc[year][month] = orderDateFilter[key]
        return acc
      }, {})

      console.log(orderDateFilter)

      // const totalCost = Object.values(data).reduce((acc, cur) => acc + cur.totalCost, 0);
      // console.log(totalCost);

      // 將 orderDateFilter 的內容轉換成 [['date', '2018/1/26', '2018/2/26', '2018/5/26', '2018/12/26'],['訂單數', 30, 50, 60, 900]]
      const result = [['date'], ['訂單數'], ['總金額']]
      Object.keys(orderDateFilter).forEach(orderDate => {
        console.log(orderDate)
        result[0].push(orderDate)
        result[1].push(orderDateFilter[orderDate].orders)
        result[2].push(orderDateFilter[orderDate].totalCost)
      })
      console.log(result)
      this.monthlyOrderQuantityAndAmount = result
      this.chartForMonthlyOrder()
    },

    /**
     * 圖表 2 - 各月訂單數量與金額
     */
    chartForMonthlyOrder () {
      c3.generate({
        bindto: '#monthlyOrderQuantityAndAmountChart',
        data: {
          x: 'date',
          xFormat: '%Y/%m', // how the date is parsed
          columns: this.monthlyOrderQuantityAndAmount,
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
        },
        size: {
          height: 540
        }
      })
    }
  },
  computed: {
    getThisSeasonTotal () {
      let result = 0
      if (this.allPerformance === {} || this.allPerformance[new Date().getFullYear()] === undefined) {
        return 0
      } else {
        Object.entries(season).forEach(item => {
          if (item[1].includes(new Date().getMonth() + 1)) {
            result = this.season[item[0]].reduce((acc, cur) => acc + this.allPerformance[new Date().getFullYear()][cur].totalCost, 0)
          }
        })
      }
      return result.toLocaleString()
    }
  },
  mounted () {
    this.getAllOrdersNum()
  }
}
</script>

<style lang="scss">
.chart {
  &-content{
    padding: 1rem;
    h2{
      margin-bottom: 1rem;
    }
  }
  &:last-child{
    margin-bottom: 1.5rem;
  }
}

text {
  font-family: 'Noto Sans TC', sans-serif;
  font-size: 13px;
}

.icon{
  font-size: 5rem;
}
</style>
