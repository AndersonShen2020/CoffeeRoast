<template>
  <Loading :active="isLoading" />
  <div class="container">
    <div class="text-end mt-4">
      <button
        type="button"
        class="btn btn-primary"
        @click="showModal('new')"
      >
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            主分類
          </th>
          <th width="120">
            次分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
        >
          <td>{{ product.classification }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end">
            {{ product.origin_price }}
          </td>
          <td class="text-end">
            {{ product.price }}
          </td>
          <td>
            <span
              class="text-success"
              v-if="product.is_enabled"
            >啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="showModal('update', product)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="showModal('delete', product)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :pages="pagination"
      @emitpages="init"
    />
  </div>
  <!-- Modal -->
  <ProductModal
    :productinfo="tempProduct"
    :state="isNew"
    @update="init"
  />
  <DelProductModal
    :productinfo="tempProduct"
    @update="init"
  />
  <!-- Modal -->
</template>

<script>
import { getProducts } from '@/api/axios'
import Modal from 'bootstrap/js/dist/modal'

import Pagination from '@/components/common/Pagination'
import ProductModal from '@/components/BackEnd/ProductModal.vue'
import DelProductModal from '@/components/BackEnd/DelProduct'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

const tempProduct = {
  title: '',
  category: '',
  origin_price: 0,
  price: 0,
  unit: '',
  description: '',
  content: '',
  is_enabled: 1,
  imageUrl: '',
  imagesUrl: [],
  fileImage: ''
}

export default {
  components: {
    Pagination,
    ProductModal,
    DelProductModal,
    Loading
  },
  data () {
    return {
      products: [],
      pagination: null,
      isNew: false,
      tempProduct,
      productModal: null,
      delProductModal: null,
      isLoading: false
    }
  },

  methods: {
    async init (page = 1) {
      this.isLoading = true
      const { products, pagination } = await getProducts(page)
      this.products = products
      this.pagination = pagination
      this.productModal.hide()
      this.delProductModal.hide()
      this.isLoading = false
    },
    showModal (state, item) {
      if (state === 'new') {
        this.tempProduct = JSON.parse(JSON.stringify(tempProduct))
        this.isNew = true
        this.productModal.show()
      } else if (state === 'update') {
        this.tempProduct = JSON.parse(JSON.stringify(item))
        this.isNew = false
        this.productModal.show()
      } else if (state === 'delete') {
        this.tempProduct = { ...item }
        this.delProductModal.show()
      }
    },
    createImages () {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    }
  },

  created () {
    this.init()
  },
  mounted () {
    this.productModal = new Modal(document.getElementById('productModal'), {
      keyboard: false
    })
    this.delProductModal = new Modal(
      document.getElementById('delProductModal'),
      {
        keyboard: false
      }
    )
  }
}
</script>
