<template>
  <Loading :active="isLoading" />
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5
            id="delProductModalLabel"
            class="modal-title"
          >
            <span>刪除產品</span>
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
          <strong class="text-danger">{{ tempProduct.title }}</strong>
          商品(刪除後將無法恢復)。
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
import { deleteProduct } from '@/api/axios'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Loading
  },
  props: ['productinfo'],
  emits: ['update'],
  data () {
    return {
      tempProduct: this.productinfo,
      delProductModal: null,
      isLoading: false
    }
  },
  methods: {
    deleteItem () {
      this.isLoading = true
      deleteProduct(this.tempProduct.id)
      // 更新畫面
      this.$emit('update')
      this.isLoading = false
    }
  },
  watch: {
    productinfo (newVal) {
      this.tempProduct = newVal
    }
  }
}
</script>
