<template>
  <div class="xtx-bread">
    <slot />
  </div>
</template>

<script>
import { h } from 'vue';
export default {
  name: 'XtxBread',
  render() {
    // 1. 用法
    // 1. template 标签去除 单文件组件
    // 2. 返回值就是组件内容
    // 3. vue2.0 的h函数传参进来的, vue3.0 的h函数导入进来
    // 4. h第一个参数 标签名字 第二个参数 标签属性对象 第三个参数 子节点
    // 需求
    // 1. 创建xtx-bread 父容器
    // 2. 获取默认插槽内容
    // 3. 去除xtx-bread-item 组件的i标签因该render函数来组织的
    // 4. 遍历插槽中的item,得到一个动态创建的节点最后一个item不加i标签
    // 5. 把动态创建的节点渲染在xtx-bread标签中
    const items = this.$slots.default();
    const dymanicItems = [];
    items.forEach((item, i) => {
      dymanicItems.push(item);
      if (i < item.length - 1) {
        dymanicItems.push('i', { class: 'iconfont icon-angle-right' });
      }
    });
    return h('div', { class: 'xtx-bread' }, dymanicItems);
  },
};
</script>

<style lang='less'>
// 去除 scoped 属性 目的: 让样式作用到xtx-bread-item组件
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
  &:late-child {
    display: none;
  }
}
</style>
