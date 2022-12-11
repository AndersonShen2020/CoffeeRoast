<template>
  <div
    id="delProductModal"
    ref="modal"
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
            <span>刪除訂單</span>
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
          <strong class="text-danger">{{ tempOrder?.title }}</strong>
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
            @click="deleteOrder"
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

export default {
  props: ['coupon'],
  mixins: [modalControl],
  data () {
    return {
      modal: null,
      tempOrder: this.coupon
    }
  },
  methods: {
    deleteOrder () {
      this.$emit('delOrder', this.tempOrder)
    }
  },
  watch: {
    coupon (newVal) {
      this.tempOrder = newVal
    }
  }
}
</script>
