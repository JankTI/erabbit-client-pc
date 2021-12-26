// 个人中心api接口
import request from '@/utils/request'

/**
 * 获取收藏分页数据
 * @param {Integer} collectType - 收藏类型 1为商品 2为专题 3为品牌
 * @returns
 */
export const findCollect = ({ page = 1, pageSize = 1, collectType = 1 }) => {
  return request('/member/collect', 'get', { page, pageSize, collectType })
}


/**
 * 获取我的足迹
 * @returns
 */
export const findTrace = ({ page = 1, pageSize = 1 }) => {
  return request('/member/browseHistory', 'get', { page, pageSize })
}
