<template>
    <div>
        <header-general routerTo="/Home" headTitle="商家订单" headClass="style6"></header-general>
        <div class="date">
            <div class="date-left">
                <img src="../assets/before_day.png" alt="" class="date_img"><span>前一天</span>
            </div>
            <div class="date-title">2018-12-5</div>
            <div class="date-right">
                <span>后一天</span><img src="../assets/next_day.png" alt="" class="date_img">
            </div>
        </div>
        <div class="type">
            <div class="goodstype">全部货态<img src="../assets/day_more.png" alt="" class="type_img"></div>
            <div class="line"></div>
            <div class="moneytype">全部货态<img src="../assets/day_more.png" alt="" class="type_img"></div>
        </div>
        <div class="information">
            <div class="information-day"><img src="../assets/no_choice.png" alt=""><span>2018-12-5 10:43</span><span>订单号：</span><span>15411644025622351</span></div>
            <div class="information-name">
                <div class="information-name-left">
                    <div>收件人：<span>张斌13510025765</span></div>
                    <div>收货店名：<span>深圳国际大饭店</span></div>
                    <div>收货地址：<span>南山区深南大道</span></div>
                    <div>付款状态：<span>现金</span></div>
                </div>
                <div class="information-name-right">
                    <div>已送达</div>
                    <div>订单进行中</div>
                </div>
            </div>
            <div class="information-total">
                <div class="information-goodstotal">共<span>2</span>件商品<span>合计：￥</span><span>60.00</span></div>
            </div>
        </div>
        <div class="information">
            <div class="information-day"><img src="../assets/no_choice.png" alt=""><span>2018-12-5 10:43</span><span>订单号：</span><span>15411644025622351</span></div>
            <div class="information-name">
                <div class="information-name-left">
                    <div>收件人：<span>刘小冰18038054408</span></div>
                    <div>收货店名：<span>五千年农夫</span></div>
                    <div>收货地址：<span>龙岗区五联街道</span></div>
                    <div>付款状态：<span>现金</span></div>
                </div>
                <div class="information-name-right">
                    <div>已送达</div>
                    <div>订单进行中</div>
                </div>
            </div>
            <div class="information-total">
                <div class="information-goodstotal">共<span>3</span>件商品<span>合计：￥</span><span>90.00</span></div>
            </div>
        </div>
        <div class="footer">
            <div><div class="up">上一页</div> <div class="down">下一页</div></div>
        </div>
    </div>
</template>
<script>
import header from '../components/header.vue'
export default {
    components: {
        'header-general':header
    },
}
</script>
<style scoped>
.date{
    position: relative;
    height: .5rem;
    font-size: .17rem;
    background-color: #ffffff
}
.date_img{
    width: .21rem;
    height: .21rem;
    position: relative;
    top: .04rem;
}
.date-left{
    position: absolute;
    top: .08rem;
    left: .05rem;
}
.date-left span{
    position: relative;
    left: .1rem;
}
.date-title{
    line-height: .5rem;
    color: #0288d1;
    font-size: .19rem;
}
.date-right{
    position: absolute;
    top: .08rem;
    right: .05rem;
}
.date-right span{
    position: relative;
    right: .1rem;
}
.type{
    position: relative;
    background-color: #ffffff;
    font-size: .17rem;
    height: .5rem;
    margin-top: .01rem;
    width: 100%;
}
.type .goodstype{
    width: 50%;
    float: left;
    line-height: .5rem;
}
.type .type_img{
    width: .17rem;
    height: .17rem;
    position: relative;
    top: .02rem;
    padding-left: .2rem;
}
.type .moneytype{
    width: 50%;
    float: left;
    line-height: .5rem;
}
.type .line{
    position:absolute;
    height: .4rem;
    width: .01rem;
    background-color: #efefef;
    left: 50%;
    top: .05rem;
}
.information{
    text-align: left;
    margin-top: .1rem;
    background-color: #ffffff;
}
.information-day{
    color: #868686;
    line-height: .35rem;
    font-size: .13rem;
    border-bottom: .01rem solid #efefef;
}
.information-day img{
    position: relative;
    left: .1rem;
    top:.015rem;
    width: .13rem;
    height: .13rem;
}
.information-day span:nth-child(2){
    margin-left: .15rem;
}
.information-day span:nth-child(3){
    margin-left: .25rem;
}
.information-name{
    height: 1.2rem;
    border-bottom: .01rem solid #efefef;
}
.information-name-left{
    color: #000;
    font-size: .14rem;
    height: 1.2rem;
    width: 2.8rem;
    float: left;
    margin-top: .2rem;
    margin-left: .1rem;
}
.information-name-left div{
    line-height: .2rem;
}
.information-name-right{
    font-size: .14rem;
    height: 1.2rem;
    width: 0.8rem;
    float: left;
    margin-top: .2rem;
}
.information-name-right div:nth-child(1){
    color: #dc2d2d;
}
.information-name-right div:nth-child(2){
    color: #e18601;
}
.information-total{
    height: .5rem;
    font-size: .15rem;
    color: #000;
}
.information-total .information-goodstotal{
    width: 2rem;
    float:right;
}
.information-total .information-goodstotal span:nth-child(2){
    margin-left: .2rem;
}
.footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: .5rem;
    background-color: #ffffff;
}
.footer div{
    margin: 0 auto;
    width: 2rem;
}
.footer .up{
    margin-top:.1rem; 
    float: left;
    font-size: .16rem;
    padding: 0.03rem 0.05rem  0.03rem 0.05rem;
    width: .8rem;
    color: #ffffff;
    background-color: #0288d1;
    border-radius: 0.08rem;
}
.footer .down{
    margin-top:.1rem;
    float: left;
    margin-left: .15rem;
    font-size: .16rem;
    padding: 0.03rem 0.05rem  0.03rem 0.05rem;
    width: .8rem;
    color: #ffffff;
    background-color: #0288d1;
    border-radius: 0.08rem;
}
</style>