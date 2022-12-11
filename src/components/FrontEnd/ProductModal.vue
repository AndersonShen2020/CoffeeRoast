<template>
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
            <span>{{ product.title }}</span>
          </h5>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <img
                  class="img-fluid"
                  :src="product.imageUrl"
                  :alt="product.title"
                >
              </div>
            </div>
            <div class="col-sm-8">
              <div class="row">
                <div class="mb-3">
                  <p class="badge bg-primary rounded-pill">
                    分類：{{ product.category }}
                  </p>
                </div>
                <div class="mb-3">
                  <p>商品內容：{{ product.description }}</p>
                </div>
                <div class="mb-3 text-end">
                  <h6>
                    <del>原價：{{ product.origin_price }}</del>
                  </h6>
                  <h4>特價：{{ product.price }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <select
            id=""
            class="form-select w-auto"
            v-model="qty"
          >
            <option
              :value="num"
              v-for="num in 20"
              :key="num"
            >
              {{ num }}
            </option>
          </select>
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
            @click="addToCart(id)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const url = process.env.VUE_APP_API
const path = process.env.VUE_APP_PATH

export default {
  props: ['id'],
  data () {
    return {
      product: {},
      qty: 1
    }
  },
  methods: {
    async addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty: this.qty | qty
      }
      this.isLoadingItem = id
      try {
        await axios.post(`${url}/api/${path}/cart`, { data })
        this.isLoadingItem = ''
        this.$emit('closeModal')
      } catch (err) {
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
    }
  },
  watch: {
    async id (newVal) {
      try {
        const res = await axios.get(`${url}/api/${path}/product/${newVal}`)
        this.product = res.data.product
      } catch (err) {
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
    }
  }
}
</script>
