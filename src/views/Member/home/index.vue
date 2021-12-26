<template>
  <div class="member-home">
    <!-- 概览 -->
    <HomeOverview />
    <!-- 收藏 -->
    <HomePanel title="我的收藏">
      <GoodsItem v-for="item in collectGoods" :key="item.id" :goods="item" />
    </HomePanel>
    <!-- 足迹 -->
    <HomePanel title="我的足迹">
      <GoodsItem v-for="item in TraceGoods" :key="item.id" :goods="item" />
    </HomePanel>
    <!-- 猜你 -->
    <GoodsRelevant />
  </div>
</template>

<script>
import HomeOverview from "./components/home-overview";
import HomePanel from "./components/home-panel";
import GoodsRelevant from "@/views/Goods/components/goods-relevant";
import GoodsItem from "@/views/Category/components/goods-item";
import { findCollect, findTrace } from "@/api/member";
import { ref } from "vue";

export default {
  name: "MemberHome",
  components: {
    HomeOverview,
    HomePanel,
    GoodsRelevant,
    GoodsItem,
  },
  setup() {
    const goods = {
      id: "1",
      name: "自煮火锅不排队 麦饭石不粘鸳鸯火锅",
      picture:
        "https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg",
      desc: "清汤鲜香 红汤劲爽",
      price: "159.00",
    };

    // 调用模拟的接口
    const collectGoods = ref([]);
    findCollect({
      page: 1,
      pageSize: 4,
    }).then((data) => {
      collectGoods.value = data.result.items;
    });

    // 足迹
    const TraceGoods = ref([]);
    findTrace({
      page: 1,
      pageSize: 4,
    }).then((data) => {
      TraceGoods.value = data.result.items;
    });

    return {
      goods,
      collectGoods,
      TraceGoods,
    };
  },
};
</script>

<style lang="less" scoped>
:deep(.xtx-carousel) .carousel-btn.prev {
  left: 5px;
}
:deep(.xtx-carousel) .carousel-btn.next {
  right: 5px;
}
</style>
