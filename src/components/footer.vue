<template>
    <div class="footer">
       <div class="footer-img">
           <i class="el-iconhome"></i>
           <span>首页</span>
       </div>
       <div class="footer-img">
           <i class="el-iconbell"></i>
           <span>积分商城</span>
       </div>
       <div class="footer-img">
           <i class="el-iconshop"></i>
           <span>购物车</span>
       </div>
       <div class="footer-img">
           <i class="el-iconmy"></i>
           <span>我的</span>
        </div>        
    </div>
</template>
<script>
export default {
    
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
    color: #AAAAAA;
}
</style>

