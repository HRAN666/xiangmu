<template>
    <div class="shopCar">
            <div class="shopCar_mark" v-show="showMark" @click="displayMark"></div><!--结算遮罩层-->
        <header-general routerTo='/home' headTitle="购物车" headClass="style3"  titleSecod="编辑" ref="shop" @toDelete='toDelete'></header-general>
        <div class="shopCar_address" v-if="ShopList.length != ''">
            <img src="../assets/shopCar_address.png" alt="" class="shopCar_address_icon">
            {{this.$refs.popup.addressDetail==''?'请填写收货地址':this.$refs.popup.addressDetail}}
            <img src="../assets/shopCar_more.png" alt="" class="shopCar_address_iconMore">
        </div>
        <div class="shopCar_commodity">
            <div class="shopCar_commodity_list" v-for="(item,index) in ShopList" :key="index">
                <input  @change="select(item.id,item)"   type="checkbox" :checked="shopListCheck.indexOf(item.id)>=0"  class="shopCar_commodity_list_checkbox">
                   <img :src="'http://img.cmhg.shop/'+item.bizProductVo.icon" alt="" @click="gotoDetail(item.productId)">
                    <div class="shopCar_commodity_listTitle">{{item.bizProductVo.name}}</div>
                    <span class="shopCar_commodity_listPrice">{{item.bizProductVo.price|filtertoMoney}}</span>
                    <el-input-number size="mini" @change="theNumChange(item.productId,item.storeId,item.theNum)" v-model="item.theNum" :min="1" :max="99"></el-input-number>
            </div>
            <div class="shopCar_empty" v-if="ShopList.length == ''">
                <img src="../assets/shopCar_second.png">
                <span>购物车是空的</span>
                <div class="shopCar_empty_spike">逛逛秒杀></div>
            </div>
        </div>
        <div class="shopCar_recommend">
            <span class="shopCar_recommendWord">商品推荐</span>
            <img src="../assets/comm.png" alt="" class="shopCar_recommendTitle">
            <div class="shopCar_discount">
                <div v-for="(itemrecommend,indexes) in RecommendDetails" :key="indexes" @click="gotoDetail(itemrecommend.id)">
                    <div class="shopCar_shoplist">
                        <div class="shopCarCar_shoplist_img"><img :src="'http://img.cmhg.shop/'+itemrecommend.icon" ></div>
                        <p>{{itemrecommend.name}}</p>
                        <div class="shopCarCar_shoplist_message">
                            <span class="shopCar_shoplist_price">￥{{itemrecommend.price/100}}</span>
                            <span>{{itemrecommend.salesVolume}}人付款</span>
                            <span class="shopCar_shoplist_similar">相似</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shopCar-to-the-end">
            <div class="shopCar-to-the-end-line"></div>
            <div class="shopCar-to-the-end-text">已经到底了</div>
            <div class="shopCar-to-the-end-line"></div>
        </div>
        <div class="shopCar_totle">
            <div class="shopCar_totle_checkedAll">
            <input v-model="checkAll"  type="checkbox" class="shopCar_totle_checkbox" @change="tocheckAll">
            <span>全选</span>
            </div>
            <span class="shopCar_totle_freight" v-if="!deletShop">不含运费</span>
            <div class="shopCar_totle_price" v-if="!deletShop">
                总计：
                <span>{{sumPrice}}</span>
            </div>
            <!-- <span class="shopCar_totle_discount" v-if="!deletShop">已优惠：￥10.00</span> -->
            <el-button type="primary" @click="topay" v-if="!deletShop">{{'结算('+totalNum+')'}}</el-button>
            <el-button type="danger" @click="removeShop" v-if="deletShop">{{'删除('+shopInf.length+')'}}</el-button>
        </div>
        <currency-Popup ref="popup" popup="style1" :total="totlePrice.toFixed(2)" :quantity="totalNum"  :integral="integral" :shopInf="shopInf" fromProduct='1'></currency-Popup>
        <footer-currency></footer-currency>
    </div>
</template>
<script>
import {removeShopCar,addShop,productDetails,HisproductReCommend} from '../api/api.js'
import currencyPopup from '../components/currencyPopup.vue'//弹出层
import header from '../components/header.vue'
import footer from '../components/footer.vue'
import {filtertoMoney} from '../filter/filter.js'
import { Toast } from 'mint-ui';
export default {
    inject:['reload'],
    components:{
        'header-general':header,
        'footer-currency':footer,
        'currency-Popup':currencyPopup
    },
    data(){
        return{
            checkAll:true,//是否全选
            shopListCheck:[],//选中商品id
            ShopList:[],//存放商品
            shopInf:[],//商品所有信息（取价格&&数量)
            RecommendDetails:[],//推荐商品信息
            showMark:false,
            totlePrice:0,//总价格
            totalNum:0,//总价格
            integral:'',//购买所获得的积分 目前1块钱积分
            deletShop:false,
        }
    },
    methods:{
        select(id,item){//单选商品 id:商品id  item:商品信息
            let index=this.shopListCheck.indexOf(id)
            if(index>=0){//重复
                this.shopListCheck.splice(index,1);
                this.shopInf.splice(index,1)
                this.checkAll=false;
            }else{
                this.shopListCheck.push(id)
                this.shopInf.push(item)
                if (this.ShopList.length==this.shopListCheck.length) {//单选全满：全选打勾
                    this.checkAll=true
                }
            }
        },
        tocheckAll(e){//全选
            if (this.checkAll) {//全选
                this.shopListCheck=[]//特殊情况
                this.ShopList.forEach(item => {
                    this.shopListCheck.push(item.id)
                    this.shopInf.push(item);
               });
            }else{//反选
                this.shopListCheck=[]
                this.shopInf=[]
            }
        },
        topay(){//结算
            if(this.shopListCheck==''){
                Toast({
                    message: '请选择要购买的商品',
                    duration: 1000
                });
            }else{
                this.showMark=true
                this.$refs.popup.isPoup=true
            }
        },
        displayMark(){
            this.showMark=false
            this.$refs.popup.isPoup=false
        },
        loadingShop(){
            let params={
               "userOpenId":localStorage.getItem('userOpenId'),
            }
            this.$store.dispatch('loadingShop',params).then((result) => {
                this.ShopList=result
                this.tocheckAll()//全选
            }).catch((err) => {
                console.log(err)
            });
        },
        loadingHisproductReCommend(){
            let params={
                'userOpenId':localStorage.getItem('userOpenId'),
                'storeId':'0',
            }
            HisproductReCommend(params).then((jsonData) => {
                this.RecommendDetails=jsonData.data.list
            }).catch((err) => {
                console.log(err)
            });
        },
        removeShop(){
            if (this.shopListCheck=='') {
                Toast({
                    message: '请选择要删除的商品',
                    duration: 1000
                    });
            }
            let params={
                "id":this.shopListCheck.toString()
            }
            removeShopCar(params).then((result) => {
                if (result.data.resultCode==200) {
                    Toast({
                        message: '删除成功',
                        duration: 1000
                        });
                    this.reload()
                }
            }).catch((err) => {
                
            });
        },
        toDelete(){//获取子组件data
            this.$nextTick(()=>{
                this.deletShop=this.$refs.shop.deletShop
            })
        },
        gotoDetail(id){
            this.$router.push({path:'/commodityDetails',query:{id:id}})//id:商品详情渲染的id
        },
        theNumChange(productId,storeId,theNum){
            let params={
                "productId":productId,
                "userOpenId":localStorage.getItem('userOpenId'),
                "storeId":storeId,
                "theNum":theNum
            }
        },
    },
    computed: {
        sumPrice(){
            let totle=0;
            let totalN=0;
            if (this.checkAll) {
                this.ShopList.forEach(item=>{//计算总价格
                totle+=item.bizProductVo.price*item.theNum;
                totalN+=item.bizProductVo.price*item.theNum;
                this.totlePrice=(totle/100);
                this.integral=this.totlePrice;
                this.totalNum=totalN;
            })    
            }else{
                this.shopInf.forEach(item=>{//计算总价格取消反选之后计算的价格
                totle+=item.theNum*item.bizProductVo.price;
                totalN+=item.bizProductVo.price*item.theNum;
                this.totlePrice=(totle/100);
                this.integral=this.totlePrice;
                this.totalNum=totalN;
            })    
            }
            return '￥'+(totle/100).toFixed(2)
        },
    },
    created() {
        this.loadingShop()//渲染购物车商品
        this.loadingHisproductReCommend()//渲染推荐商品
    },
    mounted() {

    },
}
</script>
<style>

.shopCar .el-input-number--mini{
    width: .75rem;
    margin-right: .05rem;
    float: right;
    margin-top: .5rem;
}
.shopCar .el-input-number--mini .el-input-number__decrease, .el-input-number--mini .el-input-number__increase{
    width: .2rem;
    top: .04rem;
    height: .18rem;
}
.shopCar .el-input-number--mini .el-input__inner{
   padding: 0 .3rem;
}
.shopCar_commodity .el-input--mini .el-input__inner{
    height: .2rem;
}
.shopCar_commodity .el-icon-minus:before{
    font-size: .16rem;
    position: relative;
    top: -.04rem;
}
.shopCar_commodity .el-icon-plus:before{
    font-size: .16rem;
    position: relative;
    top: -.04rem;
}
.shopCar_empty{
    width: 100%;
    height: 1.15rem;
    background: #fff;
    margin-top: -0.22rem;
}
.shopCar_empty img{
    width: .5rem;
    margin-left: 1rem;
    margin-bottom: 0.1rem;
}
.shopCar_empty span{
    color: #8B8B8B;
    font-size: .14rem;
    margin-right: 1.24rem;
    margin-top: 0.5rem;
    float: right;
}
.shopCar_empty_spike{
    color: #0288D1;
    font-size: .13rem;
    float: right;
    position: relative;
    margin-top: -0.2rem;
    margin-right: 0.15rem;
}
.shopCar_totle .el-button--primary{
    float: right;
    height: .5rem;
    width: 1rem;
    margin-top: -.36rem;
    border-radius: 0;
}
.shopCar_totle .el-button--danger{
    float: right;
    height: .5rem;
    width: 1rem;
    border-radius: 0;
}
</style>

<style scoped>
.shopCar{
    overflow:hidden;
}
.shopCar_commodity{
    text-align:left;
    margin-top:.22rem;
}
.shopCar_address{
    font-size: .14rem;
    color: #4d4d4d;
    height: .4rem;
    text-align: left;
    background: #fff;
    margin-top: .02rem;
    line-height: 3;
    padding-left: .1rem;
}
.shopCar_address .shopCar_address_icon{
    width: .19rem;
    height: .19rem;
    position: relative;
    top: .04rem;
}
.shopCar_address .shopCar_address_iconMore{
    width: .15rem;
    position: relative;
    top: .02rem;
    left: .04rem;
    height: .15rem;
}
.shopCar_commodity .shopCar_commodity_list{
    height: .90rem;
    background: #fff;
    width: 98%;
    position: relative;
    margin-left: 1%;
    margin-top:.12rem;
}
.shopCar_commodity .shopCar_commodity_list img{
    width: .52rem;
    height: .52rem;
    float: left;
    margin-top:.19rem;
}
.shopCar_commodity .shopCar_commodity_list .shopCar_commodity_listTitle{
    font-size:.14rem;
    padding-top: .19rem;
    padding-left: .14rem;
    width: 1.69rem;
    float: left;
}
.shopCar_commodity .shopCar_commodity_list .shopCar_commodity_listPrice{
    font-size:.14rem;
    color:#0288d1;
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
}
.shopCar_recommend{
    margin-top:.2rem;
    position: relative;
}
.shopCar_recommend .shopCar_recommendTitle{
    width:1.55rem;
    position: relative;
    top: -.94rem;
}
.shopCar_recommend .shopCar_recommendWord{
    font-size:.18rem;
    color:#0288d1;
    display:block;
}
.shopCar_discount{
    margin-top:-1.08rem;
    height: 5rem;
}
.shopCar_shoplist{
    position: relative;
    height: 2.4rem;
    width: 47%;
    background: #fff;
    font-size:.14rem;
    float: left;
    text-align:left;
    margin-left:.08rem;
    padding-left: .15rem;
    padding-right: .15rem;
    box-sizing: border-box;
    margin-top:.1rem;
    border-radius: .1rem;
}
.shopCar_shoplist .shopCarCar_shoplist_img{
    height: 1.5rem;
    width: 1.5rem;
    text-align: center;
}
.shopCar_shoplist img{
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
}
.shopCar_shoplist p{
    height: .45rem;
    overflow: hidden;
    text-overflow: ellipsis;
}
.shopCar_shoplist .shopCarCar_shoplist_message{
    position:absolute;
    top: 2.1rem;
}
.shopCar_shoplist .shopCar_shoplist_price{
    color:#0489D1;
    font-size:.14rem;
}
.shopCar_shoplist  span{
    margin-right:.1rem;
    font-size:.12rem;
    color:#888888;
}
.shopCar_shoplist  span:nth-child(2){
    margin-right:.25rem;
}
.shopCar_shoplist .shopCar_shoplist_similar{
    border: 1px solid #bbbbbb;
    border-radius: .08rem;
    width: .2rem;
    padding: .02rem .04rem .02rem .04rem;
}
.shopCar-to-the-end{
    position: relative;
    color: #a8a8a8;
    font-size: .16rem;
    height: 1.7rem;
}
.shopCar-to-the-end .shopCar-to-the-end-line{
    border-top: #d8d8d8 solid .01rem;
    width: 1rem;
    position: relative;
    top:.23rem;
    height: .1rem;
}
.shopCar-to-the-end .shopCar-to-the-end-line:nth-child(1){
    float: left;
    margin-left: .3rem;
}
.shopCar-to-the-end .shopCar-to-the-end-line:nth-child(3){
    float: right;
    margin-right: .3rem;
}
.shopCar-to-the-end .shopCar-to-the-end-text{
    margin: 0 auto;
    line-height: .45rem;
    width: 100%;
    position:absolute;
    top: .02rem;
}
.shopCar .shopCar_totle{
    background:#fff;
    height: .6rem;
    position: fixed;
    bottom: .5rem;
    width: 100%;
    font-size:.125rem;
    z-index: 999;
}
.shopCar_totle .shopCar_totle_freight{
    position: relative;
    left: -.9rem;
    top: .12rem;
    color:#a2a0a0;
}
.shopCar_totle .shopCar_totle_price{
    top:-.1rem;
    position: relative;
    font-size:.15rem;
    left: -0.04rem;
}
.shopCar_totle .shopCar_totle_price span{
    font-size:.15rem;
    color:#0288d1;
}
 .shopCar_totle .shopCar_totle_discount{
    position: relative;
    left: .5rem;
    color:#a2a0a0;
    top: -0.05rem;
 }
 .shopCar_commodity_list_checkbox{
    float: left;
    height: .2rem;
    width:.2rem;
    margin-top: .35rem;
    margin-left: .1rem;
    margin-right: .12rem;
 }
input[type="checkbox"]:checked::before{
    background-color: #0288d1;
    content:'';
    position: absolute;
    width: .2rem;
    height: .2rem;
}
input[type="checkbox"]:checked::after{
    content: "√";
    font-family: '微软雅黑';
    font-weight: bold;
    font-size: .17rem;
    position: absolute;
    color: #fff;
    left: .15rem;
}
.shopCar_totle .shopCar_totle_checkbox{
    height: .2rem;
    width:.2rem;
    margin-left: 0;
}
.shopCar_totle .shopCar_totle_checkedAll{
    float: left;
    margin-top: .13rem;
    margin-left: .1rem;
}
.shopCar_totle .shopCar_totle_checkedAll span{
    position: relative;
    top: -.06rem;
    left: .04rem;
    color: #a2a0a0;
}
.shopCar .shopCar_mark{
    position: fixed;
    background: #474747;
    opacity: .6;
    height: 100%;
    width: 100%;
    z-index: 1000;
}
</style>

