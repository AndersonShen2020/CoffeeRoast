<template>
  <Loading :active="isLoading" />
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="item in orders"
        :key="item.id"
      >
        <tr
          v-if="orders.length"
          :class="{ 'text-secondary': !item.is_paid }"
        >
          <td>{{ new Date(item.create_at * 1000).toLocaleDateString() }}</td>
          <td>
            <span
              v-text="item.user.email"
              v-if="item.user"
            />
          </td>
          <td>
            <ul class="list-unstyled">
              <li
                v-for="product in item.products"
                :key="product.id"
              >
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">
            {{ item.total }}
          </td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paidSwitch${item.id}`"
                v-model="item.is_paid"
                @change="updateOrder(item)"
              >
              <label
                class="form-check-label"
                :for="`paidSwitch${item.id}`"
              >
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openOrder(item)"
              >
                檢視
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelOrder(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <Pagination
    :pages="pagination"
    @emitpages="getOrders"
  />
  <OrderModal
    ref="orderModal"
    :order-data="tempOrder"
    @update-orders="updateOrder"
  />
  <DelOrderModal
    ref="delModel"
    :coupon="tempOrder"
    @del-order="delOrder"
  />
</template>

<script>
import axios from 'axios'

import Pagination from '@/components/common/Pagination'
import OrderModal from '@/components/BackEnd/OrderModal.vue'
import DelOrderModal from '@/components/BackEnd/DelOrder'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Pagination,
    OrderModal,
    DelOrderModal,
    Loading
  },
  data () {
    return {
      pagination: null,
      orders: [],
      tempOrder: {},
      isLoading: false
    }
  },
  methods: {
    async getOrders (page = 1) {
      this.isLoading = true
      const urlPath = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      try {
        const res = await axios.get(urlPath)
        this.orders = res.data.orders
        this.pagination = res.data.pagination
      } catch (err) {
        this.isLoading = false
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
      this.$refs.orderModal.hideModal()
      this.$refs.delModel.hideModal()
      this.isLoading = false
    },
    openOrder (item) {
      this.tempOrder = item
      this.$refs.orderModal.openModal()
    },
    async updateOrder (item) {
      this.isLoading = true
      const urlPath = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      try {
        await axios.put(urlPath, { data: item })
      } catch (err) {
        this.isLoading = false
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
      this.getOrders()
      this.isLoading = false
    },
    openDelOrder (item) {
      this.tempOrder = item
      this.$refs.delModel.openModal()
    },
    async delOrder (item) {
      this.isLoading = true
      const urlPath = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      try {
        await axios.delete(urlPath)
        this.getOrders()
      } catch (err) {
        this.isLoading = false
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
      this.isLoading = false
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
