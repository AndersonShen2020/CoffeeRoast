<template>
  <aside class="sidebar">
    <ul class="list-group list-group-flush bg-transparent">
      <li class="nav-color list-group-item">
        <RouterLink
          class="nav-link"
          to="/admin"
        >
          經營儀表板
        </RouterLink>
      </li>
      <li class="nav-color list-group-item">
        <RouterLink
          class="nav-link"
          to="/admin/Products"
        >
          產品
        </RouterLink>
      </li>
      <li class="nav-color list-group-item">
        <RouterLink
          class="nav-link"
          to="/admin/Coupons"
        >
          優惠卷
        </RouterLink>
      </li>
      <li class="nav-color list-group-item">
        <RouterLink
          class="nav-link"
          to="/admin/Orders"
        >
          訂單
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  background-color: #f8f9fa;
  width: 280px;
  min-height: calc(100vh - 66px);
  ul>li{
    padding: 0;
    a{
      padding: 1rem 2rem;
    }
  }
}

.nav-color:hover a, .router-link-exact-active{
  background-color: burlywood;
  color: white;
}
</style>
