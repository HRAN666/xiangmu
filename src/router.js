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
      name: 'home',
      component: () => import( './views/Home.vue'),
      meta:{title:'首页'},
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/',
      component: () => import( './views/Home.vue'),
      meta:{title:'首页'}
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
  ]
})
