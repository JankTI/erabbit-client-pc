// 订单相关的API函数
import request from '@/utils/request'


/**
 * 结算页面-生成订单
 * @returns
 */
export const createOrder = () => {
  return request('/member/order/pre', 'get')
}


/**
 * 添加收货地址
 * @param {Object} form - 参考接口文档
 */
export const addAddress = (form) => {
  return request('/member/address', 'post', form)
}


/**
 * 修改收货地址
 * @param {Object} form - 参考接口文档
 */
export const editAddress = (form) => {
  return request(`/member/address/${form.id}`, 'put', form)
}


/**
 * 结算页面-提交订单
 * @param {Object} params - 参考接口文档
 * @returns
 */
export const submitOrder = (params) => {
  return request('/member/order', 'post', params)
}


/**
 * 获取订单详情
 * @param {String} orderId - 订单Id
 */
export const findOrderDetail = (orderId) => {
  return request('/member/order/' + orderId, 'get')
}

/**
 * 获取订单列表
 * @param {String} page - 页码
 * @param {String} pageSize - 每页条数
 * @param {String} orderState - 订单状态: 1. 待付款 2. 待发货 3. 待收货 4. 待评价 5. 已完成 6. 已取消
 */
export const findOrderList = ({ page = 1, pageSize = 10, orderState = 0 }) => {
  return request('/member/order', 'get', { page, pageSize, orderState })
}
