<template>
  <div class="d2-page-cover">
    <div class="d2-page-cover__logo">
      <slot/>
    </div>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p class="d2-page-cover__title" style="font-size: 30px;">V1.4.0</p>
    <p class="d2-page-cover__sub-title" style="font-size: 20px;">优雅的旅行线路规划方案</p>
    <p class="d2-page-cover__build-time" style="font-size: 15px;">FINAL BUILD TIME {{$buildTime}}</p>
    <slot name="footer"/>
    <a target="blank" href="https://gitee.com/susancutie/client-front_end">
      <img
        style="position: absolute; top: 0; right: 0; border: 0; width: 150px;"
        src="./image/darkblue@2x.png"
        alt="Fork me on Gitee">
    </a>
  </div>
</template>

<style lang="scss" scoped>
.d2-page-cover {
  @extend %full;
  @extend %unable-select;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .d2-page-cover__logo {
    img {
      width: 200px;
    }
  }
  .d2-page-cover__title {
    margin: 0px;
    margin-bottom: 20px;
    font-weight: bold;
    color: $color-text-main;
  }
  .d2-page-cover__sub-title {
    margin: 0px;
    margin-bottom: 5px;
    color: $color-text-normal;
  }
  .d2-page-cover__build-time {
    margin: 0px;
    margin-bottom: 10px;
    font-size: 12px;
    color: $color-text-placehoder;
  }
}
</style>
