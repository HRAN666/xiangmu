import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mint from 'mint-ui'
import elmentUi from 'element-ui'
import 'mint-ui/lib/style.css'
import './assets/icon/iconfont'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(mint)
Vue.use(elmentUi)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    let userOpenId=localStorage.getItem('userOpenId');
    let code = localStorage.getItem('code');
    if (!userOpenId && to.path!='/author') {
      localStorage.setItem('LoginUrl',window.location.href)
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
