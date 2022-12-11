<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-secondary bg-opacity-50">
    <div class="container">
      <!-- cart -->
      <RouterLink
        class="nav-link text-primary order-lg-2 order-md-0 coffee-nav-icon"
        to="/CheckOrder"
        @click="closeNavHam"
      >
        <div class="position-relative">
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            v-if="cartData.length !== 0"
          >{{ cartData.length }}</span>
          <i class="bi bi-cart" />
        </div>
      </RouterLink>

      <!-- Logo -->
      <RouterLink
        class="navbar-brand order-lg-0 order-md-1"
        to="/"
        @click="closeNavHam"
      >
        <span class="logo">CoffeeRoast</span>
      </RouterLink>

      <!-- 漢堡選單 -->
      <button
        class="navbar-toggler order-md-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <!-- 摺疊 -->
      <div
        class="collapse navbar-collapse justify-content-end order-lg-1"
        id="navbarSupportedContent"
        ref="collapse"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink
              class="nav-link text-primary coffee-nav-item"
              to="/about"
              @click="closeNavHam"
            >
              關於本店
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link text-primary coffee-nav-item"
              to="/KnowledgeView"
              @click="closeNavHam"
            >
              咖啡知識
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link text-primary coffee-nav-item"
              to="/products"
              @click="closeNavHam"
            >
              產品列表
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import emitter from '@/api/mitt.js'

import axios from 'axios'

import collapseMixin from '@/mixins/collapseMixin'
const url = process.env.VUE_APP_API
const path = process.env.VUE_APP_PATH

export default {
  mixins: [collapseMixin],
  data () {
    return {
      cartData: []
    }
  },
  methods: {
    async getCartNum () {
      try {
        const res = await axios.get(`${url}/api/${path}/cart`)
        this.cartData = res.data.data.carts
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
  mounted () {
    this.getCartNum()
    const vm = this
    emitter.on('getCartNum', () => {
      vm.getCartNum()
    })
  }
}
</script>

<style lang="scss">
.nav-item {
  padding: 5px;
}

.logo {
  font-family: 'Carter One', cursive;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  --bs-text-opacity: 1;
  color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity));
  &:hover {
    font-weight: 900;
  }
}

.coffee-nav-item:hover {
  font-weight: 700;
}

.coffee-nav-icon:hover {
  transform: scale(1.1);
}
</style>
