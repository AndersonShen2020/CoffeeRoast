## 本專案的注意事項

### 測試環境

- chrome
- 行動版使用 chrome 的內建工具，以 iPhone 12 Pro(390 * 844) 來進行開發

### Node.js

Node 的版本使用 v12.19.0

### 技術

- Vue 3
- Vue Cli
- Vue Router
- Google APPs Script

### 使用的 Plugin

- Bootstrap 5
- bootstrap-icons
- Axios
- VeeValidate
- mitt
- vue-loading-overlay
- Swiper
- Sweetalert2
- c3.js

### API 串接

後端 DashboardView.vue 中的 `getAllOrdersAndChangeTimestamp` 函式之所以要重複呼叫 `getOrdersForChart`，是因為 API 只提供「依據頁數回傳相對應的訂單」

## 開發過程的問題紀錄

### Bootstrap Modal 的使用

如果有重複實例化(`new Modal(this.$refs.modal);`)，會無法正常運作。
擔心會重複實例化就設計成使用 mixins 載入，這樣只要在 mixins 中實例化就好

### 載入 bootstrap-icons

官方文件並沒有告知要如何在 npm 的情況下使用，所以模仿 Bootstrap 的模式找到 `bootstrap-icons.css` 這個檔案來載入使用

```scss
@import "~bootstrap-icons/font/bootstrap-icons.css";
```

### 載入 Swiper

官方文件的載入方式是錯誤的，照做不會有效果 - 2022/03/18

```js
// 官方文件的載入方式
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
```

```js
// 正確載入
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";

import "swiper/swiper.scss";
```

### mitt 的使用

測試結果是 `this` 不能抓到 Vue 的相關資訊

```js
// 官方範例
emitter.on("clearCart", this.getCart());
```

要改用 `const vm = this`，讓立即函式可以抓到正確的 `this`

```js
// 實際狀況
const vm = this;

emitter.on("clearCart", () => {
  vm.getCart();
});
```

### $route.query 加上 watch 來做篩選功能

嘗試將產品列表都抓下來後，針對 category 這個屬性在本地端去做篩選功能

```vue
watch: {
  $route(to) {
    console.log(to.query.category)
  }
}
```
