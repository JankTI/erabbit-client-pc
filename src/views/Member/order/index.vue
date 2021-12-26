<template>
  <div class="member-order">
    <!-- tab组件 -->
    <XtxTabs v-model="activeName">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
      </XtxTabsPanel>
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <OrderItem
        v-for="item in orderList"
        :key="item.id"
        :order="item"
      ></OrderItem>
    </div>
    <!-- 分页组件 -->
    <XtxPagination></XtxPagination>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { orderStatus } from "@/api/constants";
import OrderItem from "./components/order-item";
import { findOrderList } from "@/api/order";
export default {
  name: "MemberOrder",
  components: {
    OrderItem,
  },
  setup() {
    const activeName = ref("all");

    // 获取数据
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      orderState: 0,
    });
    const orderList = ref([]);
    findOrderList(reqParams).then((data) => {
      orderList.value = data.result.items;
    });
    return {
      activeName,
      orderStatus,
      orderList,
    };
  },
};
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background: #fff;
}
.order-list {
  background: #fff;
  padding: 20px;
}
</style>
