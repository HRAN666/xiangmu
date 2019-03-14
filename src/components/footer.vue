<template>
    <div class="footer">
       <div class="footer-img">
           <router-link to="/"  active-class="footer-active" exact>
           <i class="el-iconhome"></i>
           <span>首页</span>
           </router-link>
       </div>
       <div class="footer-img">
           <router-link to='/integral' active-class="footer-active">
           <i class="el-iconbell"></i>
           <span>积分商城</span>
           </router-link>
       </div>
       <div class="footer-img">
           <router-link to="/shopcar" active-class="footer-active">
           <i class="el-iconshop"></i>
           <span>购物车</span>
           </router-link>
       </div>
       <div class="footer-img">
           <router-link to='/myself' active-class="footer-active">
           <i class="el-iconmy"></i>
           <span>我的</span>
           </router-link>
        </div>        
    </div> 
</template>
<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
     
    },
    mounted () {
        
    }
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

