<template>
  <d2-container class="page">
<!--    <p>网站首页</p>-->
<!--    <d2-icon-svg class="logo" name="d2-admin"/>-->
    <d2-page-cover>
<!--      <p>首页</p>-->
<!--      <d2-icon-svg class="logo" name="d2-admin"/>-->
      <img style="transform:scale(4);" src="./image/title.png">
      <template slot="footer">
<!--        <div class="btn-group">-->
<!--          <span class="btn-group__btn" @click="$open('https://github.com/d2-projects')">开源组织</span> |-->
<!--          <span class="btn-group__btn" @click="$open('https://d2.pub/zh/doc/d2-admin')">文档</span> |-->
<!--          <span class="btn-group__btn" @click="$open('https://github.com/d2-projects/d2-admin-start-kit')">简化版</span> |-->
<!--          <span class="btn-group__btn" @click="$open('https://juejin.im/user/57a48b632e958a006691b946/posts')">掘金</span> |-->
<!--          <el-popover :width="150" trigger="hover">-->
<!--            <img src="./image/qr.jpg" style="width: 150px;">-->
<!--            <span slot="reference" class="btn-group__btn btn-group__btn&#45;&#45;link">-->
<!--              <d2-icon name="weixin"/>-->
<!--              微信服务号-->
<!--            </span>-->
<!--          </el-popover>-->
<!--        </div>-->
<!--        <d2-badge/>-->
<!--        <d2-help/>-->
      </template>
    </d2-page-cover>
  </d2-container>
</template>

<script>
import D2PageCover from './components/d2-page-cover'
// import { mapActions } from 'vuex'
// import { menuHeader, menuAside } from '@/menu'
export default {
  components: {
    D2PageCover
  }
}
</script>

<style lang="scss" scoped>
.page {
  .logo {
    width: 120px;
  }
  .btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    line-height: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    .btn-group__btn {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
      &.btn-group__btn--link {
        color: $color-primary;
      }
    }
  }
}
</style>
