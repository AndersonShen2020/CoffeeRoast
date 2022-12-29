<template>
  <div class="container main">
    <nav class="py-2 border-bottom">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <RouterLink to="/">
            首頁
          </RouterLink>
        </li>
        <li class="breadcrumb-item active">
          產品列表
        </li>
      </ol>
    </nav>

    <div class="row mt-3 products text-primary">
      <div class="col-md-3">
        <ProductsSidebar />
      </div>
      <div class="col-md-9">
        <ProductsList />
      </div>
    </div>
  </div>
</template>

<script>
import ProductsList from '@/components/FrontEnd/ProductsList.vue'
import ProductsSidebar from '@/components/FrontEnd/ProductsSidebar.vue'

export default {
  components: {
    ProductsSidebar,
    ProductsList
  },
  data () {
    return {
    }
  }
}
</script>
