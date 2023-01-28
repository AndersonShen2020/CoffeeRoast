# CoffeeRoast

![專案封面圖](https://i.imgur.com/k7mz4V1.png)

- [線上觀看連結](https://andersonshen2020.github.io/CoffeeRoast/#/)

## 功能

- [x] 首頁
  - [x] Email 訂閱
- [x] 關於本店
  - [x] Google Map
  - [x] 電話超連結
- [x] 咖啡知識
- [x] 產品列表
  - [x] 單一產品介紹
- [x] 購物車
  - [x] 加入購物車
  - [x] 調整購物車內容
  - [x] 送出訂單
- [x] 後臺管理
  - [x] 後臺登入/登出
  - [x] 經營儀表板 (圖表) 一覽
  - [x] 產品管理 (CRUD)
  - [x] 優惠卷管理 (CRUD)
  - [x] 訂單管理 (CRUD)

## 預覽畫面

### 用戶介面

![專案封面圖](https://i.imgur.com/k7mz4V1.png)

![產品列表圖](https://i.imgur.com/7zsKVTY.png)

![完成訂單圖](https://i.imgur.com/9aypR7L.png)

### 後台管理者管理

![後臺經營儀表板圖](https://i.imgur.com/cC03LqW.png)

![後臺產品管理圖](https://i.imgur.com/90cs74h.png)

## 測試環境

- chrome
- 行動版使用 chrome 的內建工具，以 iPhone 12 Pro(390 * 844) 來進行開發

## 安裝

Node.js 版本建議為 `v12.19.0`

### 取得專案

```bash
git clone https://github.com/AndersonShen2020/CoffeeRoast.git
```

### 移動到專案

```bash
cd CoffeeRoast
```

### 安裝套件

```bash
npm install
```

### 環境變數設定

如有需要，請依據 `.env` 內容調整相關欄位。

### 運行專案

```bash
npm run serve
```

### 開啟專案

在瀏覽器網址列輸入以下即可看到畫面

```bash
http://localhost:8080/
```

## 環境變數說明

```env
VUE_APP_API = API URL
VUE_APP_PATH = API PATH
VUE_APP_GOOGLE_SHEET_API = Google APPs Script URL
```

## 資料夾說明

- api - api 放置處
- assets - 靜態資源放置處
  - img - 圖片放置處
  - stylesheets - scss 檔案放置處
- components - component 放置處
- mixins - mixin 放置處
- router - 路由放置處
- views - 畫面放置處

## 專案技術

- Node.js v12.19.0
- Vue v3.0.0
- Vue Router v4.0.0-0
- vee-validate v4.5.8
- vue-loading-overlay v5.0.3
- Axios v0.25.0
- Bootstrap v5.1.3
- bootstrap-icons v1.7.2
- c3.js v0.7.20
- mitt v3.6.5
- sweetalert2 v11.4.8
- swiper v8.0.7

## 第三方服務

- Google APPs Script

## 注意事項

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

官方文件的載入方式是錯誤的，照做不會有效果

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
