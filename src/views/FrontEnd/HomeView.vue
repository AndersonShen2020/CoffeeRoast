<template>
  <Loading :active="isLoading" />
  <div
    class="leading-img d-flex justify-content-center bg-cover2 position-relative"
  >
    <div class="align-self-center">
      <div
        class="text-primary bg-dark bg-opacity-25 p-3 leading-title leading-text"
      >
        <p class="h3 fw-bold">
          工作與咖啡有各種組合
        </p>
        <p class="h3 fw-bold leading-text-indent">
          找到專屬於你的最佳搭配
        </p>
      </div>
      <div class="leading-btn">
        <RouterLink
          class="btn btn-lg coffee-btn p-3"
          to="/products"
        >
          前往商品頁面
        </RouterLink>
      </div>
    </div>
    <div class="position-absolute bottom-0 start-50 translate-middle-x">
      <div class="d3 down-animation" />
    </div>
  </div>
  <!-- 產品頁連結 -->
  <div class="bg-light bg-opacity-50 py-5">
    <div class="container">
      <div class="row">
        <div class="col text-center">
          <h2 class="text-primary">
            香濃好滋味，獨享你的味道。
          </h2>
          <p class="text-coffee">
            歡迎來到 Coffee Roast，歡慶開幕輸入折扣優惠碼「<span
              class="fw-bold"
            >pay88</span>」全品項打 8 折，心動不如馬上行動！
          </p>
          <RouterLink
            class="btn coffee-btn"
            to="/products"
          >
            前往商品頁面
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <!-- 知識 -->
  <div class="container my-3">
    <div class="row">
      <div class="col-md-7 d-none d-md-block">
        <div class="bg-image1" />
      </div>
      <div class="col-md-5 d-flex flex-column justify-content-center">
        <h3 class="coffee-header">
          咖啡品種
        </h3>
        <div class="text-start text-lg-center text-coffee">
          <p>咖啡豆的產地主要來自非洲、南美洲及亞洲地區。</p>
          <p>非洲產出的咖啡豆大多帶有水果酸味及香氣。</p>
          <p>南美洲整體平衡感佳，口感明亮清爽。</p>
          <p>亞洲則是酸度低並帶有香料風味。</p>
        </div>
        <div class="d-flex justify-content-end">
          <RouterLink
            class="btn coffee-btn"
            to="/KnowledgeView"
          >
            查看咖啡品種
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-5 d-flex flex-column justify-content-center">
        <h3 class="coffee-header">
          咖啡烘焙
        </h3>
        <div class="text-start text-lg-center text-coffee">
          <p>烘焙咖啡使咖啡生豆通過烘炒轉變為已烘焙的咖啡製品。</p>
          <p>
            烘炒的過程使得生豆膨脹並改變其顏色、口感、氣味與密度，因而產生了咖啡的特殊風味。
          </p>
          <p>
            未烘焙的咖啡豆與已烘焙的含有相似的酸度、蛋白質與咖啡因，但缺少其美好滋味。
          </p>
          <p>
            最簡單的判斷方式是，豆子烘烤的時間越長，酸味越淡，咖啡因含量也越少。
          </p>
        </div>
        <div class="d-flex justify-content-end">
          <RouterLink
            class="btn coffee-btn"
            :to="{ path: '/KnowledgeView', query: { state: 'coffeeRoast' } }"
          >
            查看咖啡烘焙
          </RouterLink>
        </div>
      </div>
      <div class="col-md-7 d-none d-md-block">
        <div class="bg-image2" />
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-7 d-none d-md-block">
        <div class="bg-image3" />
      </div>
      <div class="col-md-5 d-flex flex-column justify-content-center">
        <h3 class="coffee-header">
          手沖咖啡
        </h3>
        <div class="text-start text-lg-center text-coffee">
          <p>手沖咖啡一點也不難！</p>
          <p>
            而它最有趣的地方是，即使咖啡粉是同一包，也可以因為水溫、咖啡粉的粉量、手沖的速度、沖煮的方法，而讓每一次泡的味道有所不同！
          </p>
        </div>
        <div class="d-flex justify-content-end">
          <RouterLink
            class="btn coffee-btn"
            :to="{ path: '/KnowledgeView', query: { state: 'coffeeBrew' } }"
          >
            查看手沖咖啡
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <!-- 產品 -->
  <div class="bg-light bg-opacity-50 py-5 my-5">
    <div class="container">
      <h2 class="text-center text-primary mb-5">
        我們的咖啡豆
      </h2>
      <Swiper
        :loop="true"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false
        }"
        :modules="modules"
        :breakpoints="breakpoints"
        :navigation="navigation"
      >
        <SwiperSlide
          v-for="product in coffeeProducts"
          :key="product.id"
        >
          <CardComponent :item="product" />
        </SwiperSlide>
        <div class="swiper-button-prev" />
        <div class="swiper-button-next" />
      </Swiper>
    </div>
  </div>
  <!-- 電子報 -->
  <div class="py-5 mt-5">
    <div class="container">
      <div class="row">
        <div class="col text-center">
          <form @submit.prevent="subscription">
            <label
              class="form-label"
              for="email"
            >
              <h2 class="text-primary">訂閱我們以獲得更多優惠資訊</h2>
            </label>
            <div class="row">
              <div class="col-6 mx-auto">
                <div class="input-group">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    placeholder="輸入 Email 訂閱我們"
                    v-model.trim="subscribeEmail"
                  >
                  <button
                    class="btn btn-primary"
                    type="submit"
                  >
                    <span>訂閱</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Autoplay, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'

import '@/assets/stylesheets/swiper/swiper.scss'
import '@/assets/stylesheets/swiper/navigation.scss'

import axios from 'axios'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import CardComponent from '@/components/common/CardComponent.vue'
const url = process.env.VUE_APP_API
const path = process.env.VUE_APP_PATH

export default {
  data () {
    return {
      subscribeEmail: '',
      isLoading: false,
      modules: [Autoplay, Navigation],
      coffeeProducts: [],
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 60
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 40
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    CardComponent,
    Loading
  },
  methods: {
    async getCoffeeProducts () {
      try {
        const { data } = await axios.get(`${url}/api/${path}/products/all`)
        this.coffeeProducts = data.products.filter(
          (item) => item.classification === '咖啡豆'
        )
      } catch (err) {
        this.isLoading = false
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
      this.isLoading = false
    },
    async subscription () {
      const rule =
        /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
      const result = rule.test(this.subscribeEmail)
      const params = { email: this.subscribeEmail }
      const pathEmail = process.env.VUE_APP_GOOGLE_SHEET_API

      if (result) {
        try {
          await axios.post(pathEmail, null, {
            params
          })
          this.$swal({
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            text: '訂閱成功，感謝您的訂閱。'
          })
          this.subscribeEmail = ''
        } catch (err) {
          this.$swal({
            icon: 'error',
            timer: 2000,
            showConfirmButton: false,
            text: '訂閱失敗，請重新輸入。'
          })
        }
      } else {
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: '信箱格式錯誤，請重新輸入。'
        })
      }
    }
  },
  mounted () {
    this.isLoading = true
    this.getCoffeeProducts()
  }
}
</script>

<style lang="scss">
.leading-img {
  min-height: calc(100vh - 68px);
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
}

@media screen and (max-width: 390px) {
  .leading-img {
    background-position: left;
  }
}

.leading-text {
  padding: 1rem;
  letter-spacing: 0.25rem;
  &-indent {
    text-indent: 10vmin;
  }
}

.leading-title {
  transform: translate(100%, -40%);
}

.leading-btn {
  transform: translate(100%, -40%);
}

@media screen and (max-width: 575.98px) {
  .leading-img {
    background-position: left;
  }
  .leading-title {
    writing-mode: vertical-rl;
    transform: translate(-80%, -40%);
  }
  .leading-btn {
    transform: translate(-78%, -250%);
  }
}

.card > .card-img {
  min-height: 200px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.swiper-slide {
  height: auto;
}

.bg-cover1 {
  background-image: url('~@/assets/img/cover01.jpg');
}

.bg-cover2 {
  background-image: url('~@/assets/img/cover04.jpg');
}

.bg-image1 {
  background-image: url('~@/assets/img/image01.jpg');
  height: 400px;
  background-size: cover;
  background-position: center;
}

.bg-image2 {
  background-image: url('~@/assets/img/image02.jpg');
  height: 400px;
  background-size: cover;
}

.bg-image3 {
  background-image: url('~@/assets/img/image03.jpg');
  height: 400px;
  background-size: cover;
}

.d3 {
  margin-left: 10px;
  float: left;
  width: 0;
  height: 0;
  border-width: 50px;
  border-style: solid;
  border-color: rgb(255, 255, 255) transparent transparent transparent;
}

.down-animation {
  position: relative;
  animation: down-ani 2s ease infinite;
}

@keyframes down-ani {
  25% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(0.6rem * 8) scale(0.5);
  }
}
</style>
