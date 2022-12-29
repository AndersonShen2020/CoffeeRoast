<template>
  <Loading :active="isLoading" />
  <div class="container main py-3">
    <div class="row text-center px-3">
      <div class="col-4 d-flex flex-column bg-secondary text-primary p-3">
        <span>STEP1</span>
        <span>確認訂單</span>
      </div>
      <div
        class="col-4 d-flex flex-column p-3"
        :class="!isPaid ? 'bg-primary text-secondary' : 'bg-secondary text-primary'"
      >
        <span>STEP2</span>
        <span>建立訂單</span>
      </div>
      <div
        class="col-4 d-flex flex-column p-3"
        :class="isPaid ? 'bg-primary text-secondary' : 'bg-secondary text-primary'"
      >
        <span>STEP3</span>
        <span>完成訂單</span>
      </div>
    </div>

    <!-- 建立訂單 -->
    <template v-if="!isPaid">
      <div class="row py-3 justify-content-between gx-0 text-primary">
        <div class="col-md-6">
          <ul class="list-unstyled p-3">
            <p class="d-flex fs-3 fw-bold">
              訂單內容
              <span
                :class="{ 'text-danger': !isPaid, 'text-success': isPaid }"
              >({{ isPaid ? '付款成功' : '未付款' }})</span>
            </p>
            <li
              class="py-3 border-bottom"
              v-for="product in order.products"
              :key="product.id"
            >
              <div class="d-flex justify-content-between">
                <div>{{ product.product.title }}</div>
                <div>NT$ {{ product.final_total }}</div>
              </div>
              <div>數量：{{ product.qty }}</div>
            </li>
            <li>
              總計金額：NT$
              <span
                class="fs-5 fw-bold"
                :class="{ 'text-danger': !isPaid, 'text-success': isPaid }"
              >
                {{ order.total }}</span>
            </li>
          </ul>
        </div>
        <div class="col-md-5 bg-light bg-opacity-50 p-3">
          <p class="fs-3 fw-bold">
            訂購資訊
          </p>
          <ul class="list-unstyled">
            <li class="row">
              <p class="col-4">
                訂單金額：
              </p>
              <p class="col">
                NT$
                <span
                  class="fs-5 fw-bold"
                  :class="{ 'text-danger': !isPaid, 'text-success': isPaid }"
                >
                  {{ order.total }}</span>
              </p>
            </li>
            <li class="row">
              <p class="col-4">
                訂單編號：
              </p>
              <p class="col">
                {{ order.id }}
              </p>
            </li>
            <li class="row">
              <p class="col-4">
                訂購時間：
              </p>
              <p class="col">
                {{ new Date(order.create_at * 1000).toLocaleString() }}
              </p>
            </li>
            <li class="row">
              <p class="col-4">
                Email：
              </p>
              <p class="col">
                <a :href="'mailto:' + order?.user?.email">{{
                  order?.user?.email
                }}</a>
              </p>
            </li>
            <li class="row">
              <p class="col-4">
                收件人姓名：
              </p>
              <p class="col">
                {{ order?.user?.name }}
              </p>
            </li>
            <li class="row">
              <p class="col-4">
                聯絡電話
              </p>
              <p class="col">
                <a :href="'tel:+' + order?.user?.tel">
                  {{ order?.user?.tel }}
                </a>
              </p>
            </li>
            <li class="row">
              <p class="col-4">
                收件地址：
              </p>
              <p class="col">
                {{ order?.user?.address }}
              </p>
            </li>
            <li class="row">
              <p class="col-4">
                備註：
              </p>
              <p class="col">
                {{ order.message }}
              </p>
            </li>
            <li class="row mt-3 px-3">
              <button
                class="btn coffee-btn p-4 coffee-btn-ls"
                @click="payBill"
                v-if="!isPaid"
              >
                信用卡付款
              </button>
              <RouterLink
                class="btn coffee-btn p-4 coffee-btn-ls"
                to="/Products"
                v-else
              >
                繼續購物 ！
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </template>
    <!-- 完成訂單 -->
    <template v-if="isPaid">
      <div class="container my-5 text-primary">
        <div class="row">
          <div class="col-lg-7 col-md-5 mx-auto">
            <div class="card-body">
              <div class="text-center fs-1 mb-3">
                <i class="bi bi-cart-check text-secondary" />
              </div>
              <h2 class="text-center">
                完成訂單
              </h2>

              <div class="border border-secondary my-5" />

              <div
                class="accordion my-5"
                id="accordionFlushExample"
              >
                <div class="accordion-item">
                  <h2
                    class="accordion-header"
                    id="flush-headingOne"
                  >
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      本次訂購商品
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      <ul class="list-unstyled p-3">
                        <li
                          class="py-3 border-custom"
                          v-for="product in order.products"
                          :key="product.id"
                        >
                          <div class="d-flex justify-content-between">
                            <div>{{ product.product.title }}</div>
                            <div>NT$ {{ product.final_total }}</div>
                          </div>
                          <div>數量：{{ product.qty }}</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <ul class="list-unstyled">
                <li class="row">
                  <p class="col-4">
                    訂單金額：
                  </p>
                  <p class="col">
                    NT$
                    <span
                      class="fs-5 fw-bold"
                      :class="{
                        'text-danger': !isPaid,
                        'text-success': isPaid
                      }"
                    >
                      {{ order.total }}</span>
                  </p>
                </li>
                <li class="row">
                  <p class="col-4">
                    訂單編號：
                  </p>
                  <p class="col">
                    {{ order.id }}
                  </p>
                </li>
                <li class="row">
                  <p class="col-4">
                    訂購時間：
                  </p>
                  <p class="col">
                    {{ new Date(order.create_at * 1000).toLocaleString() }}
                  </p>
                </li>
                <li class="row">
                  <p class="col-4">
                    Email：
                  </p>
                  <p class="col">
                    <a :href="'mailto:' + order?.user?.email">{{
                      order?.user?.email
                    }}</a>
                  </p>
                </li>
                <li class="row">
                  <p class="col-4">
                    收件人姓名：
                  </p>
                  <p class="col">
                    {{ order?.user?.name }}
                  </p>
                </li>
                <li class="row">
                  <p class="col-4">
                    聯絡電話
                  </p>
                  <p class="col">
                    <a :href="'tel:+' + order?.user?.tel">
                      {{ order?.user?.tel }}
                    </a>
                  </p>
                </li>
                <li class="row">
                  <p class="col-4">
                    收件地址：
                  </p>
                  <p class="col">
                    {{ order?.user?.address }}
                  </p>
                </li>
                <li class="row">
                  <p class="col-4">
                    備註：
                  </p>
                  <p class="col">
                    {{ order.message }}
                  </p>
                </li>
                <li class="row mt-3 px-3">
                  <button
                    class="btn coffee-btn p-4 coffee-btn-ls"
                    @click="payBill"
                    v-if="!isPaid"
                  >
                    信用卡付款
                  </button>
                  <RouterLink
                    class="btn coffee-btn p-4 coffee-btn-ls"
                    to="/Products"
                    v-else
                  >
                    繼續購物 ！
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import emitter from '@/api/mitt.js'

import axios from 'axios'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

import Swal from 'sweetalert2'
const url = process.env.VUE_APP_API
const path = process.env.VUE_APP_PATH

export default {
  components: {
    Loading
  },
  data () {
    return {
      id: this.$route.params.id,
      order: {},
      isPaid: false,
      isLoading: false
    }
  },
  methods: {
    async getOrder () {
      try {
        const { data } = await axios.get(`${url}/api/${path}/order/${this.id}`)
        this.order = data.order
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
    async payBill () {
      this.isLoading = true
      try {
        await axios.post(`${url}/api/${path}/pay/${this.id}`)
        Swal.fire({
          iconHtml: '<i class="bi bi-emoji-smile"></i>',
          timer: 2000,
          showConfirmButton: false,
          title: '感謝您購買我們的產品，期待您的再次光臨！'
        })
      } catch (err) {
        this.isLoading = false
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
      document.title = '完成訂單 | Coffee Roast'
      this.isPaid = true
      this.isLoading = false
      emitter.emit('getCartNum')
    }
  },
  mounted () {
    this.isLoading = true
    this.getOrder()
  },
  beforeRouteEnter () {
    document.title = '建立訂單 | Coffee Roast'
  }
}
</script>

<style lang="scss" scoped>
.border-custom {
  border-bottom: 1px solid #dbdbdb;
}

.border-custom:last-child {
  border-bottom: 0px solid #dbdbdb;
}

.coffee-btn-ls {
  letter-spacing: 2px;
}
</style>
