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
                <el-menu-item index="all">全部</el-menu-item>
                <el-menu-item index="sales_volume desc">销量</el-menu-item>
                <el-menu-item index="price asc" @click.native="priceBy">价格<i class="el-icon-d-caret"></i></el-menu-item>
                <el-menu-item index="filter">筛选<i class="el-icon-menu"></i></el-menu-item>
            </el-menu>
        </div>
        <div class="list_empty" v-if="seachShopList==''">
            <img src="../assets/empty_shopList.png" alt="">
            <p>没有更多商品数据了~</p>
        </div>
        <div class="list" v-if="seachShopList!=''">
            <div class="commodities-list" v-for="(item,index) in seachShopList" :key="index">
                <div class="imgLeft"  @click="gotoDetails(item.id)"><img :src="'http://img.cmhg.shop/'+item.icon"></div>
                <div class="informationTop">{{item.name}}</div>
                <div class="informationIcon"><img src="../assets/spot.png" alt=""></div>
                <div class="price">{{item.price|filtertoMoney}}</div>
                <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" >
                <img :src="'http://img.cmhg.shop/'+item.icon" alt="" v-show="showShop[index].show" class="list_shopDrop" :key="index">
                </transition>
                <div class="buy">
                    <el-button type="danger" round @click.native="addToShop(item.storeId,item.id,item.price,index)">立即购买</el-button>
                </div>
            </div>

            <div  v-show="display" @click="Exitfilter($event)"  class="commoditiesList-filter-mark" ></div> 
            <div  ref="look" class="commoditiesList-filter-list"></div>
            
            <div class="commoditiesList-to-the-end">
                <div class="to-the-end-line"></div>
                <div class="to-the-end-text">已经到底了</div>
                <div class="to-the-end-line"></div>
            </div>
        </div>
        <div class="yourShoppingCar" v-if="$store.state.shop_store.shopLength==0" v-show="todisPlayFooter">
            <div class="shoppingIcon"><img src="../assets/shoppingCar.png" alt=""></div>
            <div class="shoppingLeft">未选购商品<br>另需配送费1元</div>
            <router-link to="/shopcar">
            <div class="shoppingRight">结算</div>
            </router-link>
        </div>
        <div class="yourShoppingCar" v-if="$store.state.shop_store.shopLength>0"  v-show="todisPlayFooter">
            <div class="shoppingIcon"><img src="../assets/shoppingCar.png" alt=""></div>
            <div class="shoppingLength">{{$store.state.shop_store.shopLength}}</div>
            <div class="shoppingLeft">已选购{{$store.state.shop_store.shopLength}}件商品</div>
            <router-link to="/shopcar">
            <div class="shoppingRight">{{totlePrice|filtertoMoney}}</div>
            </router-link>
        </div>
        <img src="../assets/top.png" alt="" class="list-top" v-show="listTop" @click="goTop">
        <footer-currency @disPlay="disPlayFooter" ref="showFooter"></footer-currency>
    </div>
</template>
<script>
import footer from '../components/footer.vue'
import { Toast } from 'mint-ui';
import {seachShop,addShop} from '../api/api.js'
import {filtertoMoney} from '../filter/filter.js'
import {debounce} from '../common/common.js'
import { debug } from 'util';
export default {
    components:{
        'footer-currency':footer
    },
    data() {
        return {
            input: '',//搜索框的值
            activeIndex: 'all',//开始索引
            seachShopList:'',//搜索出来的商品List
            totlePrice:0,//总价格
            showShop:[],//控制显示的动画的数组
            indexes:0,//选中的img索引位置
            priceOrderBy:false,//默认升序
            listTop:false,//是否显示返回顶部
            todisPlayFooter:true,
            display: false, //筛选框弹出
        }
    },

    methods: {
        handleSelect(key,keyPath) {
            if (key!='price asc') {//除了价格排序
                if(key == 'filter'){//点击筛选不加载商品
                    this.Popupfilter()
                }else{
                     this.loadingAllShop(this.input,key,this.$route.query.catalogId=='undefined'?'':this.$route.query.catalogId);
                }
            }
        },
        priceBy(){
            if (!this.priceOrderBy) {
                this.priceOrderBy=true;
                this.loadingAllShop(this.input,'price asc')//升序
           }else{
                this.priceOrderBy=false;
                this.loadingAllShop(this.input,'price desc')//降序
           }
        },
        toseachShop(){
            debounce(this.seachFn(),2000)       
        },
        seachFn(){
                this.indexes='';
                this.showShop=[];
                    if (this.input=='') {//input值
                        this.loadingAllShop()
                    }else{
                        this.loadingAllShop(this.input,'',this.$route.query.catalogId=='undefined'?'':this.$route.query.catalogId)
                    } 
        },
        loadingAllShop(nodeName,orderBy,catalogId){//nodeName:搜索名字 orderBy：排序方式 catalogId：其他模块搜索条件
            this.showShop=[];//重新刷新动画图片
            this.seachShopList='';//清空初始list
            let params={
                'name':nodeName,
                'orderByClause':orderBy=='all'?'':orderBy,
                'catalogId':catalogId
            }
            seachShop(params).then((result) => {
                this.seachShopList=result.data.list;
                for (let i = 0; i < result.data.list.length; i++) {//遍历有多少商品就添加多少动画
                    this.showShop.push({'show':false})                
                }
            }).catch((err) => {
                console.log(err)              
            });
        },
        goHome(){
            this.$router.push('/')
        },
        addToShop(storeId,id,price,index){
            this.indexes=index//获取点击商品list
            this.showShop[index].show=true//开始动画
            let params={
                "productId":id,
                "userOpenId":localStorage.getItem('userOpenId'),
                "storeId":storeId
            }
            this.$store.dispatch('addtoShop',params).then((result) => {
                 Toast({
                    message: '成功加入购物车',
                    duration: 1000
                    });
                this.totlePrice+=price;
                localStorage.setItem('totlePrice',this.totlePrice)
            }).catch((err) => {
                console.log(err)
            });
        },
        beforeEnter(el){
            el.style.opacity='1'
            el.style.transform="translate(0,0)";  
        },
        enter(el,done){
            this.$nextTick(()=>{//异步更新DOM
                el.offsetWidth//触发网页重排
                let ClientRect=el.getBoundingClientRect()
                let y=(window.innerHeight-ClientRect.bottom-130)//130是底部的高度
                let x=(ClientRect.right-60)//60图片width以及边距
                el.style.transform=`translate(${-x}px,${y}px)`
                el.style.transition="all 0.4s cubic-bezier(0.49,-0.29,0.75, 0.14)"
                el.style.opacity='.2'
                el.addEventListener('transitionend', done);//立即调用afterEnter
            })
        },
        afterEnter(el){
            el.style.opacity='0'
            this.showShop[this.indexes].show=false;
        },
        gotoDetails(id){//go商品详情
            this.$router.push({path:'/commodityDetails',query:{id:id}})//id:商品详情渲染的id query传参为了防止页面刷新参数重置
        },
        scroll(){//监听滚动事件
            if (window.scrollY>=200) {
                this.listTop=true
            }else{
                this.listTop=false
            }
        },
        goTop(){//返回顶部
            window.scrollTo(0,0)   
        },
        loadingShopCarLength(){//加载购物车有多少商品
             let params={
               "userOpenId":localStorage.getItem('userOpenId'),
               "storeId":"0"//暂时写0
            }
             this.$store.dispatch('loadingShop',params).then((result) => {
                 this.$store.state.shop_store.shopLength=0
                    for (let i = 0; i < result.length; i++) {
                        this.totlePrice+=result[i].bizProductVo.price*result[i].theNum
                        this.$store.state.shop_store.shopLength+=result[i].theNum
                    }
            }).catch((err) => {
                console.log(err)
            });
        },
        disPlayFooter(){
        if (this.$refs.showFooter.showFooter) {
            this.todisPlayFooter=true;
            }else{
            this.todisPlayFooter=false;
            }
        },
        Popupfilter(){
            this.$refs.look.style.right = 0 + "rem";
            this.display = true;
        },
        Exitfilter(){
            this.$refs.look.style.right = -2.7 + "rem";
            this.display = false;
        }
    },
    created () {
        if (this.$route.query.catalogId) {//判断是否从更多进来
            this.loadingAllShop('','',this.$route.query.catalogId)
        }else{
            this.loadingAllShop();
        }
       window.addEventListener('scroll',this.scroll);
       this.loadingShopCarLength()
    },
}
</script>

<style scoped>
    .list{
        margin-bottom: 1.33rem;
    }
    .list-top{
        position: fixed;
        bottom: 1.12rem;
        right:.1rem;
        width: .25rem;
        z-index: 1000;
    }
    .list_empty img{
        width: .62rem;
        height: .62rem;
    }
    .list_empty p{
        font-size: .14rem;
        color:#797878;
        margin-top: -.15rem;
    }
    .list .list_shopDrop {
        border-radius: .3rem;
        float: left;
        width: .2rem;
        height: .2rem;
        position: absolute;
        z-index: 99;
        right: .98rem;
        top: .77rem;
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
        text-align: left;
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
        font-size: .15rem;
        position: relative;
        border-bottom: 1px solid #E0DFE3;
        background: #ffffff;
    }
    .commodities-list .imgLeft {
        position: relative;;
        left: .15rem;
        width: 1rem;
        height: 1.1rem;
    }
    .commodities-list .imgLeft img{
        width: 100%;
        position: absolute;
        top:50%; 
        left:50%;
        transform: translate(-50%,-50%);
    }
    .commodities-list .informationTop {
        position: relative;
        left: 1.4rem;
        top:-.9rem;
        width: 1.8rem;
        line-height: .2rem;
        text-align: left;
    }
    .commodities-list .informationIcon {
        position: absolute;
        left: 3.4rem;
        top: 0.2rem;
    }
    .commodities-list .informationIcon img{
        height: .35rem;
    }
    .commodities-list .price {
        position: absolute;
        left: 1.4rem;
        top: .75rem;
        font-size: .17rem;
        font-weight: bolder;
        color: #0288DE;
    }
    .commodities-list .buy {
        margin-right: .08rem;
        position: absolute;
        top: .7rem;
        right: .1rem;
        z-index: 999;
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
        z-index: 1000
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
        height: .45rem;
        text-align: left;
        padding-left: 1rem;
        padding-top: .05rem;
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
        font-size: .18rem;
    }
    .commoditiesList-to-the-end{
        position: relative;
        color: #a8a8a8;
        font-size: .16rem;
        height: .2rem;
    }
    .commoditiesList-to-the-end .to-the-end-line{
        border-top: #d8d8d8 solid .01rem;
        width: 1rem;
        position: relative;
        top:.23rem;
        height: .1rem;
    }
    .commoditiesList-to-the-end .to-the-end-line:nth-child(1){
        float: left;
        margin-left: .3rem;
    }
    .commoditiesList-to-the-end .to-the-end-line:nth-child(3){
        float: right;
        margin-right: .3rem;
    }
    .commoditiesList-to-the-end .to-the-end-text{
        margin: 0 auto;
        line-height: .45rem;
        width: 100%;
        position:absolute;
        top: .02rem;
    }
    .commoditiesList-filter{
        width: 100%;
        height: 4.61rem;
        position: absolute;
        top: 0;
        margin-top: .92rem;
        transition: all 1s;
        z-index: 1001;
    }
     .commoditiesList-filter-mark{
        width: 100%;
        height: 4.62rem;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1002;
        background-color: #000000;
        margin-top: .91rem;
        transition: all .8s;
        opacity: 0.4;
    }   
    .commoditiesList-filter-list{
        width: 70%;
        height: 4.62rem;
        position: fixed;
        top: 0;
        right: -2.7rem;
        z-index: 1002;
        margin-top: 1rem;
        margin-top: .91rem;
        background-color: #ffffff;
        transition: all .8s;
    }
</style>

