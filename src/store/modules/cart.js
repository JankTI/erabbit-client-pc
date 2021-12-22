import { getNewCartGoods } from "@/api/cart"

// 购物车模块
export default {
  namespaced: true,
  state() {
    return {
      // 购物车商品列表
      list: []
    }
  },
  getters: {
    // 有效商品列表
    validList(state) {
      // 有效商品: 库存大于 0 stock  商品有效标识为 true  isEffective
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品总件数
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount(state, getters) {
      return getters.validList.reduce((p, c) => p + parseInt(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 无效商品列表
    invalidList(state) {
      return state.list.filter(goods => goods.stock <= 0 || !goods.isEffective)
    },
    // 已选商品列表
    selectedList(state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 已选商品件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选商品总金额
    selectedAmount(state, getters) {
      return getters.selectedList.reduce((p, c) => p + parseInt(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 是否全选
    isCheckAll(state, getters) {
      return getters.validList.length !== 0 && getters.selectedList.length === getters.validList.length
    }
  },
  mutations: {
    // 加入购物车
    insertCart(state, payload) {
      // 加入购物车字段必须要和后端保持一致 payload的字段
      // 分别是: id skuId name attrsText picture price nowPrice selected stock isEffective
      // 插入数据规则:
      // 1. 先找下是否有相同商品
      // 2. 如果有相同的商品 查询数量 累加到payload上 保存在最新位置 原来商品需要删除
      // 3. 如果没有相同商品 保存在最新位置
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count
        payload.count += count
        // 删除原来
        state.list.splice(sameIndex, 1)
      }
      // 追加新的
      state.list.unshift(payload)
    },
    updateCart(state, goods) {
      // goods中字段有可能不完整，goods有的信息才去修改。
      // 1. goods中必需又skuId，才能找到对应的商品信息
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 删除购(物车商品
    deleteCart(state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    },
    // 设置购物车
    setCart(state, payload) {
      // payload 为空数组 清空。有值的数据为设置
      state.list = payload
    }
  },
  actions: {
    // 合并购物车
    async mergeCart(ctx) {
      // 合并的参数
      const cartList = ctx.state.list.map(goods => {
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        }
      })
      await mergeCart(cartList)
      // 合并成功
      // 清空本地购物车
      ctx.commit('setCart', [])
    },
    // 修改规格
    updateCartSku(ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          // 1. 找出旧的商品信息  2. 删除旧的商品数据 3. 根据新的sku信息和旧的商品信息 合并成一条新的购物车商品信息 4. 添加新的商品
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          ctx.commit('deleteCart', oldSkuId)
          const { skuId, price: nowPrice, specsText: attrsText, inventory: stock } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, attrsText, stock }
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    // 批量删除选中商品也支持清空无效商品
    batchDeleteCart(ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 本地
          // 1. 获取选中商品列表，进行遍历调用deleteCart mutataions函数
          // isClear 为 true 删除失效商品列表 否则是选中的商品列表
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },
    // 全选和取消全选
    checkAllCart(ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          ctx.getters.validList.forEach(goods => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 修改购物车（选中状态,数量）
    updateCart(ctx, payload) {
      // payload 需要: 必需有skuId 可能: selected count
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          // 单条数据 payload 现在 就是 skuId
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
    // 删除购物车
    deleteCart(ctx, payload) {
      // 单条删除 payload 现在 就是 skuId
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    },
    // 加入购物车
    insertCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 获取商品列表
    findCart(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          // 同时发送请求(有几个商品发几个请求)等所有请求成功 一并去修改本地数据
          // Promise.all(promise数组).then(dataList => {}) 同时发送请求 所有请求成功  得到所有成功结果
          const promiseArr = ctx.state.list.map(goods => {
            return getNewCartGoods(goods.skuId)
          })
          // datalist 成结果的集合 数据顺序 和promiseArr顺序一致 它是根据state.list而来
          Promise.all(promiseArr).then(dataList => {
            // 更新本地购物车
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            // 调用resolve代表操作成功
            resolve()
          })
        }
      })
    }
  }
}
