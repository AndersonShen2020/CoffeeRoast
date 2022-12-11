<template>
  <div class="container">
    <nav class="py-2 border-bottom">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item text-primary">
          <RouterLink to="/">
            首頁
          </RouterLink>
        </li>
        <li class="breadcrumb-item active">
          咖啡知識
        </li>
      </ol>
    </nav>

    <div class="row mt-3">
      <div class="col-md-3">
        <div class="d-flex flex-md-column">
          <button
            class="btn"
            :class="{ 'btn-primary': state === 'coffeeKind' }"
            type="button"
            @click="
              ;(state = 'coffeeKind'), ($route.query.state = 'coffeeKind')
            "
          >
            咖啡品種
          </button>
          <button
            class="btn"
            :class="{ 'btn-primary': state === 'coffeeRoast' }"
            type="button"
            @click="
              ;(state = 'coffeeRoast'), ($route.query.state = 'coffeeRoast')
            "
          >
            咖啡豆烘焙
          </button>
          <button
            class="btn"
            :class="{ 'btn-primary': state === 'coffeeBrew' }"
            type="button"
            @click="
              ;(state = 'coffeeBrew'), ($route.query.state = 'coffeeBrew')
            "
          >
            手沖咖啡技巧
          </button>
        </div>
      </div>
      <div class="col-md-9">
        <CoffeeKind
          v-if="
            ($route.query.state === 'coffeeKind') | (state === 'coffeeKind')
          "
        />
        <CoffeeRoast
          v-if="
            ($route.query.state === 'coffeeRoast') | (state === 'coffeeRoast')
          "
        />
        <CoffeeBrew
          v-if="
            ($route.query.state === 'coffeeBrew') | (state === 'coffeeBrew')
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import CoffeeKind from '@/views/FrontEnd/Knowledge/CoffeeKind.vue'
import CoffeeRoast from '@/views/FrontEnd/Knowledge/CoffeeRoast.vue'
import CoffeeBrew from '@/views/FrontEnd/Knowledge/CoffeeBrew.vue'
import titleMixin from '@/mixins/titleMixin'

export default {
  components: { CoffeeKind, CoffeeRoast, CoffeeBrew },
  mixins: [titleMixin],
  data () {
    return {
      state: 'coffeeKind',
      title: '咖啡知識'
    }
  },
  methods: {
    goTop () {
      document.documentElement.scrollTop = 0
    }
  },
  mounted () {
    this.goTop()
  }
}
</script>
