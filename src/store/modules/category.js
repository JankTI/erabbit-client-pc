// 分类模块

import { topCategory } from '@/api/constants'
import { findCategory } from '@/api/category'

export default {
  namespaced: true,
  state() {
    return {
      list: topCategory.map(item => ({
        name: item
      }))
    }
  },
  // 修改分类函数
  mutations: {
    // payload 所有的分类集合
    setCategory(state, payload) {
      state.list = payload
    },
    // 定义show和hide函数 控制当前分类的二级分类显示和隐藏
    show(state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = true
    },
    hide(state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = false
    }
  },
  // 获取分类函数
  actions: {
    async getList({ commit }) {
      // 获取分类数据
      const data = await findCategory()
      // 给每个分类加上控制二级分类显示隐藏的数据
      data.result.forEach(top => {
        top.open = false
      })
      // 修改分类数据
      commit('setCategory', data.result)
    }
  }
}
