<template>
  <div class="container main">
    <div
      class="d-flex flex-column justify-content-center align-items-center text-primary"
    >
      <i class="bi bi-emoji-frown error-icon" />
      <h2>404 Not Found</h2>
      <p>不好意思，這頁面不存在</p>
      <RouterLink to="/">
        <button
          type="button"
          class="btn coffee-btn"
        >
          回首頁
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh);
}

.error-icon {
  font-size: 10rem;
}
</style>
