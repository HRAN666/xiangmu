<template>
    <div class="shopCar">
        <header-general routerTo='/home' headTitle="购物车" headClass="style3"  titleSecod="编辑"></header-general>
        <div class="shopCar_address">
            <img src="../assets/shopCar_address.png" alt="" class="shopCar_address_icon">
            送至：广东龙岗区
            <img src="../assets/shopCar_more.png" alt="" class="shopCar_address_iconMore">
        </div>
        <div class="shopCar_commodity">
            <div class="shopCar_commodity_list" v-for="(item,index) in list" :key="index">
                <input  @change="select(item.id)"   type="checkbox" :checked="shopListCheck.indexOf(item.id)>=0" class="shopCar_commodity_list_checkbox">
                   <img src="../assets/colo.jpg" alt="">
                    <div class="shopCar_commodity_listTitle">卫龙亲嘴烧100片盒装辣条大礼包麻辣儿时怀旧小吃小面筋零食辣片</div>
                    <span class="shopCar_commodity_listPrice">￥30.00</span>
                     <el-input-number size="mini" v-model="item.count" :min="1" :max="99"></el-input-number>
            </div>
            <!-- <div class="shopCar_commodity_list">
               <el-checkbox  :checked='false' @change="selectShop($event)"></el-checkbox>
                   <img src="../assets/colo.jpg" alt="">
                    <div class="shopCar_commodity_listTitle">卫龙亲嘴烧100片盒装辣条大礼包麻辣儿时怀旧小吃小面筋零食辣片</div>
                    <span class="shopCar_commodity_listPrice">￥30.00</span>
                     <el-input-number size="mini" v-model="shopValue" :min="1" :max="99"></el-input-number>
            </div> -->
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
        <div class="shopCar_bottom">我是有底线的</div> 
        <div class="shopCar_totle">
            <div class="shopCar_totle_checkedAll">
            <input v-model="checkAll" @change="tocheckAll" type="checkbox" class="shopCar_totle_checkbox">
            <span>全选</span>
            </div>
            <span class="shopCar_totle_freight">不含运费</span>
            <div class="shopCar_totle_price">
                总计：
                <span>￥60.00</span>
            </div>
            <span class="shopCar_totle_discount">已优惠：￥10.00</span>
            <el-button type="primary">结算</el-button>
        </div>
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
    },
    data(){
        return{
            checkAll:true,//是否全选
            shopListCheck:[],//选中商品
                    list:[
                    {
                        id:15645,
                        name:'iPhone 8',
                        price:8888,
                        count:1
                    },
                    {
                        id:2456,
                        name:'Huwei Mate10',
                        price:6666,
                        count:1
                    },
                    {
                        id:3546,
                        name:'Lenovo',
                        price:6588,
                        count:1
                    }
                    ],
        }
    },
    methods:{
        select(id){
            let index=this.shopListCheck.indexOf(id)
        if(index>=0){//重复
                this.shopListCheck.splice(index,1)
                console.log(this.shopListCheck)
                this.checkAll=false;
            }else{
                this.shopListCheck.push(id)
                if (this.list.length==this.shopListCheck.length) {//单选全满：全选打勾
                    this.checkAll=true
                }
            }
        },
        tocheckAll(e){
            if (this.checkAll) {//全选
                this.shopListCheck=[]
               this.list.forEach(item => {
                   this.shopListCheck.push(item.id)
               });
                console.log(this.shopListCheck)
            }else{//反选
                this.shopListCheck=[]
            }
        },
    },
    created() {
        this.tocheckAll()
    },
    computed: {

    }
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

.shopCar_totle .el-button--primary{
    float: right;
    height: .5rem;
    width: 1rem;
    margin-top: -.32rem;
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
    top: .01rem;
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
    font-size:.12rem;
    padding-top: .19rem;
    padding-left: .12rem;
    width: 1.69rem;
    float: left;
}
.shopCar_commodity .shopCar_commodity_list .shopCar_commodity_listPrice{
    font-size:.12rem;
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
}
.shopCar_shoplist{
  height: 2.2rem;
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
    padding: .02rem;
}
.shopCar_bottom{
    font-size: .12rem;
    width: 100%;
    position: relative;
    margin-bottom: 1.3rem;
    top: .2rem;
    color:#a2a0a0;
}
.shopCar_bottom::before{
  content:'';
  position: absolute;
  border: .1px #e0dddd solid;
  width: 27%;
  left: .43rem;
  bottom: .06rem;
}
.shopCar_bottom::after{
  content:'';
  position: absolute;
  border: .1px #e0dddd solid;
  width: 27%;
  right: .43rem;
  bottom: .06rem;
}
 .shopCar .shopCar_totle{
     background:#fff;
     height: .5rem;
     position: fixed;
    bottom: .5rem;
    width: 100%;
    font-size:.12rem
}
.shopCar_totle .shopCar_totle_freight{
    position: relative;
    left: -.8rem;
    top:.06rem;
    color:#a2a0a0;
}
.shopCar_totle .shopCar_totle_price{
    top:-.1rem;
    position: relative;
    font-size:.13rem;
    left: -.03rem;
}
.shopCar_totle .shopCar_totle_price span{
    font-size:.12rem;
    color:#0288d1;
}
 .shopCar_totle .shopCar_totle_discount{
     position: relative;
     left: .44rem;
     color:#a2a0a0;
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
    content: "✓";
    font-size: .16rem;
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

</style>

