// 提供商品相关函数

import request from '@/utils/request'


/**
 * 获取商品详情
 * @param {String} id - 商品 ID
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}
