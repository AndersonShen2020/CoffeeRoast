<template>
  <nav v-if="pages">
    <ul class="pagination justify-content-center">
      <!-- 前一頁 -->
      <li
        class="page-item"
        :class="{ disabled: pages.current_page === 1 }"
      >
        <a
          href="#"
          class="page-link"
          @click.prevent="emitpages(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- 前一頁 -->
      <li
        class="page-item"
        :class="{ active: page === pages.current_page }"
        aria-current="page"
        v-for="(page, idx) in pages.total_pages"
        :key="idx"
      >
        <span
          class="page-link"
          v-if="page === pages.current_page"
        >
          {{ page }}
        </span>
        <a
          href="#"
          class="page-link"
          v-else
          @click.prevent="emitpages(page)"
        >
          {{ page }}
        </a>
      </li>
      <!-- 下一頁 -->
      <li
        class="page-item"
        :class="{ disabled: pages.current_page === pages.total_pages }"
      >
        <a
          href="#"
          class="page-link"
          @click.prevent="emitpages(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
      <!-- 下一頁 -->
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }" -> 把 res.data.pagination 整串丟進來
// @emitPages="更新頁面事件" -> 外部取得資料的 API 的 function
export default {
  props: ['pages'],
  methods: {
    emitpages (item) {
      this.$emit('emitpages', item)
    }
  }
}
</script>

<style scoped>
.disabled {
  cursor: no-drop;
}
* {
  cursor: pointer;
}
</style>
