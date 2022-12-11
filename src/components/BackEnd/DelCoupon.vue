<template>
  <Loading :active="isLoading" />
  <div
    id="delCouponModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5
            id="delProductModalLabel"
            class="modal-title"
          >
            <span>刪除優惠卷</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempProduct?.title }}</strong>
          (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteItem"
          >
            確認刪除
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
  props: ['coupon'],
  emits: ['resetCoupons'],
  mixins: [modalControl],
  data () {
    return {
      modal: null,
      tempProduct: this.coupon,
      isLoading: false
    }
  },
  methods: {
    async deleteItem () {
      this.isLoading = true
      const urlPath = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempProduct.id}`
      try {
        await axios.delete(urlPath)
        this.$emit('resetCoupons')
        this.isLoading = false
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
  watch: {
    coupon (newVal) {
      this.tempProduct = newVal
    }
  }
}
</script>
