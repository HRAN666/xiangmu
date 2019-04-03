import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import mint from 'mint-ui'
import elmentUi from 'element-ui'
import VueAMap from 'vue-amap';
import 'mint-ui/lib/style.css'
import './assets/icon/iconfont'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(mint)
Vue.use(elmentUi)
Vue.use(VueAMap);
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
