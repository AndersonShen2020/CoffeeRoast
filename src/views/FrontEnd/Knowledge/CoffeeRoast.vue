<template>
  <div class="mt-3 text-primary">
    <h3 class="coffee-header">
      咖啡的烘焙
    </h3>
    <p>
      豆子烘烤的時間，會影響外觀和味道。最簡單的判斷方式是，豆子烘烤的時間越長，酸味越淡，咖啡因含量也越少。以下我們簡單列出不同烘焙時間會產生的咖啡風味，提供你參考。
    </p>
    <div class="row mt-3">
      <div class="col-md-6">
        <div class="m-1">
          <h3 class="coffee-header">
            極淺焙（light roast）
          </h3>
          <p>有濃厚的青草味，香氣不足，很少用來品嚐。</p>
        </div>
        <div class="m-1">
          <h3 class="coffee-header">
            淺焙（cinnamon roast）
          </h3>
          <p>酸度高，略帶香氣，常用來沖美式咖啡。</p>
        </div>
      </div>
      <div class="col-md-6 d-none d-md-block">
        <div class="bg-roast-image1" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6 d-none d-md-block">
        <div class="bg-roast-image2" />
      </div>
      <div class="col-md-6">
        <div class="m-1">
          <h3 class="coffee-header">
            中焙（medium roast）
          </h3>
          <p>
            口感偏酸帶苦，香氣適中，保留咖啡豆的原始風味，常用來做美式咖啡或混合咖啡。
          </p>
        </div>
        <div class="m-1">
          <h3 class="coffee-header">
            中深焙（high roast）
          </h3>
          <p>口感層次豐富、酸苦均衡且略帶甜味，香氣風味都好。</p>
        </div>
        <div class="m-1">
          <h3 class="coffee-header">
            城市烘焙（city roast）
          </h3>
          <p>
            比中深焙的酸度低一些，完美展現咖啡的風味，是標準的烘焙程度，最受一般大眾歡迎。
          </p>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6">
        <div class="m-1">
          <h3 class="coffee-header">
            深焙（full city roast）
          </h3>
          <p>苦味比酸味強，餘味回甘，香氣飽滿，多用來做冰咖啡或黑咖啡。</p>
        </div>
        <div class="m-1">
          <h3 class="coffee-header">
            法式烘焙（French roast）
          </h3>
          <p>苦味濃、味道強烈，沒什麼酸味，帶有煙熏香氣。</p>
        </div>
        <div class="m-1">
          <h3 class="coffee-header">
            重焙（Italian roast）
          </h3>
          <p>豆子表面有油光，苦味強，有焦味，主要用來做義式濃縮咖啡。</p>
        </div>
      </div>
      <div class="col-md-6 d-none d-md-block">
        <div class="bg-roast-image3" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* * {
  margin: 1rem auto;
} */

p {
  line-height: 1.8rem;
}

.bg-roast-image1 {
  background-image: url('~@/assets/img/image04.jpg');
  height: 200px;
  background-size: cover;
}

.bg-roast-image2 {
  background-image: url('~@/assets/img/image02.jpg');
  height: 300px;
  background-size: cover;
}

.bg-roast-image3 {
  background-image: url('~@/assets/img/image01.jpg');
  height: 300px;
  background-size: cover;
}
</style>
