<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div v-if="goodsList">
      <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item" />
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/views/Category/components/goods-item';
import { computed, ref } from 'vue';
import { findGoodsHot } from '@/api/product';
import { useRoute } from 'vue-router';
export default {
  name: 'GoodsHot',
  props: {
    // 热销类型
    type: {
      type: Number,
      default: 1,
    },
  },
  components: {
    GoodsItem,
  },
  setup(props) {
    // 类型数据字典
    const types = { 1: '24小时热销榜', 2: '热销榜', 3: '总热销榜' };
    const title = computed(() => {
      return types[props.type];
    });
    // 发请求获取数据
    const route = useRoute();
    const goodsList = ref([]);
    findGoodsHot({ id: route.params.id, type: props.type }).then((data) => {
      goodsList.value = data.result;
    });

    return {
      title,
      goodsList,
    };
  },
};
</script>

<style lang="less" scoped>
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
