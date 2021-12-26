import { createRouter, createWebHashHistory, RouterView } from 'vue-router'
import store from '@/store'
import { h } from 'vue'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home')
const TopCategory = () => import('@/views/Category')
const SubCategory = () => import('@/views/Category/sub')
const Goods = () => import('@/views/Goods')
const Cart = () => import('@/views/Cart')

const Login = () => import('@/views/Login')
const LoginCallback = () => import('@/views/Login/callback')

const Checkout = () => import('@/views/Member/pay/checkout')
const Pay = () => import('@/views/Member/pay')
const PayResult = () => import('@/views/Member/pay/result')

const MemberLayout = () => import('@/views/Member/Layout')
const MemberHome = () => import('@/views/Member/home')
const MemberOrder = () => import('@/views/Member/order')
const MemberOrderDetail = () => import('@/views/Member/order/detail')

// 路由规则
const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/category/:id',
        component: TopCategory
      },
      {
        path: '/category/sub/:id',
        component: SubCategory
      },
      {
        path: '/product/:id',
        component: Goods
      },
      {
        path: '/cart',
        component: Cart
      },
      {
        path: '/member/checkout',
        component: Checkout
      },
      {
        path: '/member/pay',
        component: Pay
      },
      {
        path: '/pay/callback',
        component: PayResult
      },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          {
            path: '/member',
            component: MemberHome
          },
          // {
          //   path: '/member/order',
          //   component: MemberOrder
          // },
          // {
          //   path: '/member/order/:id',
          //   component: MemberOrderDetail
          // }
          {
            path: '/member/order',
            // 创建一个RouterView 容器形成嵌套关系
            component: { render: () => h(<RouterView />) },
            children: [
              {
                path: '',
                component: MemberOrder
              },
              {
                path: ':id',
                component: MemberOrderDetail
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/login/callback',
    component: LoginCallback
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior () {
    return {
      left: 0,
      top: 0
    }
  }
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 需要登录的路由：地址是以 /member 开头
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
