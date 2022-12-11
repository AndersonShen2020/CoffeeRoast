<template>
  <aside class="sidebar">
    <ul class="list-group list-group-flush bg-transparent">
      <li class="list-group-item">
        <RouterLink
          class="nav-link"
          to="/admin"
        >
          首頁
        </RouterLink>
      </li>
      <li class="list-group-item">
        <RouterLink
          class="nav-link"
          to="/admin/Products"
        >
          產品
        </RouterLink>
      </li>
      <!-- <li class="list-group-item">
        <RouterLink
          class="nav-link"
          to="/admin"
        >
          產品
        </RouterLink>
      </li> -->
      <li class="list-group-item">
        <RouterLink
          class="nav-link"
          to="/admin/Coupons"
        >
          優惠卷
        </RouterLink>
      </li>
      <li class="list-group-item">
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

<style scoped>
.nav-link:hover {
  background-color: burlywood;
}
</style>
