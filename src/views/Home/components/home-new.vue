<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <XtxMore path="/" />
      </template>
      <div ref="target" style="position: relative; height: 426px">
        <!-- 面板内容 -->
        <Transition name="fade">
          <ul v-if="goods.length" ref="pannel" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <router-link to="">
                <img :src="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </router-link>
            </li>
          </ul>
          <HomeSkeleton bg="#f0f9f4" v-else />
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import { ref } from 'vue';
import HomePanel from './home-panel';
import { findNew } from '@/api/home';
import HomeSkeleton from './home-skeleton';
import { useLazyData } from '@/hooks';
export default {
  name: 'HomeNew',
  components: {
    HomePanel,
    HomeSkeleton,
  },
  setup() {
    const goods = ref([]);

    // findNew().then((data) => {
    //   goods.value = data.result;
    // });

    // 1. target 去绑定一个监听事件 最好是DOM
    // 2. 传入API函数 内部获取调用 返回就是响应式数据
    const { target, result } = useLazyData(findNew);

    return {
      goods: result,
      target,
    };
  },
};
</script>

<style lang="less" scoped>
// 离开时动画
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
