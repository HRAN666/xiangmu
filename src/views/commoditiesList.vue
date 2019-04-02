<template>
    <div>
        <div class="commodities-header">
            <div class="commodities-headerLeft" @click="goHome"><img src="../assets/goBack.png" alt="返回"></div>
            <!-- <div class="commodities-headerCenter"><el-input v-model="input" placeholder="请输入内容"></el-input></div>
             -->
             <div class="commodities-headerCenter"><el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input" @input="toseachShop"></el-input></div>
            <div class="commodities-headerRight"><img src="../assets/msg_shop.png" alt="msg"></div>
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
        <div class="list">
            <div class="commodities-list" v-for="(item,index) in seachShopList" :key="index">
                <div class="imgLeft"><img :src="'http://img.cmhg.shop/'+item.icon"></div>
                <div class="informationTop">{{item.name}}</div>
                <div class="informationIcon"><img src="../assets/spot.png" alt=""></div>
                <div class="price">{{'￥'+item.price}}</div>
                <div class="buy"><el-button type="danger" round @click="addShop(item.storeId,item.id,item.price)">立即购买</el-button></div>
            </div>
            <div class="commodities-bottom">我是有底线的</div> 
        </div>
        <div class="yourShoppingCar" v-if="this.shopCommodities==0">
            <div class="shoppingIcon"><img src="../assets/shoppingCar.png" alt=""></div>
            <div class="shoppingLeft">未选购商品<br>另需配送费1元</div>
            <router-link to="/shopcar">
            <div class="shoppingRight">结算</div>
            </router-link>
        </div>
        <div class="yourShoppingCar" v-if="this.shopCommodities>0">
            <div class="shoppingIcon"><img src="../assets/shoppingCar.png" alt=""></div>
            <div class="shoppingLength">{{shopCommodities}}</div>
            <div class="shoppingLeft">已选购{{shopCommodities}}件商品</div>
            <router-link to="/shopcar">
            <div class="shoppingRight">{{'￥'+totlePrice.toFixed(2)}}</div>
            </router-link>
        </div>
        <footer-currency></footer-currency>
    </div>
</template>
<script>
import footer from '../components/footer.vue'
import { Toast } from 'mint-ui';
import {seachShop,loadingShop,addShop} from '../api/api.js'
export default {
    components:{
        'footer-currency':footer
    },
    data() {
        return {
            input: '',
            activeIndex: '1',
            shopCommodities: '0',
            seachShopList:'',//搜索出来的商品List
            totlePrice:0
        }
    },

    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        toseachShop(){
            let params={
                "name":this.input
            }
            this.seachShopList='';
            if (this.input=='') {
                this.loadingAllShop()
            }
            seachShop(params).then((result) => {
                    this.seachShopList=result.data.list;
            }).catch((err) => {
                console.log(err)              
            });
        },
        loadingAllShop(){
            let params={}
            loadingShop(params).then((result) => {
                this.seachShopList=result.data.list
            }).catch((err) => {
                console.log(err)
            });
        },
        goHome(){
            this.$router.push('/')
        },
        addShop(storeId,id,price){
            let params={
                "productId":id,
                "userOpenId":localStorage.getItem('userOpenId'),
                "storeId":storeId
            }
            addShop(params).then((result) => {
                Toast('成功加入购物车');
                this.shopCommodities++;
                this.totlePrice+=price;
            }).catch((err) => {
                
            });
        }
    },

    mounted () {
       this.loadingAllShop()
    }
}
</script>

<style scoped>
    .list{
        margin-bottom: 1.33rem;
    }
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
    .commodities-header .commodities-headerLeft img{
        height: .2rem;
    }
    .commodities-header .commodities-headerCenter{
        position: absolute;
        left: 15%;
        width: 2.3rem;
    }
    .commodities-header .commodities-headerCenter .el-input>>>.el-input__inner{
        border-radius: .2rem;
        text-align: center;
        height: .35rem;
        width: 2.5rem;
    }
    .commodities-header .commodities-headerRight{
        position: absolute;
        right: .1rem;
        margin-top: .06rem;
    }
    .commodities-header .commodities-headerRight img{
        height: .2rem;
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
        font-size: .12rem;
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
        width: .8rem;
    }
    .commodities-list .informationTop {
        position: absolute;
        left: 1.2rem;
        margin-top: .15rem;
        width: 1.8rem;
        line-height: .2rem;
        text-align: left;
    }
    .commodities-list .informationIcon {
        position: absolute;
        left: 3.4rem;
        margin-top: .15rem;
    }
    .commodities-list .informationIcon img{
        height: .35rem;
    }
    .commodities-list .price {
        position: absolute;
        left: 1.2rem;
        margin-top: .8rem;
        font-size: .14rem;
        font-weight: bolder;
        color: #0288DE;
    }
    .commodities-list .buy {
        margin-top: .75rem;
        float: right;
        margin-right: .15rem;
    }
    .commodities-list .buy .el-button.is-round{
        padding: .04rem .14rem;
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
    .arriveBottom{
        height: .15rem;
    }
    .yourShoppingCar{
        height: 1.1rem;
        font-size: .12rem;
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
    .yourShoppingCar .shoppingIcon img {
        height: .5rem;
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
        font-size: .12rem;
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
        font-size: .13rem;
    }
    .commodities-bottom{
    font-size: .12rem;
    width: 100%;
    position: absolute;
    margin-bottom: 1.26rem;
    color:#a2a0a0;
    margin-top: .05rem;
    }
    .commodities-bottom::before{
    content:'';
    position: absolute;
    border: .1px #e0dddd solid;
    width: 27%;
    left: .43rem;
    bottom: .06rem;
    }
    .commodities-bottom::after{
    content:'';
    position: absolute;
    border: .1px #e0dddd solid;
    width: 27%;
    right: .43rem;
    bottom: .06rem;
}
</style>

