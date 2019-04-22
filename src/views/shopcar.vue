<template>
    <div class="shopCar">
            <div class="shopCar_mark" v-show="showMark" @click="displayMark"></div><!--结算遮罩层-->
        <header-general routerTo='/home' headTitle="购物车" headClass="style3"  titleSecod="编辑" ref="shop" @toDelete='toDelete'></header-general>
        <div class="shopCar_address" v-if="ShopList.length != ''">
            <img src="../assets/shopCar_address.png" alt="" class="shopCar_address_icon">
            送至：广东龙岗区
            <img src="../assets/shopCar_more.png" alt="" class="shopCar_address_iconMore">
        </div>
        <div class="shopCar_commodity">
            <div class="shopCar_commodity_list" v-for="(item,index) in ShopList" :key="index">
                <input  @change="select(item.id,item)"   type="checkbox" :checked="shopListCheck.indexOf(item.id)>=0"  class="shopCar_commodity_list_checkbox">
                   <img :src="'http://img.cmhg.shop/'+item.bizProductVo.icon" alt="" @click="gotoDetail(item.productId)">
                    <div class="shopCar_commodity_listTitle">{{item.bizProductVo.name}}</div>
                    <span class="shopCar_commodity_listPrice">{{item.bizProductVo.price|filtertoMoney}}</span>
                     <el-input-number size="mini" v-model="item.theNum" :min="1" :max="99"></el-input-number>
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
          <div>
          <div class="shopCar_shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="shopCar_shoplist_price">￥22.50</span>
                <span>999人付款</span>
                <span class="shopCar_shoplist_similar">相似</span>
              </div>
          </div>
        <div class="shopCar_shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="shopCar_shoplist_price">￥22.50</span>
                <span>999人付款</span>
                <span class="shopCar_shoplist_similar">相似</span>
              </div>
          </div>
             <div class="shopCar_shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="shopCar_shoplist_price">￥22.50</span>
                <span>999人付款</span>
                <span class="shopCar_shoplist_similar">相似</span>
              </div>
          </div>
            <div class="shopCar_shoplist">
              <img src="../assets/shopList.jpg" alt="">
              <p>黑人茶倍健牙膏140g</p>
              <div>
                <span class="shopCar_shoplist_price">￥22.50</span>
                <span>999人付款</span>
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
            <span class="shopCar_totle_discount" v-if="!deletShop">已优惠：￥10.00</span>
            <el-button type="primary" @click="topay" v-if="!deletShop">{{'结算('+shopInf.length+')'}}</el-button>
            <el-button type="danger" @click="removeShop" v-if="deletShop">{{'删除('+shopInf.length+')'}}</el-button>
        </div>
        <currency-Popup ref="popup" popup="style1" :totle="totlePrice.toFixed(2)" :shopLength="shopInf.length" :selectpay="selectpay" @changePay="paymethod" @toPay="todoWechatPay"></currency-Popup>
        <footer-currency></footer-currency>
    </div>
</template>
<script>
import {loadingshopCar,removeShopCar,payNext} from '../api/api.js'
import currencyPopup from '../components/currencyPopup.vue'//弹出层
import header from '../components/header.vue'
import footer from '../components/footer.vue'
import {filtertoMoney} from '../../filter/filter.js'
import { Toast } from 'mint-ui';
export default {
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
            showMark:false,
            totlePrice:0,//总价格
            selectpay:'微信支付',//初始支付方式
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
                    this.shopInf.push(item)
               });
            }else{//反选
                this.shopListCheck=[]
                this.shopInf=[]
            }
        },
        topay(){//结算
            this.showMark=true
            this.$refs.popup.isPoup=true
        },
        displayMark(){
            this.showMark=false
            this.$refs.popup.isPoup=false
        },
        paymethod(e){//切换支付方式
            switch (e) {
                case 'wechat':
                    this.selectpay='微信支付'
                    break;
                case 'wait':
                    this.selectpay='货到付款'                    
                    break;
                default:
                    break;
            }
        },
        loadingShop(){
            let params={
               "userOpenId":localStorage.getItem('userOpenId'),
               "storeId":"0"//暂时写0
            }
            loadingshopCar(params).then((result) => {
                this.ShopList=result.data.list;
                this.tocheckAll()//全选
            }).catch((err) => {
                
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
                    this.loadingShop()
                }
            }).catch((err) => {
                
            });
        },
        toDelete(){//获取子组件data
            this.$nextTick(()=>{
                this.deletShop=this.$refs.shop.deletShop
            })
        },
        todoWechatPay(e){//微信支付||货到付款
            let params={
                'userOpenId':localStorage.getItem('userOpenId'),
                'deliverFee':'0',//暂时写0(运费)
                'deliverName':'测试',//收货人
                'deliverPhone':'13715363223',//收货电话
                'deliverAddress':'测试',//收货地址
                'productDetailJson':JSON.stringify(this.shopInf),//商品信息
                'storeId':'0',//
                'totalFee':this.totlePrice,//总价格
                'ext1':'测试',
                'payTime':e=='wait'?'PAY_NEXT':'PAY_NOW'//货到付款:PAY_NEXT,立即支付:PAY_NOW
            }
           switch (e) {
                case 'wechat'://微信支付
                   
                    break;
                case 'wait'://货到付款
                    payNext(params).then((result) => {
                        if (result.data.resultCode==200) {
                            Toast({
                                message: '提交订单成功，请尽快支付',
                                duration: 1000
                            });
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
                    break;
                default:
                    break;
            }
        },
        gotoDetail(id){
            this.$router.push({path:'/commodityDetails',query:{id:id}})//id:商品详情渲染的id
        }

    },
    computed: {
        sumPrice(){
            let totle=0;
            if (this.checkAll) {
                this.ShopList.forEach(item=>{//计算总价格
                totle+=item.bizProductVo.price*item.theNum;
                this.totlePrice=totle
            })    
            }else{
                this.shopInf.forEach(item=>{//计算总价格取消反选之后计算的价格
                totle+=item.theNum*item.bizProductVo.price
                this.totlePrice=totle
            })    
            }
            return '￥'+totle.toFixed(2)
        },
    },
    created() {
        this.loadingShop()//渲染购物车商品
    },
}
</script>
<style>

.shopCar .el-input-number--mini{
    width: .75rem;
    margin-right: .05rem;
    float: right;
    margin-top: .2rem;
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
    top: -.06rem;
}
.shopCar_commodity .el-icon-plus:before{
    font-size: .16rem;
    position: relative;
    top: -.06rem;
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
    margin-top: -.32rem;
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
    margin:.19rem .19rem 0 0;
    float: right;
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
  height: 2.3rem;
  width: 47%;
  background: #fff;
  float: left;
  text-align:left;
  margin-left:.08rem;
  padding-left: .15rem;
  box-sizing: border-box;
  margin-top:.1rem;
  border-radius: .1rem;
}
.shopCar_shoplist img{
  width:85%;
  padding:.05rem;
}
.shopCar_shoplist {
  font-size:.14rem;
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
    left: .8rem;
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
    content: "  √";
    font-family: '华文琥珀';
    font-size: .17rem;
    position: absolute;
    color: #fff;
    left: .18rem;
}
.shopCar_totle .shopCar_totle_checkbox{
    height: .2rem;
    width:.2rem;
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

