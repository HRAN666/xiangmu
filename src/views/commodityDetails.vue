<template>
  <div>
        <div class="commodityDetails-header">
            <div class="commodityDetails-headerLeftOne"><img src="../assets/goBack.png" alt=""></div>
            <div class="commodityDetails-headerLeftTwo">返回</div>
            <div class="commodityDetails-headerRightOne"><i class="el-icon-share"></i></div>
            <div class="commodityDetails-headerRightTwo"><img src="../assets/consultation.png" alt=""></div>
        </div>
        <div>
            <el-carousel :interval="3000" arrow="always">
                <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="commodityDetails-information">
            <div class="commodityDetails-title">卫龙亲嘴烧100片盒装辣条大礼包麻辣儿时怀旧小吃小面筋零食辣片</div>
            <div class="commodityDetails-price">￥30.00</div>
            <div class="commodityDetails-bottom">
                <div class="bottomPrice">快递：0.00</div>
                <div class="bottomSales">月销1222笔</div>
                <div class="bottomArea">广东深圳</div>
            </div>
        </div>
        <div class="service-content">
            <div class="service-item">
                <div class="item-left-border"></div>
                <div class="item-left">服务</div>
                <div class="item-content">过敏包退</div>
                <div class="item-right"><i class="el-icon-arrow-right"></i></div>
            </div>
            <div class="service-item">
                <div class="item-left-border"></div>
                <div class="item-left">规格</div>
                <div class="item-content">配送至 龙岗区</div>
                <div class="item-right"><i class="el-icon-arrow-right"></i></div>
            </div>
            <div class="service-item">
                <div class="item-left-border"></div>
                <div class="item-left">运费</div>
                <div class="item-content">满50包邮</div>
                <div class="item-right"><i class="el-icon-arrow-right"></i></div>
            </div>
        </div>
        <div class="comment">
            <div class="comment-content">
                <div class="item-left-border"></div>
                <div class="item-left">买家评论(36)</div>
                <div class="item-right"><i class="el-icon-arrow-right"></i></div>
                <div class="item-content">查看全部</div>
            </div>
            <div class="comment-user"><img src="../assets/user.png" alt="人头">k**k</div>
            <div class="comment-userComment">好吃好吃好吃！！！买了第三次了哈哈哈哈</div>
        </div>
        <div class="picture-details"><img src="../assets/userCommentBottom.png" alt=""></div>
        <div class="picture-All"><img src="../assets/详情1.png" alt=""><img src="../assets/详情2.jpg" alt=""></div>
        <div class="recommendThing"><img src="../assets/recommend.png" alt=""></div>
        <div class="recommend-details">
            <div class="comment-content">
                <div class="item-left-border"></div>
                <div class="item-left">推荐商品</div>
            </div>
        </div>
        <div class="recommend-details-main">
            <div class="recommend-details-left">
                <img src="../assets/图1.jpg" alt="">
                <div class="name">卫龙辣条亲嘴烧300g</div>
                <div class="price">￥15.50<span class="havePeople">11人付款</span></div>
            </div>
            <div class="recommend-details-right">
                <img src="../assets/图1.jpg" alt="">
                <div class="name">卫龙辣条亲嘴烧300g</div>
                <div class="price">￥15.50<span class="havePeople">11人付款</span></div>
            </div>
        </div>
        <div class="arriveBottom"><img src="../assets/bottom.png" alt="底部"></div>
        <div class="addShop">
            <div class="service"><img src="../assets/客服.png" alt=""></div>
            <div class="service-name">客服</div>
            <div class="like"><img src="../assets/收藏.png" alt=""></div>
            <div class="like-name">收藏</div>
            <div class="shoppingCar"><img src="../assets/购物车.png" alt=""></div>
            <div class="shoppingCar-name">购物车</div>
            <div class="addShoppingCar">加入购物车</div>
            <div class="goPay">立即购买</div>
        </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
    .commodityDetails-header{
        width: 100%;
        height: .4rem;
        font-size: .18rem;
        position: relative;
        background: #ffffff;
        line-height: .4rem;
        color: black;
    }
    .commodityDetails-header .commodityDetails-headerLeftOne{
        position: absolute;
        left: .1rem;
        height: .4rem;
        line-height: .4rem;
        margin-top: .02rem;
    }
    .commodityDetails-header .commodityDetails-headerLeftOne img{
        height: .15rem;
    }
    .commodityDetails-header .commodityDetails-headerLeftTwo{
        position: absolute;
        left: .32rem;
        height: .4rem;
        line-height: .4rem;
        margin-top: .02rem;
        font-size: .16rem;
    }
    .commodityDetails-header .commodityDetails-headerRightOne{
        position: absolute;
        right: .5rem;
        height: .4rem;
        line-height: .4rem;
        margin-top: .02rem;
    }
    .commodityDetails-header .commodityDetails-headerRightOne .el-icon-share{
        font-size: .2rem;
    }
    .commodityDetails-header .commodityDetails-headerRightTwo{
        position: absolute;
        right: .1rem;
        height: .4rem;
        line-height: .4rem;
        margin-top: .04rem;
    }
    .commodityDetails-header .commodityDetails-headerRightTwo img{
        height: .2rem;
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: .18rem;
        opacity: 0.75;
        line-height: 3rem;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .commodityDetails-information{
        width: 100%;
        height: 1.1rem;
        font-size: .18rem;
        position: relative;
        background: #ffffff;
        color: black;
        text-align: left;
    }
    .commodityDetails-information .commodityDetails-title{
        padding: .1rem;
        font-size: .14rem;
    }
    .commodityDetails-information .commodityDetails-price{
        padding: .1rem;
        padding-top: 0;
        font-size: .18rem;
        color: #0288DE;
    }
    .commodityDetails-bottom{
        width: 100%;
        position: relative;
        text-align: center;
        font-size: .12rem;
        color: #9F9A9A;
    }
    .commodityDetails-bottom .bottomPrice{
        position: absolute;
        left: .1rem;
    }
    .commodityDetails-bottom .bottomSales{
        position: absolute;
        left: 43%;
    }
    .commodityDetails-bottom .bottomArea{
        position: absolute;
        right: .1rem;
    }
    .service-content{
        height: 1.2rem;
        background: #ffffff;
        margin-top: .05rem;
        font-size: .14rem;
    }
    .service-content .service-item{
        height: .4rem;
        border-bottom: 1px solid #EFEFEF;
        color: #858585;
    }
    .service-content .service-item .item-left-border{
        height: .25rem;
        margin-top: .06rem;
        margin-left: .05rem;
        float: left;
        border-left: .05rem solid #0288DE;
        font-size: .14rem;
    }
    .service-content .service-item .item-left{
        float: left;
        padding: .1rem;
    }
    .service-content .service-item .item-content{
        float: left;
        padding: .1rem;
        color: #727272;
    }
    .service-content .service-item .item-right{
        float: right;
        padding: .1rem;
    }
    .service-content .service-item .item-right .el-icon-arrow-right{
        font-size: .14rem;
    }
    /* ---------------------------------------------------------- */
    .comment{
        height: 1.2rem;
        background: #ffffff;
        margin-top: .05rem;
        font-size: .14rem;
        color: #858585;
    }
    .comment .comment-content{
        height: .4rem;
    }
    .comment .comment-content .item-left-border{
        height: .25rem;
        margin-top: .06rem;
        margin-left: .05rem;
        float: left;
        border-left: .05rem solid #0288DE;
        font-size: .14rem;
    }
    .comment .comment-content .item-left{
        float: left;
        padding: .1rem;
    }
    .comment .comment-content .item-content{
        float: right;
        padding: .1rem;
        padding-right: 0;
        font-size: .11rem;
        color: #0288DE;
    }
    .comment .comment-content .item-right{
        float: right;
        padding: .1rem;
        padding-left: 0;
    }
    .comment .comment-content .item-right .el-icon-arrow-right{
        font-size: .14rem;
        color: #0288DE;
    }
    .comment .comment-user{
        margin-left: .1rem;
        text-align: left;
    }
    .comment .comment-user img{
        height: .2rem;
    }
    .comment .comment-userComment{
        margin: .1rem;
        text-align: left;
    }
    .picture-details{
        height: .4rem;
        font-size: .4rem;
        margin-bottom: .1rem;
    }
    .picture-details img{
        height: .15rem;
    }
    .picture-All,.picture-All img{
        width: 100%;
        margin: 0;
        padding: 0;
        font-size:0;
        line-height: 0;
    }
    .recommendThing{
        height: .4rem;
        font-size: .4rem;
        margin-bottom: .1rem;
    }
    .recommendThing img{
        height: .15rem;
    }
    .recommend-details{
        height: .4rem;
        background: #ffffff;
        margin-top: .05rem;
        font-size: .14rem;
    }
    .recommend-details .comment-content .item-left-border{
        height: .25rem;
        margin-top: .06rem;
        margin-left: .05rem;
        float: left;
        border-left: .05rem solid #0288DE;
        font-size: .14rem;
    }
    .recommend-details .comment-content .item-left{
        float: left;
        padding: .1rem;
    }
    .recommend-details-main{
        height: 2.4rem;
        background: #ffffff;
        font-size: .14rem;
        width: 100%;
        position: relative;
        color: black;
        text-align: left;
    }
    .recommend-details-main .recommend-details-left{
        position: absolute;
        left: .1rem;
        padding: .1rem;
    }
    .recommend-details-main .recommend-details-left img{
        width: 1.5rem;
    }
    .recommend-details-main .recommend-details-right{
        position: absolute;
        left: 50%;
        padding: .1rem;
    }
    .recommend-details-main .recommend-details-right img{
        width: 1.5rem;
    }
    .recommend-details-main .name{
        padding-top: .1rem;
        padding-bottom: .1rem;
    }
    .recommend-details-main .price{
        color: #0288DE;
    }
    .recommend-details-main .price .havePeople{
        float: right;
        color: #9e9e9e;
    }
    .arriveBottom{
        font-size: .4rem;
        margin-bottom: .6rem;
    }
    .arriveBottom img{
        height: .15rem;
    }
    .addShop{
        height: .6rem;
        font-size: .12rem;
        position: fixed;
        bottom: 0;
        background: #ffffff;
        z-index: 3;
        width: 100%;
        text-align: left;
        color: #787878;
    }
    .addShop .service{
        position: absolute;
        left: .1rem;
        top: .1rem;
    }
    .addShop img{
        height: .25rem;
    }
    .addShop .service-name{
        position: absolute;
        left: .1rem;
        top: .38rem;
    }
    .addShop .like{
        position: absolute;
        left: .7rem;
        top: .1rem;
    }
    .addShop .like-name{
        position: absolute;
        left: .7rem;
        top: .38rem;
    }
    .addShop .shoppingCar{
        position: absolute;
        left: 1.3rem;
        top: .1rem;
    }
    .addShop .shoppingCar-name{
        position: absolute;
        left: 1.26rem;
        top: .38rem;
    }
    .addShop .addShoppingCar{
        position: absolute;
        width: 1rem;
        height: .6rem;
        line-height: .6rem;
        background: #52B3F7;
        right: 1rem;
        color: #ffffff;
        font-size: .16rem;
        text-align: center;
    }
    .addShop .goPay{
        position: absolute;
        width: 1rem;
        height: .6rem;
        line-height: .6rem;
        background: #0288D1;
        right: 0;
        color: #ffffff;
        font-size: .16rem;
        text-align: center;
    }
</style>
