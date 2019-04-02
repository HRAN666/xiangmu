import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/order',
      name: 'order',
      component: () => import('./views/order.vue'),
      meta: {title: '我的订单'}
    },
    {
      path: '/',
      name: 'Home',
      component: () => import( './views/Home.vue'),
      meta:{title:'首页'},
    },
    {
      path: '/Home',
      name: 'Home',
      redirect: '/',
      component: () => import( './views/Home.vue'),
      meta:{title:'首页'}
    },
    {
      path: '/index.html',
      name: 'index',
      redirect: '/',
      meta: {title:'首页'}
    },
    {
      path: '/author',
      name: 'author',
      component: () => import( './views/author.vue'),
      meta:{title:'授权'}
    },
    {
      path: '/myself',
      name: 'myself',
      component: () => import( './views/myself.vue'),
      meta:{title:'我的'},
    },
    {
      path: '/integral',
      name: 'integral',
      component: () => import( './views/integral.vue'),
      meta:{title:'积分商城'},
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: () => import( './views/shopcar.vue'),
      meta:{title:'购物车'},
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import( './views/reg.vue'),
      meta:{title:'注册会员'},
    },
    {
      path: '/myvipInf',
      name: 'myvipInf',
      component: () => import( './views/myvipInf.vue'),
      meta:{title:'我的信息'},
    },
    {
      path: '/orderdetails',
      name: 'orderdetails',
      component: () => import('./views/orderdetails.vue'),
      meta: {title: '订单详情'}
    },
    {
      path: '/location',
      name: 'location',
      component: () => import( './views/location.vue'),
      meta:{title:'位置'},
    },
    {
      path: '/commoditiesList',
      name: 'commoditiesList',
      component: () => import( './views/commoditiesList.vue'),
      meta:{title:'商品列表'},
    },
    {
      path: '/commodityDetails',
      name: 'commodityDetails',
      component: () => import( './views/commodityDetails.vue'),
      meta:{title:'商品详情'},
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: () => import( './views/addAddress.vue'),
      meta:{title:'添加地址'},
    },
    {
      path: '/express',
      name: 'express',
      component: () => import( './views/express.vue'),
      meta:{title:'代取快递'},
    },
    {
      path: '/expressmedicines',
      name: 'expressmedicines',
      component: () => import( './views/expressmedicines.vue'),
      meta:{title:'代取药品'},
    },
    {
      path: '/expressfood',
      name: 'expressfood',
      component: () => import( './views/expressfood.vue'),
      meta:{title:'代取外卖'},
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: () => import( './views/addAddress.vue'),
      meta:{title:'新增地址'},
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: () => import( './views/coupon.vue'),
      meta:{title:'我的卡券'},
    },
    {
      path: '/businessOrder',
      name: 'businessOrder',
      component: () => import( './views/businessOrder.vue'),
      meta:{title:'商家订单'},
    },
  ]
})
