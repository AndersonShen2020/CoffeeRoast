<template>
  <div
    id="delCartModal"
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
            <span>刪除所有購物車內容</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="modal-body">
          是否確定刪除
          <strong class="text-danger">所有購物車內容</strong>
          ？
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
            @click="deleteCart"
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
  mixins: [modalControl],
  methods: {
    deleteCart () {
      this.$emit('delCart')
    }
  }
}
</script>
