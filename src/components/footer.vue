<template>
    <div class="footer" v-show="showFooter">
       <div class="footer-img">
           <router-link to="/"  active-class="footer-active" exact>
           <i class="el-icon_foot_home"></i>
           <span>首页</span>
           </router-link>
       </div>
       <div class="footer-img">
           <router-link to='/integral' active-class="footer-active">
           <i class="el-icon_foot_bell"></i>
           <span>积分商城</span>
           </router-link>
       </div>
       <div class="footer-img">
           <router-link to="/shopcar" active-class="footer-active">
           <i class="el-icon_foot_shop"></i>
           <span>购物车</span>
           </router-link>
       </div>
       <div class="footer-img">
           <router-link to='/myself' active-class="footer-active">
           <i class="el-icon_foot_my"></i>
           <span>我的</span>
           </router-link>
        </div>        
    </div> 
</template>
<script>
export default {
        data () {
        return {
            showFooter:true,
            screenHeight: document.documentElement.clientHeight,  //默认屏幕高度
            originHeight: document.documentElement.clientHeight,   //实时屏幕高度
        }
    },
    methods: {

    },
    mounted () {
        // window.onresize监听页面高度的变化
        let self = this;
        window.onresize = function() {
            return (function(){
                self.screenHeight = document.documentElement.clientHeight;
            })()
        }
    },
    watch: {
        screenHeight(val) {
        if(this.originHeight > val + 100){
            this.showFooter=false
            this.$emit('disPlay')
        }else{
            this.showFooter=true
            this.$emit('disPlay')
        }
    }
    },
}
</script>
<style scoped>
.footer{
    position: fixed;
    bottom: 0;
    background: #fff;
    height: .5rem;
    z-index: 999;
    width: 100%;
}
.footer .footer-img{
    width: 25%;
    height: 100%;
    float: left;
    position: relative;
    font-size: .14rem;
}
.footer-img span{
    margin-top: .27rem;
    display: block;
    font-size: .12rem;
    font-weight: bold;
    margin-right: -.06rem;
}
.footer-active{
  color: #0288d1;
}
</style>

