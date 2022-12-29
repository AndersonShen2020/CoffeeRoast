<template>
  <div class="container main">
    <nav class="py-2 border-bottom">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <RouterLink to="/">
            首頁
          </RouterLink>
        </li>
        <li class="breadcrumb-item active">
          關於本店
        </li>
      </ol>
    </nav>

    <div class="row mt-3">
      <div class="col-md-6">
        <div class="mt-3 d-flex flex-column">
          <h2 class="text-primary fw-bold">
            <i class="bi bi-shop" /> 門市資訊
          </h2>
          <p class="my-3 text-primary h5">
            我們非常高興能聽到來自客戶的任何意見，歡迎隨時聯絡我們，詢問、訂購產品或提供寶貴建議！
          </p>

          <div class="m-3 h4 text-primary fw-bold">
            <p>
              營業時間 <i class="bi bi-clock" /> ： 週一至週六 09：00 AM ~
              19：00 PM
            </p>
            <p>
              聯絡地址
              <i class="bi bi-house" />
              ：台北市大安區通化街165巷24弄10號
            </p>
            <p>
              客服專線 <i class="bi bi-telephone" /> ：<a
                href="tel:+886-2-5876666"
              >02-2587-6666</a>
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14460.742482510463!2d121.555108!3d25.027774!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6d61b8862127bcb7!2z5Yqg54i-56ys5ZKW5ZWhLemAmuWMluW6lyhLYWxkaSBjb2ZmZWUp!5e0!3m2!1szh-TW!2stw!4v1647934721458!5m2!1szh-TW!2stw"
          width="500"
          height="450"
          allowfullscreen
          loading="lazy"
          class="mt-3 map-style"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
p {
  line-height: 1.8;
}

.map-style {
  border: 0;
}

@media screen and (max-width: 540px) {
  iframe {
    width: 450px;
  }
}
@media screen and (max-width: 414px) {
  iframe {
    width: 350px;
  }
}
</style>
