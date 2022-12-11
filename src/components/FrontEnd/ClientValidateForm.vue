<template>
  <div class="text-primary">
    <Form
      ref="form"
      autocomplete="off"
      v-slot="{ errors }"
      @submit="onSubmit"
    >
      <small
        class="text-muted"
      ><span class="text-danger">*</span> 為必填資料
      </small>
      <div class="my-3">
        <label
          for="email"
          class="form-label"
        >Email <span class="text-danger">*</span></label>
        <Field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          rules="required|email"
          placeholder="請輸入 Email"
          v-model="clientFrom.user.email"
        />
        <ErrorMessage
          name="email"
          class="invalid-feedback"
        />
      </div>

      <div class="mb-3">
        <label
          for="name"
          class="form-label"
        >收件人姓名 <span class="text-danger">*</span></label>
        <Field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          rules="required"
          placeholder="請輸入姓名"
          v-model="clientFrom.user.name"
        />
        <ErrorMessage
          name="姓名"
          class="invalid-feedback"
        />
      </div>

      <div class="mb-3">
        <label
          for="tel"
          class="form-label"
        >收件人電話 <span class="text-danger">*</span></label>
        <Field
          id="tel"
          name="mobile"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['mobile'] }"
          :rules="isPhone"
          placeholder="請輸入手機號碼 EX:0923456785"
          v-model="clientFrom.user.tel"
        />
        <ErrorMessage
          name="mobile"
          v-slot="{ message }"
        >
          <span
            role="alert"
            class="invalid-feedback"
          >{{ message }}</span>
        </ErrorMessage>
      </div>

      <div class="mb-3">
        <label
          for="address"
          class="form-label"
        >收件人地址 <span class="text-danger">*</span></label>
        <Field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          rules="required"
          placeholder="請輸入地址"
          v-model="clientFrom.user.address"
        />
        <ErrorMessage
          name="地址"
          class="invalid-feedback"
        />
      </div>

      <div class="mb-3">
        <label
          for="message"
          class="form-label"
        >留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="clientFrom.message"
        />
      </div>
      <div class="text-end">
        <button
          ref="sendOrder"
          type="submit"
          class="btn btn-danger"
          :disabled="!isEnableSend"
        >
          送出訂單
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import emitter from '@/api/mitt.js'

import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import axios from 'axios'
const url = process.env.VUE_APP_API
const path = process.env.VUE_APP_PATH

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)

configure({
  generateMessage: localize({ zh_TW: zhTW })
})

setLocale('zh_TW')

export default {
  data () {
    return {
      clientFrom: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      isEnableSend: false
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  methods: {
    async onSubmit () {
      try {
        const res = await axios.post(`${url}/api/${path}/order`, {
          data: this.clientFrom
        })
        this.clientFrom.message = ''
        this.$refs.form.resetForm()
        this.$router.push({
          path: `/CheckOut/${res.data.orderId}`
        })
      } catch (err) {
        this.$swal({
          icon: 'error',
          timer: 2000,
          showConfirmButton: false,
          text: err.response.data.message
        })
      }
      this.emit()
    },
    emit () {
      emitter.emit('clearCart')
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    }
  },
  mounted () {
    const vm = this
    emitter.on('cartSend', (res) => {
      vm.isEnableSend = res
    })
  }
}
</script>
