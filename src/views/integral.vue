<template>
    <div>
    <header-general  headTitle="积分商城" headClass="style4" routerTo='/'></header-general>
        <div class="integral_content">
            <div class="product">
            <div class="productBlock">
                <img src="../assets/shopList.jpg" class="">
                <p>众合盐焗鸡蛋一盒</p>
                <div class="productBlock_bottom"> 
                    <div class="productBlock_price">100积分</div>
                    <div class="productBlock_specification">11人已兑</div>
                    <span>兑换</span>
                </div>
            </div>
            <div class="productBlock">
                <img src="../assets/shopList.jpg" class="">
                <p>众合盐焗鸡蛋一盒</p>
                <div class="productBlock_bottom"> 
                    <div class="productBlock_price">100积分</div>
                    <div class="productBlock_specification">11人已兑</div>
                    <span>兑换</span>
                </div>
            </div>
            </div>
            <div class="product">
            <div class="productBlock">
                <img src="../assets/shopList.jpg" class="">
                <p>众合盐焗鸡蛋一盒</p>
                <div class="productBlock_bottom"> 
                    <div class="productBlock_price">100积分</div>
                    <div class="productBlock_specification">11人已兑</div>
                    <span>兑换</span>
                </div>
            </div>
            <div class="productBlock">
                <img src="../assets/shopList.jpg" class="">
                <p>众合盐焗鸡蛋一盒</p>
                <div class="productBlock_bottom"> 
                    <div class="productBlock_price">100积分</div>
                    <div class="productBlock_specification">11人已兑</div>
                    <span>兑换</span>
                </div>
            </div>
            </div>
            <div class="product">
            <div class="productBlock">
                <img src="../assets/shopList.jpg" class="">
                <p>众合盐焗鸡蛋一盒</p>
                <div class="productBlock_bottom"> 
                    <div class="productBlock_price">100积分</div>
                    <div class="productBlock_specification">11人已兑</div>
                    <span>兑换</span>
                </div>
            </div>
            <div class="productBlock">
                <img src="../assets/shopList.jpg" class="">
                <p>众合盐焗鸡蛋一盒</p>
                <div class="productBlock_bottom"> 
                    <div class="productBlock_price">100积分</div>
                    <div class="productBlock_specification">11人已兑</div>
                    <span>兑换</span>
                </div>
            </div>
            </div>
         </div>
         <div class="integral-bottom">我是有底线的</div>  
        <footer-currency></footer-currency>
    </div>
</template>
<script>
import header from '../components/header.vue'
import footer from '../components/footer.vue'
export default {
    components:{
        'header-general':header,
        'footer-currency':footer
    }
}
</script>
<style scoped>
.product{
    margin-top: .12rem;
}
.productBlock{
    width: 1.71rem;
    height: 1.83rem;
    float: left;
    margin-left: .13rem;
    background: #fff;
    border-radius:.15rem;
    margin-bottom: .2rem;
    
}
.productBlock span{
    font-size: .12rem;
    background: #0288d1;
    border-radius: .05rem;
    display: inline-block;
    width: .3rem;
    margin-left: .12rem;
    color: #fff;
    float: left;
}
.productBlock>img{
    width: 1.44rem;
    height: 1.38rem;
}
.productBlock p{
    font-size: .14rem;
    margin-top: -.24rem;
    margin-left:.13rem;
    text-align: left;
}
.productBlock div{
    font-size: .12rem;
    float: left;
    margin-left: .06rem;
    color: #0288d1;
}
.productBlock .productBlock_specification{
    color: #888888;
}
.productBlock_bottom{
    margin-top: -.08rem;
}
.integral-bottom{
    font-size: .12rem;
    width: 100%;
    position: relative;
    margin-bottom: .65rem;
    color:#a2a0a0;
}
.integral-bottom::before{
  content:'';
  position: absolute;
  border: .1px #e0dddd solid;
  width: 27%;
  left: .43rem;
  bottom: .06rem;
}
.integral-bottom::after{
  content:'';
  position: absolute;
  border: .1px #e0dddd solid;
  width: 27%;
  right: .43rem;
  bottom: .06rem;
}
</style>

