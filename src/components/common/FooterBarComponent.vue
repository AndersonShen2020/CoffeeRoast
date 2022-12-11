<template>
  <footer class="bg-secondary bg-opacity-50 py-3 py-md-4 py-lg-4">
    <div class="container">
      <div class="d-flex justify-content-center">
        <RouterLink
          class="me-3 coffee-nav-icon"
          to="/Login"
        >
          <i class="bi bi-person-circle coffee-icon-size" />
        </RouterLink>
        <a
          class="coffee-nav-icon"
          href="https://github.com/AndersonShen2020/Vue_Final"
        >
          <i class="bi bi-github coffee-icon-size" />
        </a>
      </div>
      <div class="row text-center">
        <p class="mb-0">
          本網站僅個人練習使用．不做任何商業用途
        </p>
        <p class="mb-0">
          Copyright © 2022 made by AndersonShen2020
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.coffee-nav-icon:hover {
  transform: scale(1.1);
}

.coffee-icon-size {
  font-size: 1.2rem;
}
</style>
