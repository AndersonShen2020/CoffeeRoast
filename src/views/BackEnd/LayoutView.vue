<template>
  <Navbar />
  <div class="d-flex">
    <Sidebar />
    <main class="main w-100">
      <RouterView />
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/BackEnd/Navbar.vue'
import Sidebar from '@/components/BackEnd/Sidebar.vue'
import { checkAdmin } from '@/api/axios'

export default {
  components: {
    Navbar,
    Sidebar
  },
  beforeMount () {
    checkAdmin()
  },
  watch: {
    $route (to) {
      if (to.name === 'products') {
        document.title = '產品管理'
      } else if (to.name === 'Coupons') {
        document.title = '優惠卷管理'
      } else if (to.name === 'Orders') {
        document.title = '訂單管理'
      }
    }
  }
}
</script>

<style lang="scss">
// .sidebar {
//   background-color: #f8f9fa;
//   width: 280px;
//   min-height: calc(100vh - 66px);
// }
</style>
