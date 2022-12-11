<template>
  <Loading :active="isLoading" />
  <div class="d-flex flex-nowrap my-3">
    <div class="me-auto">
      共有 {{ filterProducts.length }} 個產品
    </div>
  </div>
  <!-- list 樣式 -->
  <template class="table align-middle d-lg-none d-block">
    <ul class="list-unstyled">
      <li
        class="d-flex flex-column mb-3 product-effect p-2 products-list"
        v-for="product in filterProducts"
        :key="product?.id"
      >
        <RouterLink
          class="d-flex"
          :to="`/product/${product?.id}`"
        >
          <div
            class="me-3 products-list-bg"
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          />
          <div class="d-flex flex-column justify-content-between flex-fill">
            <div class="text-primary">
              {{ product.title }}
            </div>
            <div class="d-flex justify-content-between">
              <div
                v-if="product.price === product.origin_price"
                class="h5"
              >
                {{ product.price }} 元
              </div>
              <div v-else>
                <del class="h6 text-gray">NT$ {{ product.origin_price }}</del>
                <div class="h5 text-danger">
                  NT$ {{ product.price }}
                </div>
              </div>
              <div class="d-flex">
                <button
                  type="button"
                  class="btn align-self-center coffee-btn"
                  @click.prevent="addToCart(product.id)"
                  :disabled="isLoadingItem === product.id"
                >
                  <span
                    class="spinner-grow spinner-grow-sm"
                    v-show="isLoadingItem === product.id"
                  />
                  <i class="bi bi-cart" />
                </button>
              </div>
            </div>
          </div>
        </RouterLink>
      </li>
    </ul>
  </template>
  <!-- grid 樣式 -->
  <template class="d-none d-lg-block">
    <div class="row mb-3 row-cols-md-3 row-cols-1 g-4">
      <div
        class="col"
        v-for="product in filterProducts"
        :key="product.id"
      >
        <RouterLink :to="`/product/${product.id}`">
          <div class="card border-0 h-100 product-effect p-1">
            <img
              :src="product.imageUrl"
              class="card-img-top card-img"
              :alt="product.title"
            >
            <div class="card-body">
              <h5 class="text-primary card-title fw-bold">
                {{ product.title }}
              </h5>
            </div>
            <div class="modal-footer border-top-0 justify-content-between">
              <div
                v-if="product.price === product.origin_price"
                class="h5"
              >
                NT$ {{ product.price }}
              </div>
              <div v-else>
                <del class="h6 text-gray">NT$ {{ product.origin_price }}</del>
                <div class="h5 text-danger">
                  NT$ {{ product.price }}
                </div>
              </div>
              <button
                type="button"
                class="btn coffee-btn align-self-center"
                @click.prevent="addToCart(product.id)"
                :disabled="isLoadingItem === product.id"
              >
                <span
                  class="spinner-grow spinner-grow-sm"
                  v-show="isLoadingItem === product.id"
                />
                <i class="bi bi-cart" />
              </button>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </template>
  <ProductModal
    :id="productId"
    @close-modal="hideModal"
  />
</template>

<script>
import emitter from '@/api/mitt.js'
import axios from 'axios'

import ProductModal from '@/components/FrontEnd/ProductModal.vue'
import Modal from 'bootstrap/js/dist/modal'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
const url = process.env.VUE_APP_API
const path = process.env.VUE_APP_PATH

export default {
  components: {
    ProductModal,
    Loading
  },
  data () {
    return {
      products: [],
      productId: null,
      isLoadingItem: '',
      isLoading: false,
      state: 'list',
      category: this.$route.query
    }
  },

  methods: {
    async getProducts () {
      try {
        const res = await axios.get(`${url}/api/${path}/products/all`)
        this.products = res.data.products
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
    },
    openProductModal (id) {
      this.productId = id
      this.productModal.show()
    },
    async addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      try {
        await axios.post(`${url}/api/${path}/cart`, { data })
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
    hideModal () {
      this.productModal.hide()
    }
  },

  mounted () {
    this.isLoading = true
    this.getProducts()
    this.productModal = new Modal(document.getElementById('productModal'), {
      keyboard: false
    })
    this.category = this?.$route?.query?.category
  },

  watch: {
    $route (to) {
      this.category = to.query.category
    }
  },

  computed: {
    filterProducts () {
      if (this.category === '全部' || this.category === undefined) {
        return this.products
      } else {
        const filter = this.products.filter(
          (item) => item.category === this.category
        )
        return filter
      }
    }
  }
}
</script>

<style scoped>
li {
  border-top: 1px solid #dbdbdb;
  padding-top: 5px;
}

li:first-child {
  border-top: 0px solid #dbdbdb;
}

.icon-editor {
  cursor: pointer;
}

.icon-editor:hover {
  background-color: #8d9297;
  color: white;
}

.product-effect {
  transition: all 0.1s ease-in;
  background-color: #fff;
}

.product-effect:hover {
  transform: scale(1.02);
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
}

.card-img {
  height: 200px;
  padding: -0.25rem;
}

.btn-cart:hover {
  --bs-text-opacity: 1;
  --bs-bg-opacity: 1;
  color: rgba(var(--bs-secondary-rgb), var(--bs-text-opacity));
  background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity));
}

.products-list {
  min-width: 130px;
}

.products-list-bg {
  min-width: 130px;
  min-height: 130px;
  background-size: cover;
  background-position: center;
}
</style>
