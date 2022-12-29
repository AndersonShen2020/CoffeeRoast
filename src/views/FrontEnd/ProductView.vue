<template>
  <Loading :active="isLoading" />
  <div class="container">
    <nav class="py-2 border-bottom">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <RouterLink
            class="text-primary"
            to="/"
          >
            首頁
          </RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink
            class="text-primary"
            to="/products"
          >
            產品列表
          </RouterLink>
        </li>
        <li
          class="breadcrumb-item active"
          aria-current="page"
        >
          {{ product.title }}
        </li>
      </ol>
    </nav>

    <div class="row align-items-center text-primary">
      <div class="col-sm-6">
        <div class="my-2">
          <img
            class="img-fluid object-fit_cover h-100"
            :src="product.imageUrl"
            :alt="product.title"
          >
        </div>
      </div>
      <div class="col-sm-6">
        <div class="row">
          <div class="mb-3">
            <p class="badge bg-primary rounded-pill">
              {{ product.category }}
            </p>
            <p class="display-4 fw-bold">
              {{ product.title }}
            </p>
          </div>
          <div class="mb-3">
            <p class="pre">
              {{ product.description }}
            </p>
          </div>
          <div class="mb-3 text-end">
            <span class="fs-3 fw-bold">NT$ {{ product.price }} 元</span>
            <span> / {{ product.unit }}</span>
          </div>
          <div class="d-flex">
            <select
              id=""
              class="form-select w-auto my-3 ms-auto"
              v-model="qty"
            >
              <option
                :value="num"
                v-for="num in 20"
                :key="num"
              >
                {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="d-flex justify-content-end">
            <span
              class="fs-3 fw-bold me-3"
            >總計 NT$ {{ qty * product.price }} 元</span>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(id)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5 pt-4 justify-content-center border-top text-primary">
      <template v-if="product.classification === '咖啡豆'">
        <div class="col-md-6">
          <div class="mb-5">
            <h4 class="fw-bold mb-3 pb-3">
              產品規格
            </h4>
            <p class="text-left">
              產地：{{ product.title }}<br><br>
              處理法：水洗<br><br>
              烘焙度：{{ product.category }}<br><br>
              保存方式：常溫、避免陽光直射<br><br>
              保存期限：365 天(未開封)<br><br>
              賞味期限：100 天（未開封）、 開封後建議立即享用<br><br>
              內容物重量：454g ± 10g<br><br>
              內容物：咖啡豆
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-5">
            <h4 class="fw-bold pb-3">
              使用方式
            </h4>
            <p class="text-left">
              咖啡比例：每 10g 使用 150 ~ 200cc 水沖泡咖啡<br>可因自己喜好口感增加或減少水量<br><br>
              萃取水溫：建議溫度 90 度~ 92 度
            </p>
          </div>
        </div>
      </template>
      <template v-if="product.category === '咖啡機'">
        <div class="col-md-6">
          <div class="mb-5">
            <h4 class="fw-bold mb-3 pb-3">
              產品規格
            </h4>
            <p class="text-left">
              產品名稱：{{ product.title }}<br><br>
              產品分類：{{ product.category }}<br><br>
              保存方式：避免陽光直射<br><br>
              咖啡豆容量：450克<br><br>
              牛奶壺容量：600毫升<br><br>
              咖啡渣容量：14份<br><br>
              水箱容量：1.7 公升<br><br>
              幫浦壓力：15 BAR<br><br>
              額定電壓/頻率/消耗電功率：120V / 60HZ /1400W<br><br>
              咖啡機重量：12.2 公斤<br><br>
              咖啡機尺寸(寬x高x深)：283 X 393 X 489 mm<br><br>
              電線長度：1200 毫米
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="mb-5">
            <h4 class="fw-bold pb-3">
              咖啡客製化
            </h4>
            <p class="text-left">
              預潤技術：V<br><br>
              最佳份量－可調整的每杯咖啡量：7 ~ 10.5 g<br><br>
              咖啡粉選項：V<br><br>
              可設定的沖煮溫度：V<br><br>
              可設定的杯內咖啡量：V<br><br>
              MEMO(記憶)功能：V<br><br>
              咖啡出口高度調節－最大高度：142-95 mm<br><br>
              可調整研磨器－材質：陶瓷<br><br>
              咖啡豆研磨自動調整(SAS)：V<br><br>
              溫杯盤：X<br><br>
            </p>
          </div>
        </div>
      </template>
      <template v-if="product.category === '馬克杯'">
        <div class="col-12">
          <div class="mb-5">
            <h4 class="fw-bold mb-3 pb-3">
              產品規格
            </h4>
            <p class="text-left">
              產品名稱：{{ product.title }}<br><br>
              產品分類：{{ product.category }}<br><br>
              材質：陶瓷<br><br>
              款式：標準直筒馬克杯<br><br>
              尺寸：約直徑8cm/高9.5cm<br><br>
              容量：約330cc<br><br>
              重量：約360g(總重)<br><br>
              產地：台灣<br><br>
              注意事項：杯子水洗永不退色，但不能放入微波爐、洗碗機、烤箱、電鍋..等高溫電器，否則圖案可能會退色或刮傷。
            </p>
          </div>
        </div>
      </template>
      <template v-if="product.category === '磨豆機'">
        <div class="col-md-6">
          <div class="mb-5">
            <h4 class="fw-bold mb-3 pb-3">
              產品規格
            </h4>
            <p class="text-left">
              產品名稱：{{ product.title }}<br><br>
              產品分類：{{ product.category }}<br><br>
              淨重：570g<br><br>
              機身直徑：50mm<br><br>
              磨豆量：40g
            </p>
          </div>
        </div>
        <div class="col-md-6" />
      </template>
    </div>

    <div class="row my-3">
      <div class="col-md-12">
        <h4 class="text-center py-3 fw-bold text-primary">
          你可能也會喜歡
        </h4>
        <Swiper
          :modules="modules"
          :loop="swiperOptions.loop"
          :breakpoints="swiperOptions.breakpoints"
          :autoplay="swiperOptions.autoplay"
        >
          <SwiperSlide
            v-for="swiperItem in products"
            :key="swiperItem.id"
          >
            <CardComponent :item="swiperItem" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/api/mitt.js'
import axios from 'axios'

import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'

import 'swiper/swiper.scss'

import CardComponent from '@/components/common/CardComponent.vue'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
const url = process.env.VUE_APP_API
const path = process.env.VUE_APP_PATH

export default {
  components: { Swiper, SwiperSlide, CardComponent, Loading },
  data () {
    return {
      id: this.$route.params.id,
      isLoading: false,
      product: {},
      qty: 1,
      products: [],
      modules: [Autoplay],
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true,
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 40
          }
        }
      }
    }
  },
  methods: {
    async addToCart (id, qty = 1) {
      this.isLoading = true
      const data = {
        product_id: id,
        qty: this.qty | qty
      }
      try {
        await axios.post(`${url}/api/${path}/cart`, { data })
        emitter.emit('getCartNum')
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
    },
    async getProduct () {
      try {
        const res = await axios.get(`${url}/api/${path}/product/${this.id}`)
        this.product = res.data.product
        document.title = `${res.data.product.title} | Coffee Roast`
      } catch (err) {
        this.isLoading = false
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
    },
    async getProductsWithCategory () {
      try {
        const { data } = await axios.get(`${url}/api/${path}/products/all`)
        this.products = data.products.filter(
          (item) => item.classification === this.product.classification
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
    }
  },
  async mounted () {
    this.isLoading = true
    await this.getProduct()
    await this.getProductsWithCategory()
  },
  watch: {
    $route (to) {
      if (to.params.id !== undefined) {
        this.id = to.params.id
        this.getProduct()
      }
    }
  }
}
</script>

<style>
.pre {
  white-space: pre-wrap;
}

.card > .card-img {
  min-height: 250px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.object-fit_cover {
  object-fit: cover;
}

.swiper-slide {
  height: auto;
}
</style>
