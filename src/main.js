import Vue from 'vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import mint from 'mint-ui'
import elmentUi from 'element-ui'
import VueAMap from 'vue-amap';
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css';
import * as filter from './filter/filter'
import './assets/icon/iconfont'
import App from './App.vue'
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]));
Vue.use(mint)
Vue.use(elmentUi)
Vue.use(VueAMap);
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (to.meta.keepAlive) {
      store.commit('global/keepAlive',to.name)
    }
    let userOpenId=localStorage.getItem('userOpenId');
    let code = localStorage.getItem('code');
    if (!userOpenId && to.path!='/author') {
      localStorage.setItem('beforeUrl',window.location.href)
        if (!code) {
            next({
              path:'/author'
            }) 
        }else{
          next({
            path: '/author?' + window.location.href.split('?')[1] //Authorization?code
          }) 
        }
    }else{
      next()
    }
})
VueAMap.initAMapApiLoader({
  key: 'ef876c0f999423969e5ba7a2dc3cbabc',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
axios.interceptors.request.use(//拦截器
  config=>{
      if (localStorage.getItem('accessToken')&&config.url!='/api/biz/v01/listBizStoreWithoutToken.do') {
          config.headers.userToken=localStorage.getItem('accessToken')//请求头加上token
          config.data.storeId=localStorage.getItem('storeId')==null?0:localStorage.getItem('storeId')//由于多店模式在每个请求params加上storeId  
      }
      return config
  },
  err=>{
      return Promise.reject(err);
  }
)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
