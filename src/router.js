import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import( './views/home.vue'),
      meta:{title:'首页'}
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/',
      component: () => import( './views/home.vue'),
      meta:{title:'首页'}
    },
    {
      path: '/author',
      name: 'author',
      component: () => import( './views/author.vue'),
      meta:{title:'授权'}
    },
  ]
})
