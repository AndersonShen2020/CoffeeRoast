<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
    <RouterLink
      class="nav-link"
      to="/admin"
    >
      專賣店後台
    </RouterLink>
    <div
      class="collapse navbar-collapse justify-content-end"
      id="navbarNav"
    >
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink
            class="nav-link"
            to="/"
          >
            回首頁
          </RouterLink>
        </li>
        <li class="nav-item">
          <a
            class="nav-link logout"
            @click="logout"
          > 登出 </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    async logout () {
      const urlPath = `${process.env.VUE_APP_API}/logout`
      try {
        await axios.post(urlPath)
        document.cookie = 'hexToken=;expires=;'
        this.$router.push('/')
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

<style scoped lang="scss">
.nav-item {
  padding: 5px;
}
.logout:hover {
  cursor: pointer;
}
</style>
