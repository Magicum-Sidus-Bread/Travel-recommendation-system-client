<template>
  <div class="page">
    <p class="page_title" v-if="role!=='error'">当前用户没有查看权限，请返回首页</p>
    <p class="page_title" v-if="role==='error'">您的账号已经被封，如想继续使用请返回首页进行账号申诉！</p>
    <el-button class="d2-mt" @click="$router.replace({ path: '/' })">
      返回首页
    </el-button>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'unauth',
  data () {
    return {
      role: util.cookies.get('role')
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background: #303133;
  background-blend-mode: multiply,multiply;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .page_title {
    font-size: 20px;
    color: #FFF;
  }
}
</style>
