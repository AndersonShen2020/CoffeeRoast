<template>
  <Loading :active="isLoading" />
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h5
            id="productModalLabel"
            class="modal-title"
          >
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close bg-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label
                    for="imageUrl"
                    class="form-label"
                  >主要圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入主要圖片連結"
                    v-model="tempProduct.imageUrl"
                  >
                </div>
                <img
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt="主要圖片連結"
                  v-if="tempProduct.imageUrl"
                >
              </div>
              <div class="mb-2">
                <div class="mb-3">
                  <label
                    for="customImage"
                    class="form-label"
                  >從本地端上傳圖片</label>
                  <input
                    ref="fileInput"
                    type="file"
                    class="form-control"
                    id="customImage"
                    @change="customImageFile"
                  >
                </div>
                <img
                  class="img-fluid"
                  :src="tempProduct.fileImage"
                  alt="從本地端上傳圖片"
                  v-if="tempProduct.fileImage"
                >
              </div>
              <h3>多圖新增</h3>
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <div
                  v-for="(pic, idx) in tempProduct.imagesUrl"
                  :key="idx"
                >
                  <label
                    for="imageUrl"
                    class="form-label"
                  >圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入次要圖片連結"
                    v-model="tempProduct.imagesUrl[idx]"
                  >
                  <img
                    class="img-fluid"
                    :src="pic"
                    alt="次要圖片連結"
                  >
                </div>
                <div
                  v-if="
                    !tempProduct.imagesUrl.length ||
                      tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                  "
                >
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label
                  for="title"
                  class="form-label"
                >標題 <span class="text-danger">*</span></label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                >
              </div>

              <div class="row">
                <div class="mb-3 col-md-3">
                  <label
                    for="category"
                    class="form-label"
                  >主分類 <span class="text-danger">*</span></label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入主分類"
                    v-model="tempProduct.classification"
                  >
                </div>
                <div class="mb-3 col-md-3">
                  <label
                    for="category"
                    class="form-label"
                  >次分類 <span class="text-danger">*</span></label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入次分類"
                    v-model="tempProduct.category"
                  >
                </div>
                <div class="mb-3 col-md-6">
                  <label
                    for="price"
                    class="form-label"
                  >單位 <span class="text-danger">*</span></label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  >
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label
                    for="origin_price"
                    class="form-label"
                  >原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model="tempProduct.origin_price"
                  >
                </div>
                <div class="mb-3 col-md-6">
                  <label
                    for="price"
                    class="form-label"
                  >售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model="tempProduct.price"
                  >
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label
                  for="description"
                  class="form-label"
                >產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.description"
                />
              </div>
              <div class="mb-3">
                <label
                  for="content"
                  class="form-label"
                >說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="tempProduct.content"
                />
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempProduct.is_enabled"
                  >
                  <label
                    class="form-check-label"
                    for="is_enabled"
                  >是否啟用</label>
                </div>
              </div>
            </div>
          </div>
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
            class="btn btn-primary"
            @click="updateItem"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addProduct, updateProduct } from '@/api/axios'
import axios from 'axios'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  props: ['productinfo', 'state'],
  emits: ['update'],
  components: {
    Loading
  },
  data () {
    return {
      tempProduct: this.productinfo,
      isNew: this.state,
      productModal: null,
      isLoading: false
    }
  },
  methods: {
    async updateItem () {
      this.isLoading = true
      if (this.isNew === true) {
        // 新增產品
        await addProduct({ data: this.tempProduct })
      } else {
        // 編輯產品
        await updateProduct({ data: this.tempProduct })
      }
      // 更新畫面
      this.$emit('update')
      this.isLoading = false
    },
    async customImageFile () {
      this.isLoading = true
      const urlPath = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload`
      const file = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      try {
        const res = await axios.post(urlPath, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        this.tempProduct.fileImage = res.data.imageUrl
        this.$refs.fileInput.value = ''
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
    state (newVal) {
      this.isNew = newVal
    },
    productinfo (newVal) {
      this.tempProduct = newVal
    }
  }
}
</script>
