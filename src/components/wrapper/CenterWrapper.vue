<template>
  <a-row justify="center" align="middle" class="formWrapper">
    <a-col>
      <slot />
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {

  },
  components: {
  },
})
</script>

<style scoped>
.formWrapper {
  /* 让 Login 页面撑满整个页面, 这样垂直居中才有效果 */
  min-height: 100vh;
}
</style>
