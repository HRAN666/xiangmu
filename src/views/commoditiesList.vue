<template>
    <div>
        <div class="commodities-header">
            <div class="commodities-headerLeft"><img src="../assets/goBack.png" height="20px" alt="返回"></div>
            <div class="commodities-headerCenter"><el-input v-model="input" placeholder="请输入内容"></el-input></div>
            <div class="commodities-headerRight"><img src="../assets/msg_shop.png" height="20px" alt="msg"></div>
        </div>
        <div class="menuNav">
            <el-menu
            :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" text-color="#444444" active-text-color="#0288D1">
                <el-menu-item index="1">全部</el-menu-item>
                <el-menu-item index="2">销量</el-menu-item>
                <el-menu-item index="3">价格<i class="el-icon-d-caret"></i></el-menu-item>
                <el-menu-item index="4">筛选<i class="el-icon-menu"></i></el-menu-item>
            </el-menu>
        </div>
        <div>
            <div class="commodities-list">
                <div class="imgLeft"><img src="../assets/shopList.jpg" alt="商品"></div>
                <div class="informationTop">卫龙亲嘴烧100片盒装辣条大礼包麻辣儿时怀旧小吃小面筋零食辣片</div>
                <div class="informationIcon"><img src="../assets/spot.png" alt="" height="35px"></div>
                <div class="price">￥30.00</div>
                <div class="buy"><el-button type="danger" round>立即购买</el-button></div>
            </div>
            <div class="commodities-list">
                <div class="imgLeft"><img src="../assets/shopList.jpg" alt="商品"></div>
                <div class="informationTop">卫龙亲嘴烧100片盒装辣条大礼包麻辣儿时怀旧小吃小面筋零食辣片</div>
                <div class="informationIcon"><img src="../assets/spot.png" alt="" height="35px"></div>
                <div class="price">￥30.00</div>
                <div class="buy"><el-button type="danger" round>立即购买</el-button></div>
            </div>
            <div class="commodities-list">
                <div class="imgLeft"><img src="../assets/shopList.jpg" alt="商品"></div>
                <div class="informationTop">卫龙亲嘴烧100片盒装辣条大礼包麻辣儿时怀旧小吃小面筋零食辣片</div>
                <div class="informationIcon"><img src="../assets/spot.png" alt="" height="35px"></div>
                <div class="price">￥30.00</div>
                <div class="buy"><el-button type="danger" round>立即购买</el-button></div>
            </div>
            <div class="commodities-list">
                <div class="imgLeft"><img src="../assets/shopList.jpg" alt="商品"></div>
                <div class="informationTop">卫龙亲嘴烧100片盒装辣条大礼包麻辣儿时怀旧小吃小面筋零食辣片</div>
                <div class="informationIcon"><img src="../assets/spot.png" alt="" height="35px"></div>
                <div class="price">￥30.00</div>
                <div class="buy"><el-button type="danger" round>立即购买</el-button></div>
            </div>
            <div class="commodities-list">
                <div class="imgLeft"><img src="../assets/shopList.jpg" alt="商品"></div>
                <div class="informationTop">卫龙亲嘴烧100片盒装辣条大礼包麻辣儿时怀旧小吃小面筋零食辣片</div>
                <div class="informationIcon"><img src="../assets/spot.png" alt="" height="35px"></div>
                <div class="price">￥30.00</div>
                <div class="buy"><el-button type="danger" round>立即购买</el-button></div>
            </div>
            <div class="arriveBottom"><img src="../assets/bottom.png" height="15px" alt="底部"></div>
        </div>
        <div class="yourShoppingCar" v-if="this.shopCommodities==0">
            <div class="shoppingIcon"><img src="../assets/shoppingCar.png" height="50px" alt=""></div>
            <div class="shoppingLeft">未选购商品<br>另需配送费1元</div>
            <div class="shoppingRight">￥15元起</div>
        </div>
        <div class="yourShoppingCar" v-if="this.shopCommodities>0">
            <div class="shoppingIcon"><img src="../assets/shoppingCar.png" height="50px" alt=""></div>
            <div class="shoppingLength">{{shopCommodities}}</div>
            <div class="shoppingLeft">已选购{{shopCommodities}}件商品</div>
            <div class="shoppingRight">￥30.00</div>
        </div>
        <footer-currency></footer-currency>
    </div>
</template>
<script>
import footer from '../components/footer.vue'
export default {
    components:{
        'footer-currency':footer
    },
    data() {
        return {
            input: '',
            activeIndex: '1',
            shopCommodities: '0',
        }
    },
     methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style scoped>
    .commodities-header{
        width: 100%;
        height: .5rem;
        line-height: .5rem;
        font-size: .18rem;
        position: relative;
        background: #ffffff;
    }
    .commodities-header .commodities-headerLeft{
        position: absolute;
        left: .1rem;
        margin-top: .06rem;
    }
    .commodities-header .commodities-headerCenter{
        position: absolute;
        left: 22.5%;
        width: 55%;
    }
    .commodities-header .commodities-headerCenter .el-input>>>.el-input__inner{
        border-radius: 20px;
        text-align: center;
        height: .35rem;
    }
    .commodities-header .commodities-headerRight{
        position: absolute;
        right: .1rem;
        margin-top: .06rem;
    }
    .menuNav .el-menu-demo {
        border-top: 1px solid #E0DFE3;
        border-bottom: 1px solid #E0DFE3;
    }
    .menuNav .el-menu-demo ,.el-menu-item{
        height: .4rem;
        line-height: .4rem;
    }
    .menuNav .el-menu-demo .el-menu-item{
        padding: 0 .256rem;
    }
    .commodities-list{
        height: 1.1rem;
        font-size: .1rem;
        position: relative;
        border-bottom: 1px solid #E0DFE3;
        background: #ffffff;
    }
    .commodities-list .imgLeft {
        position: absolute;
        left: .15rem;
        margin-top: .15rem;
    }
    .commodities-list .imgLeft img{
        height: .8rem;
    }
    .commodities-list .informationTop {
        position: absolute;
        left: 1.4rem;
        margin-top: .15rem;
        width: 1.6rem;
        text-align: left;
    }
    .commodities-list .informationIcon {
        position: absolute;
        left: 3.4rem;
        margin-top: .15rem;
    }
    .commodities-list .price {
        position: absolute;
        left: 1.4rem;
        margin-top: .8rem;
        font-size: .14rem;
        font-weight: bolder;
        color: #0288DE;
    }
    .commodities-list .buy {
        margin-top: .75rem;
        float: right;
    }
    .commodities-list .buy .el-button.is-round{
        padding: 5px 22px;
    }
    .commodities-list .buy .el-button--danger{
        color: #DB2828;
        border-color: #DB2828;
        background-color: #ffffff;
    }
    .arriveBottom{
        font-size: .4rem;
        margin-bottom: 1.1rem;
    }
    .yourShoppingCar{
        height: 1.1rem;
        font-size: .1rem;
        position: fixed;
        bottom: 0;
    }
    .yourShoppingCar .shoppingLength{
        position: absolute;
        left: .5rem;
        bottom: 1.05rem;
        height: .2rem;
        line-height: .2rem;
        width: .2rem;
        background: #DB2828;
        color: #ffffff;
        border: 1px solid #DB2828;
        border-radius: .2rem;
        z-index: 3;
    }
    .yourShoppingCar .shoppingIcon{
        position: absolute;
        left: .2rem;
        top: -.1rem;
        background: #0288DE;
        border: 1px solid #0288DE;
        width: .5rem;
        border-radius: .6rem;
        z-index: 2;
    }
    .yourShoppingCar .shoppingLeft{
        position: absolute;
        bottom: .5rem;
        left: 0;
        width: 3rem;
        height: .4rem;
        text-align: left;
        padding-left: 1rem;
        padding-top: .1rem;
        font-size: .13rem;
        background: #626262;
        color: #c1c1c1;
    }
    .yourShoppingCar .shoppingRight{
        position: absolute;
        left: 2.8rem;
        bottom: .5rem;
        background: #0288DE;
        width: 1rem;
        height: .5rem;
        line-height: .5rem;
        color: #ffffff;
        z-index: 2;
    }
</style>

