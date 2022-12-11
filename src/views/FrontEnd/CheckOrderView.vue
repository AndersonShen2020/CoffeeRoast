<template>
  <Loading :active="isLoading" />
  <div
    class="container main py-3"
    v-if="products.length > 0"
  >
    <div class="row text-center px-3">
      <div class="col-4 d-flex flex-column bg-primary text-secondary p-3">
        <span>STEP1</span>
        <span>確認訂單</span>
      </div>
      <div class="col-4 d-flex flex-column p-3 bg-secondary text-primary">
        <span>STEP2</span>
        <span>建立訂單</span>
      </div>
      <div class="col-4 d-flex flex-column p-3 bg-secondary text-primary">
        <span>STEP3</span>
        <span>完成訂單</span>
      </div>
    </div>

    <div class="row py-3 justify-content-between gx-0">
      <div class="col-md-6">
        <ShoppingCart @reset-page="getCart" />
      </div>
      <div class="col-md-5 bg-light bg-opacity-50">
        <p class="d-flex fs-3 fw-bold m-3 text-primary">
          填寫訂購資訊
        </p>
        <ValidateForm class="p-3" />
      </div>
    </div>
  </div>

  <div
    class="container main py-3"
    v-if="products.length === 0"
  >
    <div
      class="d-flex flex-column justify-content-center align-items-center text-primary"
    >
      <i class="bi bi-cart-fill cart-icon" />
      <p>您的購物車中沒有商品</p>
      <RouterLink to="/products">
        <button
          type="button"
          class="btn coffee-btn"
        >
          去購物
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import ValidateForm from '@/components/FrontEnd/ClientValidateForm.vue'
import ShoppingCart from '@/components/FrontEnd/ShoppingCart.vue'

import axios from 'axios'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import titleMixin from '@/mixins/titleMixin'
const url = process.env.VUE_APP_API
const path = process.env.VUE_APP_PATH

export default {
  mixins: [titleMixin],
  components: {
    ShoppingCart,
    ValidateForm,
    Loading
  },
  data () {
    return {
      title: '確認訂單',
      products: [],
      isLoading: false
    }
  },
  methods: {
    async getCart () {
      this.isLoading = true
      try {
        const res = await axios.get(`${url}/api/${path}/cart`)
        this.products = res.data.data.carts
      } finally {
        this.isLoading = false
      }
    },
    resetCart () {
      this.products = []
    }
  },
  mounted () {
    this.isLoading = true
    this.getCart()
  }
}
</script>

<style lang="scss" scoprd>
.cart-icon {
  font-size: 10rem;
}
</style>
