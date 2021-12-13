<template>
  <div class="xtx-bread-item">
    <router-link v-if="to" :to="to"><slot /></router-link>
    <span v-else><slot /></span>
  </div>
  <i class="iconfont icon-angle-right"></i>
</template>

<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: [String, Object],
      default: '',
    },
  },
  setup() {},
};
</script>

<style lang="less" scoped>
</style>
