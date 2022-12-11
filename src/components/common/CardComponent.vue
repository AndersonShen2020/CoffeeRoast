<template>
  <RouterLink
    :to="`/product/${product.id}`"
    @click="goTop"
  >
    <div class="card h-100">
      <div
        class="card-img d-flex justify-content-center align-items-center"
        :style="{ backgroundImage: `url(${product.imageUrl})` }"
      >
        <div class="img-opacity">
          <div class="img-text text-white fs-3">
            詳細內容
          </div>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title fw-bold">
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
          class="btn btn-cart align-self-end"
          @click="addToCart(product.id)"
        >
          <i class="bi bi-cart" />
        </button>
      </div>
    </div>
  </RouterLink>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      product: {}
    }
  },
  methods: {
    goTop () {
      document.documentElement.scrollTop = 0
    }
  },
  mounted () {
    this.product = this.item
  }
}
</script>

<style lang="scss">
.card {
  height: 250px;
  .card-img {
    height: 100px;
  }
  .img-opacity {
    opacity: 0;
    background-color: rgba(80, 80, 80, 0.5);
    width: 100%;
    height: 100%;
    position: relative;
    &:hover {
      opacity: 1;
      transition: all 0.5s;
    }
    .img-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.btn-cart:hover {
  background-color: red;
  color: white;
}
</style>
