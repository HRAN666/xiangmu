<template>
  <div id="app">
    <!-- <keep-alive>
    </keep-alive> -->
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<style>
html body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.footer a{
  text-decoration: none;
  color:#666;
}

</style>
<script>
import {mapState} from 'vuex'
import './assets/icon/iconfont.css'
export default {
   provide () {
    return {
      reload: this.reload
    }
   },
    data() {
      return {
          isRouterAlive: true//是否显示
      }
    },
    methods: {
    reload () {//无白屏刷新
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  computed:{
    ...mapState({
      keepAliveComponents:state=>state.global.keepAliveComponents
    })
  },
  mounted () {
    
  },
}
</script>

