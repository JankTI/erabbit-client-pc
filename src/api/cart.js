// 封装购物车相关的API函数

import request from '@/utils/request'

/**
 * 获取商品的最新价格 库存是否有效
 * @param {String}} skuId - SKU id
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 获取商品对应的sku数据
 * @param {String}} skuId - SKU id
 */
export const getGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 合并购物车
 * @param {Array<Object>} cartList - 购物车信息列表
 * @param {String} object.skuId - skuId
 * @param {Boolean} object.selected - 选中状态
 * @param {Integer} object.count - 数量
 */
export const mergeCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}
