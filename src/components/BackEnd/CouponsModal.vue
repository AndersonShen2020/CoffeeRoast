<template>
  <Loading :active="isLoading" />
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div
      class="modal-dialog"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="exampleModalLabel"
          >
            <span v-if="isNew">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題 <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題"
            >
          </div>
          <div class="mb-3">
            <label
              for="coupon_code"
            >優惠碼 <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼"
            >
          </div>
          <div class="mb-3">
            <label
              for="due_date"
            >到期日 <span class="text-danger">*</span></label>
            <input
              type="date"
              class="form-control"
              id="due_date"
              v-model="due_date"
            >
          </div>
          <div class="mb-3">
            <label
              for="price"
            >折扣百分比 <span class="text-danger">*</span></label>
            <input
              type="number"
              class="form-control"
              id="price"
              min="0"
              v-model.number="tempCoupon.percent"
              placeholder="請輸入折扣百分比"
            >
          </div>
          <div
            class="mb-3"
            v-if="!isNew"
          >
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
                id="is_enabled"
              >
              <label
                class="form-check-label"
                for="is_enabled"
              >是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="updateCoupon"
          >
            {{ isNew ? '新增優惠卷' : '更新優惠券' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalControl from '@/api/modalControl'
import axios from 'axios'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Loading
  },
  props: {
    coupon: {
      type: Object,
      default () {
        return {}
      }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  emits: ['resetCoupons'],
  data () {
    return {
      tempCoupon: {},
      due_date: '',
      isLoading: false
    }
  },
  mounted () {
    this.tempCoupon = { ...this.coupon }
  },
  methods: {
    async updateCoupon () {
      this.isLoading = true
      let authorization = 'post'
      let urlPath = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`

      if (this.isNew === false) {
        authorization = 'put'
        urlPath = urlPath + `/${this.coupon.id}`
      }

      try {
        await axios[authorization](urlPath, {
          data: this.tempCoupon
        })
        this.$emit('resetCoupons')
        this.isLoading = false
      } catch (err) {
        // console.dir(err)
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
  watch: {
    coupon () {
      this.tempCoupon = { ...this.coupon }
      const dataAndTime = new Date(this.tempCoupon.due_date * 1000)
        .toISOString()
        .split('T')
      this.due_date = dataAndTime[0]
    },
    due_date () {
      const timestamp = Math.floor(new Date(this.due_date) / 1000)
      this.tempCoupon.due_date = timestamp
    }
  },
  mixins: [modalControl]
}
</script>
