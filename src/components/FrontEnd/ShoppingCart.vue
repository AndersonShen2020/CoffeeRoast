<template>
  <Loading :active="isLoading" />
  <div class="d-flex justify-content-around mb-3 text-primary">
    <span class="fs-3 fw-bold">確認訂單內容</span>
    <button
      @click="openDelCartModal"
      class="btn btn-outline-danger"
      type="button"
      :disabled="cartData.carts?.length === 0"
    >
      清空購物車
    </button>
  </div>
  <ul class="list-unstyled text-primary p-3">
    <li
      class="py-3 border-bottom d-flex align-items-center"
      v-for="product in cartData.carts"
      :key="product.id"
    >
      <div class="col-md-1">
        <button
          @click="removeCartItem(product.id)"
          type="button"
          class="btn btn-outline-danger btn-sm"
        >
          x
        </button>
      </div>
      <div class="col me-auto px-3 text-center">
        {{ product.product.title }}
      </div>
      <div class="col-md-3">
        <div class="input-group input-group-sm">
          <select
            id=""
            class="form-select"
            v-model="product.qty"
            @change="updateCartItem(product)"
            :disabled="isLoadingItem === product.id"
          >
            <option
              :value="num"
              v-for="num in 20"
              :key="`${num}${product.id}`"
            >
              {{ num }}
            </option>
          </select>
          <span
            class="input-group-text"
            id="basic-addon2"
          >
            {{ product.product.unit }}
          </span>
        </div>
        <div class="text-end mt-1">
          NT$ {{ product.final_total }}
        </div>
      </div>
    </li>
    <li class="py-3">
      <p
        :class="{ 'text-success': isCoupon, 'text-danger': !isCoupon }"
        class="mb-3"
      >
        {{ couponMsg }}
      </p>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          v-model="couponCode"
          placeholder="輸入優惠碼享 8 折優惠"
        >
        <button
          type="button"
          class="btn coffee-btn"
          @click="useCoupon"
        >
          套用優惠卷
        </button>
      </div>
    </li>
    <li class="py-3 text-end">
      <p>總計 NT$ {{ cartData.total }}</p>
      <p
        class="text-success"
        v-if="isCoupon"
      >
        折扣價 NT$ {{ cartData.final_total }}
      </p>
    </li>
  </ul>
  <DelCart
    ref="delCart"
    @del-cart="clearAllCarts"
  />
</template>

<script>
import emitter from '@/api/mitt.js'

import axios from 'axios'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import DelCart from '@/components/FrontEnd/DelCart.vue'
const url = process.env.VUE_APP_API
const path = process.env.VUE_APP_PATH

export default {
  emits: ['reset-page'],
  components: {
    Loading,
    DelCart
  },
  data () {
    return {
      cartData: {},
      productId: null,
      isLoadingItem: '',
      isLoading: false,
      isEnableSend: false,
      couponCode: '',
      isCoupon: false,
      couponMsg: ''
    }
  },
  methods: {
    async removeCartItem (id) {
      this.isLoadingItem = id
      try {
        await axios.delete(`${url}/api/${path}/cart/${id}`)
        this.getCart()
        this.$emit('reset-page')
        this.isLoadingItem = ''
        emitter.emit('getCartNum')
      } catch (err) {
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
    },
    async getCart () {
      try {
        const res = await axios.get(`${url}/api/${path}/cart`)
        this.cartData = res.data.data
        this.isLoading = false
      } catch (err) {
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
    },
    async updateCartItem (item) {
      const data = {
        product_id: item.id,
        qty: item.qty
      }
      try {
        await axios.put(`${url}/api/${path}/cart/${item.id}`, { data })
        this.getCart()
        this.isLoadingItem = ''
      } catch (err) {
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
    },
    async clearAllCarts () {
      try {
        await axios.delete(`${url}/api/${path}/carts`)
        this.getCart()
        this.$emit('reset-page')
        this.$refs.delCart.hideModal()
        emitter.emit('getCartNum')
      } catch (err) {
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
    },
    async useCoupon () {
      const coupon = { code: this.couponCode }
      try {
        const { data } = await axios.post(`${url}/api/${path}/coupon`, {
          data: coupon
        })
        this.isLoading = true
        this.getCart()
        this.isCoupon = true
        this.couponMsg = data.message
      } catch (err) {
        this.isCoupon = false
        this.couponMsg = err.response.data.message
      }
    },
    openDelCartModal () {
      const delCart = this.$refs.delCart
      delCart.openModal()
    }
  },
  watch: {
    cartData (newVal) {
      if (newVal.carts.length === 0) this.isEnableSend = false
      else this.isEnableSend = true
      const vm = this
      emitter.emit('cartSend', vm.isEnableSend)
    }
  },
  created () {
    const vm = this
    emitter.on('clearCart', () => {
      vm.getCart()
    })
  },
  mounted () {
    this.isLoading = true
    this.getCart()
  },
  unmounted () {
    const vm = this
    emitter.off('clearCart', () => {
      vm.getCart()
    })
  }
}
</script>
