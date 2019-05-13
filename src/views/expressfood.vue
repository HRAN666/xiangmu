<template>
    <div>
        <header-general routerTo="/Home" headTitle="代取外卖" headClass="style5"></header-general>
        <div class="gooods-message">
            <div class="goods-img">
                <img src="../assets/details_wati_expressfood.png" alt="">
            </div>
            <div class="goods-title">代取外卖</div>
            <div class="goods-price">￥1.00<span>月销量1222笔</span></div>
        </div>
        <div class="service">
            <div class="service-message">服务<span>不支持7天无理由退货</span></div>
        </div>
        <div class="specifications">
            <div class="specifications-message">规格<span>填写 姓名，电话...</span><div class="choice"></div></div>
        </div>
        <div class="comment">
            <div class="comment-message">买家评论（50）<span>查看全部<span>></span></span></div>
            <div class="comment-user">
                <div class="comment-user-img"><img src="../assets/user.png" alt=""></div>
                <div class="comment-user-name">j**3</div>
                <div class="comment-user-message">速度很快，方便了不少！</div>
            </div>
        </div>
        <div class="recommend">
            <div class="recommend-line"></div>
            <div class="recommend-img"><img src="../assets/like.png">推荐</div>
            <div class="recommend-line"></div>
        </div>
        <div class="recommend-goods">
            <div class="recommend-message">推荐商品</div>
            <div class="recommend-goods-img">
                <img src="../assets/details_wati_express.png" alt="" @click="toexpress">
                代取快递
                <div class="recommend-goods-price">￥1.00<span>11人付款</span></div>
            </div>
            <div class="recommend-goods-img">
                <img src="../assets/details_wati_expressmedicines.png" alt="" @click="toexpressmedicines">
                代取药品
                <div class="recommend-goods-price">￥1.00<span>15人付款</span></div>
            </div>
        </div>
        <div class="to-the-end">
            <div class="to-the-end-line"></div>
            <div class="to-the-end-text">已经到底了</div>
            <div class="to-the-end-line"></div>
        </div>
        <div class="footer">
            <div class="footer-address">
                <div class="footer-img">
                    <router-link to="/"  active-class="footer-active" exact>
                    <div class="customer-service"></div>
                    <span>客服</span>
                    </router-link>
                </div>
                <div class="footer-img">
                    <router-link to='/' active-class="footer-active" exact>
                    <div class="collection"></div>
                    <span>收藏</span>
                    </router-link>
                </div>
                <div class="footer-img">
                    <router-link to="/shopcar" active-class="footer-active">
                    <div class="shopcar"></div>
                    <span>购物车</span>
                    </router-link>
                </div>
            </div>
            <div class="footer-operation">
                <div class="add-cart">加入购物车</div>
                <div class="purchase" @click="purchase()">立即购买</div>
            </div>
        </div>
        <div class="cover" v-show="markshow" @click="displayCover"></div>
        <currency-Popup popup="style3" ref="popup" title="代取药品"></currency-Popup>
    </div>
</template>
<script>
import header from '../components/header.vue'
import currencyPopup from '../components/currencyPopup.vue'//弹出层
export default {
    components: {
        'header-general':header,
        'currency-Popup':currencyPopup
    },
    data () {
        return {
            markshow:false
		}
    },
    mounted(){
       
    },
    methods:{
        purchase(){
            this.markshow=true;
            this.$refs.popup.isPoup=true            
        },
        displayCover(){
            this.markshow=false;
            this.$refs.popup.isPoup=false     
        },
        toexpress(){
            this.$router.push('/express')
        },
        toexpressmedicines(){
            this.$router.push('/expressmedicines')
        },
    }
}
</script>
<style scoped>
.gooods-message{
    background-color: #ffffff;
    font-size: .19rem;
    text-align: left;
    margin: 0 auto;
    height: 3.3rem;
}
.gooods-message .goods-img{
    text-align: center;
    height: 2.3rem;
    border-top: .01rem solid #efefef;
    border-bottom: .01rem solid #efefef;
    padding-bottom: .2rem;
}
.gooods-message .goods-img img{
    height: 100%;
}
.gooods-message .goods-title{
    width: 93%;
    margin: 0.1rem auto;
    padding-left: .1rem;
    height: .1rem;
    color: #242424;
}
.gooods-message .goods-price{
    width: 93%;
    margin: .25rem auto;
    font-size: .19rem;
    padding-left: .05rem;
    color: #0288d1;
}
.gooods-message .goods-price span{
    font-size: .14rem;
    display: inline;
    float: right;
    padding-right: .1rem;
    padding-top:.04rem; 
    color: #888888;
}
.service{
    background-color: #ffffff;
    margin-top: .15rem;
    height: .45rem;
    position: relative;
}
.service-message{
    position: absolute;
    font-size: .16rem;
    height: .25rem;
    width: 90%;
    border-left:.05rem solid #207cd3;
    text-align: left;
    padding-left: .05rem;
    color: #9a9a9a;
    margin: 0 auto;
    top:.1rem; 
    left: .1rem;
}
.service-message span{
    color: #4f4f4f;
    display: inline;
    margin-left: .3rem;
    font-size: .15rem;
}
.specifications{
    background-color: #ffffff;
    margin-top: .01rem;
    height: .45rem;
    position: relative;
}
.specifications-message{
    position: absolute;
    font-size: .16rem;
    height: .25rem;
    width: 90%;
    border-left:.05rem solid #207cd3;
    text-align: left;
    padding-left: .05rem;
    color: #9a9a9a;
    margin: 0 auto;
    top:.1rem; 
    left: .1rem;
}
.specifications-message span{
    color: #4f4f4f;
    display: inline;
    margin-left: .3rem;
    font-size: .15rem;
}
.specifications-message .choice{
    height: .25rem;
    width: .25rem;
    float: right;
    background:url(../assets/choice.png) no-repeat;
    background-size: 100% 100%;
}
.comment{
    background-color: #ffffff;
    margin-top: .15rem;
    height: 1.2rem;
    position: relative;
}
.comment .comment-message{
    position: absolute;
    font-size: .155rem;
    line-height: .27rem;
    height: .25rem;
    border-left: .05rem solid #207cd3;
    text-align: left;
    padding-left: .05rem;
    color: #616161;
    margin: 0 auto;
    top: .1rem;
    left: .1rem;
    width: 90%;
}
.comment .comment-message span{
    margin-top: 0.01rem;
    color: #0288d1;
    display: inline;
    float: right;
    font-size: .15rem;
}
.comment .comment-message span span{
    font-size: .2rem;
    padding-left: .05rem;
    padding-right: .05rem;
    margin-top: -0.01rem;
    font-family: '黑体';
}
.comment .comment-user{
    position: absolute;
    left: .2rem;
    top:.44rem;
    width: 89%;
    height: .3rem;
    border-top:.01rem solid #dddddd;
}
.comment .comment-user .comment-user-img{
    margin-left: .1rem;
    height: .2rem;
    width: .2rem;
    margin-top: .1rem;
    float: left;
}
.comment .comment-user .comment-user-img img{
    float: left;
    width: 100%;
}
.comment .comment-user .comment-user-name{
    margin-top: .1rem;
    line-height: .2rem;
    font-size: .175rem;
    color: #9a9a9a;
    text-align: left;
    margin-left: .4rem;
}
.comment .comment-user .comment-user-message{
   font-size: .15rem;
   color: #757272;
   text-align: left;
   text-indent: .1rem;
   margin-top:0.1rem; 
}
.recommend{
    color: #a8a8a8;
    font-size: .16rem;
    height: .3rem;
}
.recommend .recommend-line{
    border-top: #d8d8d8 solid .01rem;
    width: 1rem;
    position: relative;
    top:.23rem;
    height: .1rem;
}
.recommend .recommend-line:nth-child(1){
    float: left;
    margin-left: .3rem;
}
.recommend .recommend-line:nth-child(3){
    float: right;
    margin-right: .3rem;
}
.recommend .recommend-img{
    margin: 0 auto;
    width: 100%;
    position:absolute;
}
.recommend .recommend-img img{
    width: .3rem;
    position: relative;
    top: .08rem;
    align-items: center;
}
.recommend-goods{
    background-color: #ffffff;
    margin-top: .15rem;
    color: #242424;
    font-size: .16rem;
    height: 2.2rem;
    position: relative;
    text-align: left;
}
.recommend-goods .recommend-message{
    line-height: .35rem;
    height: .3rem;
    border-left:.1rem solid #207cd3;
    padding-left: .1rem;
}
.recommend-goods .recommend-goods-img{
    float: left;
    width: 47%;
    margin-top: .08rem;
}
.recommend-goods .recommend-goods-img:nth-child(2){
    margin-left: .068rem;
}
.recommend-goods .recommend-goods-img:nth-child(3){
    float: right;
    margin-right: .1rem;
}
.recommend-goods .recommend-goods-img img{
    width: 100%;
    border: .01rem solid #ccc;
}
.recommend-goods .recommend-goods-price{
    margin-top: .1rem;
    font-size: .15rem;
    line-height: .23rem;
    color: #0288d1;
}
.recommend-goods .recommend-goods-price span{
    font-size: .13rem;
    line-height: .23rem;
    display: inline;
    float: right;
    color: #888888;
}
/* .recommend-goods .recommend-goods-price span .recommend-goods-car{
    color: #ea1a33;
    float: right;
    border: .01rem solid #ea1a33;
    padding: 0 0.02rem 0 0.02rem;
    border-radius: 0.06rem;
} */
.to-the-end{
    position: relative;
    color: #a8a8a8;
    font-size: .16rem;
    height: 1rem;
}
.to-the-end .to-the-end-line{
    border-top: #d8d8d8 solid .01rem;
    width: 1rem;
    position: relative;
    top:.23rem;
    height: .1rem;
}
.to-the-end .to-the-end-line:nth-child(1){
    float: left;
    margin-left: .3rem;
}
.to-the-end .to-the-end-line:nth-child(3){
    float: right;
    margin-right: .3rem;
}
.to-the-end .to-the-end-text{
    margin: 0 auto;
    line-height: .45rem;
    width: 100%;
    position:absolute;
    top: .02rem;
}
.footer{
    position: fixed;
    bottom: 0;
    background: #fff;
    height: .5rem;
    z-index: 2;
    width: 100%;
}
.footer-address{
    position: relative;
    width: 45%;
    height: 100%;
    float: left;
}
.footer .footer-address .footer-img{
    width: 33%;
    height: 100%;
    float: left;
    position: relative;
    font-size: .14rem;
}
.footer-img div{
    width: 100%;
    margin-top: 0.05rem;
    height: .27rem;
}
.footer-img span{
    display: block;
    font-size: .12rem;
    font-weight: bold;
}
.footer-img .customer-service{
    background: url(../assets/customer_service.png) no-repeat 52% 50%;
    background-size: auto 100%;
}
.footer-img .collection{
    background: url(../assets/collection.png) no-repeat 54% 50%;
    background-size: auto 100%;
}
.footer-img .shopcar{
    background: url(../assets/goods_shopcar.png) no-repeat 45% 50%;
    background-size: auto 100%;
}
.footer-operation{
    width: 55%;
    height: 100%;
    color: #fff;
    line-height: 0.5rem;
    font-size: 0.16rem;
    float: left;
}
.footer-operation .add-cart{
    width: 50%;
    height: 100%;
    background-color: #3caaf7;
    float: left;
}
.footer-operation .purchase{
    width: 50%;
    height: 100%;
    background-color: #0288d1;
    float: left;
}
.footer-active{
  color: #0288d1;
}
.cover{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: #000000;
    opacity:0.4;
    filter:alpha(opacity=40);
}
</style>

