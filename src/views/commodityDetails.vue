<template>
    <div>
        <header-general routerTo="/Home" headTitle="商品详情" headClass="style5"></header-general>    
        <div v-for="(item,index) in shopDetails" :key="index">
            <div class="commodityDetails-gooods-message">
                <div class="goods-img">
                <el-carousel :interval="3000" arrow="always">
                    <el-carousel-item  v-for="(value,indexes) in bannerImg" :key="indexes">
                        <img :src="'http://img.cmhg.shop/'+value" alt="" @click="toThumbnail('http://img.cmhg.shop/'+value)">
                    </el-carousel-item>
                </el-carousel>
                </div>
                <div class="goods-title">{{item.name}}</div>
                <div class="goods-price">{{item.price==undefined?(item.integral/100)+'积分':'￥'+item.price.toFixed(2)/100}}</div>
                <div class="sales-volume">
                    <span>快递：0.00</span>
                    <span>月销{{item.salesVolume}}笔</span>
                    <span>广东深圳</span>
                </div>
            </div>
            <div class="service">
                <div class="service-message">服务<span>过期包退</span><div class="commodityDetails-choice"></div></div>
            </div>
            <div class="specifications">
                <div class="specifications-message">规格<span>配送至龙岗区</span><div class="commodityDetails-choice"></div></div>
            </div>
            <div class="specifications">
                <div class="specifications-message">运费<span>满50包邮</span><div class="commodityDetails-choice"></div></div>
            </div>
            <div class="comment">
                <div class="comment-message">买家评论（50）<span>查看全部<span>></span></span></div>
                <div class="comment-user">
                    <div class="comment-user-img"><img src="../assets/user.png" alt=""></div>
                    <div class="comment-user-name">k**k</div>
                    <div class="comment-user-message">好吃好吃好吃！！！买了第三次了哈哈哈哈</div>
                </div>
            </div>
            <div class="recommend">
                <div class="recommend-line"></div>
                <div class="recommend-img"><img src="../assets/img.png">详情</div>
                <div class="recommend-line"></div>
            </div>
            <div class="details-goods">
            <div class="details-goods-img">
                <img  :src="'http://img.cmhg.shop/'+items" v-for="(items,i) in bannerImg" :key="i" @click="toThumbnail('http://img.cmhg.shop/'+items)">
            </div>
            </div>
            <div class="recommend">
                <div class="recommend-line"></div>
                <div class="recommend-img"><img src="../assets/like.png">推荐</div>
                <div class="recommend-line"></div>
            </div>
            <div class="commodityDetails-recommend-goods">
                <div class="recommend-message">推荐商品</div>
                <div class="recommend-goods-img">
                    <img src="../assets/图1.jpg" alt="">
                    卫龙辣条亲嘴烧300g
                    <div class="recommend-goods-price">￥15.00<span>11人付款</span></div>
                </div>
                <div class="recommend-goods-img">
                    <img src="../assets/图1.jpg" alt="">
                    卫龙辣条亲嘴烧300g
                    <div class="recommend-goods-price">￥15.00<span>11人付款</span></div>
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
                    <div class="footer-img" v-if="!collect" @click="eventCollect">
                        <div class="collection"></div>
                        <span>收藏</span>
                    </div>
                     <div class="footer-img" v-if="collect" @click="eventDelCollect">
                        <div class="collected"></div>
                        <span>取消收藏</span>
                    </div>
                    <div class="footer-img">
                        <router-link to="/shopcar" active-class="footer-active">
                        <div class="shopcar"></div>
                        <span>购物车</span>
                        </router-link>
                    </div>
                </div>
                <div class="footer-operation" v-if="item.price!=null">
                    <div class="add-cart" @click="addtoShop(item.storeId,item.id)">加入购物车</div>
                    <div class="purchase" @click="Cover">立即购买</div>
                </div>
                <div class="footer-operation" v-if="item.price==null">
                    <div class="purchase-integral" @click="Cover">立即兑换</div>
                </div>
            </div>
            <div class="cover" id="cover" v-show="markshow" @click="displayCover"></div>
        </div>
        <div class="detail_mark" v-show="imgMark" @click="displayMark"></div>
        <img :src="imgSrc" v-show="imgMark" class="detail_img">
            <currency-Popup ref="popup" popup="style5"  :shopInf="shopDetails" :title="detailstitle" :price="parseFloat(detailsprice)" :img="detailsimg" :integral="integral" :quantity="quantity" :total="parseFloat(total)" @addquantity="addquantity" @toExchange="toExchange"></currency-Popup>
    </div>
</template>
<script>
import currencyPopup from '../components/currencyPopup.vue'//弹出层
import header from '../components/header.vue';
import { payNow,payNext,integralDeatil,lookaddAddress,collectShop, productDetails,addShop,delcollectShop,defaults,conversionIntegral} from '../api/api.js'
import { Toast } from 'mint-ui';
export default {
    components: {
        'header-general':header,
        'currency-Popup':currencyPopup
    },
    data () {
        return {
            markshow:false,
            shopDetails:[],//商品详情信息 （和积分共用）
            bannerImg:[],//单独抽离出来的moreicon （和积分共用）
            selectpay:'微信支付',//初始支付方式
            detailstitle:'',//商品名字
            detailsprice:'',//商品价格
            detailsimg:'',//商品图片
            total:'',//总价
            addAddress:'',//获取收获地址
            defaultAddress:'',//默认收获地址
            integral:'',//购买所获得的积分 目前1块钱积分
            quantity:1,//购买数量，默认是1
            collect:false,//默认未收藏
            imgMark:false,//图片缩略图遮罩
            imgSrc:'',//缩略图src
            fromIntegral:false,
            toexquery:false,
		}
    },
    mounted () {
        this.getaddAddress();
        this.defaultaddAddress();
    },
    methods:{
        select(item){//单选商品 id:商品id  item:商品信息
            
        },
        displayCover(){
            this.markshow=false
            this.$refs.popup.isPoup=false
            this.$refs.popup.expressShow=false
        },
        Cover(){//显示
            this.markshow=true
            this.$refs.popup.isPoup=true
        },
        goback(){
            this.$router.push('/commoditiesList')
        },
        addquantity(e){
            if (!this.fromIntegral) {
                this.shopDetails[0].quantity=e;
                this.quantity=e//更新传值数据
                this.total=e* this.shopDetails[0].price/100;
                this.integral=e* this.shopDetails[0].price/100;
            }else{//积分算法
                this.shopDetails[0].quantity=e;
                this.quantity=e//更新传值数据
                this.total=e* this.shopDetails[0].integral/100;
            }
        },
        loadingDetails(id){
            this.shopDetails = []
            let params={
                'id':id,
                'userOpenId':localStorage.getItem('userOpenId'),
            }
            productDetails(params).then((result) => {
                this.shopDetails.push(result.data);
                this.detailstitle=this.shopDetails[0].name;//名字
                this.detailsprice=this.shopDetails[0].price/100;//价格
                this.detailsimg=this.shopDetails[0].icon;//缩略图
                this.integral=this.shopDetails[0].price/100;//支付后获得的积分
                this.shopDetails[0].quantity= this.quantity;//购买数量
                this.total=this.shopDetails[0].price/100;//总价格
                let imgArr=result.data.morePics.split(',')
                this.collect=result.data.collectStatus==undefined?false:true//判断是否收藏
                for (let i = 0; i < imgArr.length; i++) {
                    this.bannerImg.push(imgArr[i])
                }
            }).catch((err) => {
                console.log(err)
            });
        },
        loadingItegral(id){
            let params={
                'id':id,
            }
            integralDeatil(params).then((result) => {
                this.shopDetails.push(result.data.list[0]);//写死0因为只有一个商品
                this.shopDetails[0].paytype= 'integral';//购买方式
                this.detailstitle=this.shopDetails[0].name;//名字
                this.detailsprice=this.shopDetails[0].integral//积分
                this.detailsimg=this.shopDetails[0].icon;//缩略图
                this.shopDetails[0].quantity= this.quantity;//购买数量
                this.integral=0//传入弹窗中判断是否是积分商品 因为积分商品不得积分
                this.shopDetails[0].quantity= this.quantity;//数量
                this.total=this.shopDetails[0].integral/100;//总价格
                this.collect=result.data.collectStatus==undefined?false:true//判断是否收藏

                let imgArr=result.data.list[0].morePics.split(',')
                for (let i = 0; i < imgArr.length; i++) {
                    this.bannerImg.push(imgArr[i])
                }
                if(this.toexquery==true){
                    this.Cover();
                }
            }).catch((err) => {
                
            });
        },
        getaddAddress(){//查询收货地址
            let params={
                'userOpenId':localStorage.getItem('userOpenId'),
            }
            lookaddAddress(params).then((result) => {
                this.addAddress=result.data.list;
            }).catch((err) => {
                
            });
        },
        defaultaddAddress(){//加默认收货地址
            let params={
                'userOpenId':localStorage.getItem('userOpenId'),
                'id':'5200475142A84F82A32AC42279824FDF'
            }
            defaults(params).then((result) => {
                this.defaultAddress=result.data.id;
            }).catch((err) => {
                
            });
        },
        addtoShop(storeId,id){
            let params={
                "productId":id,
                "userOpenId":localStorage.getItem('userOpenId'),
                "storeId":storeId
            }
            this.$store.dispatch('addtoShop',params).then((result) => {
                if (result.resultCode==200) {
                    Toast({
                        message: '成功加入购物车',
                        duration: 1000
                        });
                }else{
                    Toast({
                        message: '加入失败请稍后重试',
                        duration: 1000
                        });
                }
            }).catch((err) => {
                
            });
        },
        gotoShopCar(){
            this.$router.push('/shopcar')
        },
        topay(){//结算
            this.showMark=true
            this.$refs.popup.isPoup=true
        },
        eventCollect(){
             let params={
                "productId":this.shopDetails[0].id,//写死0
                "userOpenId":localStorage.getItem('userOpenId'),
            }
            collectShop(params).then((result) => {
                if (result.data.resultCode==200) {
                     Toast({
                        message: '收藏成功',
                        duration: 1000
                    });
                    this.collect=true
                }
            }).catch((err) => {
                console.log(err)                
            });
        },
        eventDelCollect(){//取消收藏
            let params={
                "productId":this.shopDetails[0].id,
                "userOpenId":localStorage.getItem('userOpenId'),
            }
            delcollectShop(params).then((result) => {
                if (result.data.resultCode==200) {
                     Toast({
                        message: '取消收藏',
                        duration: 1000
                    });
                    this.collect=false
                }
            }).catch((err) => {
                console.log(err)
            });
        },
        toThumbnail(imgSrc){//查看图片
            this.imgMark=true
            this.imgSrc=imgSrc
        },
        displayMark(){//隐藏缩略图
            this.imgMark=false
            this.imgSrc=''
        },
        toExchange(){//兑换商品
            let params={
                "userOpenId":localStorage.getItem('userOpenId'),
                "scoreProductId":this.$route.query.integral,//商品ID
                "buyAmount":this.shopDetails[0].quantity,//购买数量
                "scorePrice":this.shopDetails[0].integral,//积分价格
                'productDetailJson':JSON.stringify(this.shopDetails),//商品信息
                "scoreUse": this.total*100,//花费总积分  
                'deliverFee':'0',//暂时写0(运费)
                'userName':'测试',//收货人
                'phone':'13715363223',//收货电话
                'orderAddress':'测试',//收货地址
                'storeId':'0',
            }
            conversionIntegral(params).then((result) => {
                if (result.data.resultCode==200) {
                    Toast({
                        message: '兑换成功',
                        duration: 1000
                    });
                }else if(result.data.resultCode==500){
                    Toast({
                        message: '积分不足',
                        duration: 1000
                    });
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    },
    created() {
        if (this.$route.query.id) {//其他页面进入
            this.loadingDetails(this.$route.query.id)
        }else if(!this.$route.query.toexquery) {//积分商城进入
            this.loadingItegral(this.$route.query.integral)
            this.fromIntegral=true;
        }
    },
    mounted () {
        if (this.$route.query.toexquery) {//积分兑换进入
            this.loadingItegral(this.$route.query.integral)
            this.fromIntegral=true;
            this.toexquery=true;
        }
    }
}

</script>
<style>
.commodityDetails-gooods-message .el-carousel__container{
    height: 2.38rem;
}
.commodityDetails-gooods-message .el-carousel{
    width: 100%;
}
.commodityDetails-gooods-message .el-carousel__button{
    background-color:#827a7a;
}
</style>
<style scoped>
.commodityDetails-gooods-message{
    background-color: #ffffff;
    font-size: .19rem;
    text-align: left;
    margin: 0 auto;
    height: 3.7rem;
}
.commodityDetails-gooods-message .goods-img{
    text-align: center;
    height: 2.3rem;
    border-top: .01rem solid #efefef;
    border-bottom: .01rem solid #efefef;
    padding-bottom: .2rem;
}
.commodityDetails-gooods-message .goods-img img{
    height: 2.2rem;
}
.commodityDetails-gooods-message .goods-title{
    width: 93%;
    margin: 0.1rem auto;
    padding-left: .1rem;
    height: .25rem;
    color: #242424;
}
.commodityDetails-gooods-message .goods-price{
    width: 93%;
    margin: .25rem auto;
    font-size: .19rem;
    padding-left: .05rem;
    color: #0288d1;
}
.commodityDetails-gooods-message .goods-price span{
    font-size: .14rem;
    display: inline;
    float: right;
    padding-right: .1rem;
    padding-top:.04rem; 
    color: #888888;
}
.commodityDetails-gooods-message .sales-volume{
    margin-top: -.2rem;
    font-size: .14rem;
    color: #888888;
}
.commodityDetails-gooods-message .sales-volume span{
    display: inline-block;
    float: left;
    margin-left: .67rem;
}
.commodityDetails-gooods-message .sales-volume span:nth-child(1){
    margin-left: .2rem;
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
.service-message span{
    color: #4f4f4f;
    display: inline;
    margin-left: .3rem;
    font-size: .15rem;
}
.service-message .commodityDetails-choice{
    position: relative;
    top: .05rem;
    height: .15rem;
    width: .15rem;
    float: right;
    background:url(../assets/more.png) no-repeat;
    background-size: 100% 100%;
}
.specifications{
    background-color: #ffffff;
    margin-top: .01rem;
    height: .45rem;
    position: relative;
}
.specifications:nth-child(5){
    margin-top: .02rem;
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
.specifications-message .commodityDetails-choice{
    position: relative;
    top: .05rem;
    height: .15rem;
    width: .15rem;
    float: right;
    background:url(../assets/more.png) no-repeat;
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
.details-goods{
    width: 100%;
    margin-top: .2rem;
}
.details-goods-img{
    margin-bottom: -.2rem;
}
.details-goods-img img{
    width: 100%;
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
.commodityDetails-recommend-goods{
    background-color: #ffffff;
    margin-top: .15rem;
    color: #242424;
    font-size: .16rem;
    height: 2.8rem;
    position: relative;
    text-align: left;
}
.commodityDetails-recommend-goods .recommend-message{
    line-height: .35rem;
    height: .3rem;
    border-left:.1rem solid #207cd3;
    padding-left: .1rem;
}
.commodityDetails-recommend-goods .recommend-goods-img{
    float: left;
    width: 47%;
    margin-top: .08rem;
}
.commodityDetails-recommend-goods .recommend-goods-img:nth-child(2){
    margin-left: .068rem;
}
.commodityDetails-recommend-goods .recommend-goods-img:nth-child(3){
    float: right;
    margin-right: .1rem;
}
.commodityDetails-recommend-goods .recommend-goods-img img{
    width: 100%;
    border: .01rem solid #ccc;
}
.commodityDetails-recommend-goods .recommend-goods-price{
    margin-top: .1rem;
    font-size: .15rem;
    line-height: .23rem;
    color: #0288d1;
}
.commodityDetails-recommend-goods .recommend-goods-price span{
    font-size: .13rem;
    line-height: .23rem;
    display: inline;
    float: right;
    color: #888888;
}
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
    color:#666;
}
.footer-img .customer-service{
    background: url(../assets/customer_service.png) no-repeat 52% 50%;
    background-size: auto 100%;
}
.footer-img .collection{
    background: url(../assets/collection.png) no-repeat 54% 50%;
    background-size: auto 100%;
}
.footer-img .collected{
     background: url(../assets/star.png) no-repeat 54% 50%;
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
.footer-operation .purchase-integral{
    width: 100%;
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
.detail_mark{
    background: #000;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    top: 0;
}
.detail_img{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    right: 0;
    bottom: 0;
    margin: auto;
}
</style>