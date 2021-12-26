import Mock from 'mockjs'
import qs from 'qs'

// 基本配置
Mock.setup({
  // 随机延时 500 - 1000 毫秒 模拟网络延迟
  timeout: '500-1000'
})

// 拦截接口 /my/test
// 1. 接口地址路径规则 需要匹配到它
// 2. 请求方式
// 3. 返回数据(函数返回数据)
Mock.mock(/\/my\/test/, 'get', () => {
  // 随机数据逻辑 目标: 5条数据 [{id: '',name: ''},...]
  const arr = []
  for (let i = 0; i < 5; i++) {
    // arr.push(Mock.mock('@id'))
    arr.push(Mock.mock({
      id: '@id',
      name: '@cname'
    }))
  }
  return {
    msg: '获取数据成功',
    result: arr
  }
})

// 模拟 我的收藏
Mock.mock(/\/member\/collect/, 'get', (config) => {
  const counts = 35
  const queryString = config.url.split('?')[1]
  const queryObject = qs.parse(queryString)
  const items = []
  for (let i = 0; i < +queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@id',
      name: '@ctitle(10,20)',
      desc: '@ctitle(4,10)',
      price: '@float(100,200,2,2)',
      // http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_7.jpg
      picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
    }))
  }

  return {
    msg: '获取收藏商品成功',
    result: {
      counts,
      pageSize: +queryObject.pageSize,
      page: +queryObject.page,
      items
    }
  }
})

Mock.mock(/\/member\/browseHistory/, 'get', (config) => {
  const counts = 35
  const queryString = config.url.split('?')[1]
  const queryObject = qs.parse(queryString)
  const items = []
  for (let i = 0; i < +queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@id',
      name: '@ctitle(3,10)',
      desc: '@ctitle(4,10)',
      price: '@float(100,200,2,2)',
      // https://yanxuan-item.nosdn.127.net/5b3c61cf75a2480774616f5662a5bccf.jpg
      picture: 'https://yanxuan-item.nosdn.127.net/3346b7b92f9563c7a7e24c7ead883f18.jpg'
    }))
  }

  return {
    msg: '获取足迹商品成功',
    result: {
      counts,
      pageSize: +queryObject.pageSize,
      page: +queryObject.page,
      items
    }
  }
})
