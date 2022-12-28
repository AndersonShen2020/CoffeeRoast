<template>
  <Loading :active="isLoading" />
  <div class="container">
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        type="button"
        @click="openCouponModal(true)"
      >
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>折扣名稱</th>
          <th>折扣代碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in coupons"
          :key="item.code"
        >
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ new Date(item.due_date * 1000).toLocaleDateString() }}</td>
          <td>
            <span
              v-if="item.is_enabled === 1"
              class="text-success"
            >啟用</span>
            <span
              v-else
              class="text-muted"
            >未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelCouponModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :pages="pagination"
      @emitpages="getCoupons"
    />
  </div>
  <CouponsModal
    ref="couponModal"
    :is-new="isNew"
    :coupon="tempCoupon"
    @reset-coupons="getCoupons"
  />
  <DelCoupons
    ref="delCoupon"
    :coupon="tempCoupon"
    @reset-coupons="getCoupons"
  />
</template>

<script>
import axios from 'axios'

import Pagination from '@/components/common/Pagination'
import CouponsModal from '@/components/BackEnd/CouponsModal.vue'
import DelCoupons from '@/components/BackEnd/DelCoupon'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Pagination,
    CouponsModal,
    DelCoupons,
    Loading
  },
  data () {
    return {
      coupons: [],
      pagination: null,
      isNew: false,
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isLoading: false
    }
  },
  methods: {
    async getCoupons (page = 1) {
      this.isLoading = true
      const urlPath = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      try {
        const res = await axios.get(urlPath)
        this.coupons = res.data.coupons
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
      this.$refs.couponModal.hideModal()
      this.$refs.delCoupon.hideModal()
      this.isLoading = false
    },
    openCouponModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew === true) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
          is_enabled: 1
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.openModal()
    },
    openDelCouponModal (item) {
      this.tempCoupon = { ...item }
      const delComponent = this.$refs.delCoupon
      delComponent.openModal()
    }
  },
  async mounted () {
    await this.getCoupons()
  }
}
</script>
