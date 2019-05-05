<template>
<div class="orderd">
    <div class="orderd_goback" @click="goBack"><img src="../assets/goBack.png"></div>
    <el-tabs v-model="activeName" >
        <el-tab-pane label="全部" name="first">
          <div v-for="(item,index) in orderList" :key="index">
                <div class="box">
                  <div class="bigbox" style="display:block;"  v-for="(value,indexes) in JSON.parse(item.productDetailJson)" :key="indexes">
                        <div class="box_long"> 
                            <p class="box_right" v-if="item.deliverStatus === 'ON_THE_WAY'">
                                待发货 
                            </p>
                            <p class="box_right" v-if="item.deliverStatus === 'DELIVERED'">
                                已发货
                            </p>
                            <p class="box_right" v-if="item.deliverStatus === 'CONFIRMED'">
                                确认收货
                            </p>
                            <div v-if="value.bizProductVo == null">  
                                <img class="box_left" :src="'http://img.cmhg.shop/'+ value.icon"/>
                                <div class="box_text">{{value.name}}</div>
                                <div class="box_righttext"> 
                                    <span>{{item.totalFee|filtertoMoney}}</span>
                                    <p>x{{value.quantity}}</p> 
                                </div>   
                            </div> 
                            <div v-if="value.bizProductVo != null">  
                                <img class="box_left" :src="'http://img.cmhg.shop/'+ value.bizProductVo.icon"/>
                                <div class="box_text">{{value.bizProductVo.name}}</div>
                                <div class="box_righttext"> 
                                    <span>{{item.totalFee|filtertoMoney}}</span>
                                    <p>x{{value.theNum}}</p> 
                                </div>   
                            </div>
                        </div>   
                </div>
                <div class="box_bottom">
                    <span>
                    </span>
                    <span>
                      {{'共'+item.totalNum+'件商品'}}
                    </span>
                </div>
                <div class="box_bottom_button">
                    <div>确认收货</div>
                    <div>查看物流</div>
                </div>
            </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="待付款" name="second">
            <div class="integral_content">
                <div class="integral_tops">
                    没有更多订单数据了~ 
                </div>
                <div class="product">
                    <div class="integral_tops" style="font-size:0.18rem;color:#0288d1;background-color:#efefef;">
                        商品推荐
                    </div>
                    <div class="productBlock">
                        <img src="../assets/shopList.jpg" class="">
                        <p>众合盐焗鸡蛋一盒</p>
                        <div class="productBlock_bottom"> 
                            <div class="productBlock_price">￥25.50</div>
                            <div class="productBlock_specification">11人已兑</div>
                            <span>兑换</span>
                        </div>
                    </div>
                    <div class="productBlock">
                        <img src="../assets/shopList.jpg" class="">
                        <p>众合盐焗鸡蛋一盒</p>
                        <div class="productBlock_bottom"> 
                            <div class="productBlock_price">￥25.50</div>
                            <div class="productBlock_specification">11人已兑</div>
                            <span>兑换</span>
                        </div>
                    </div>
                </div>
                <div class="product">
                    <div class="productBlock">
                        <img src="../assets/shopList.jpg" class="">
                        <p>众合盐焗鸡蛋一盒</p>
                        <div class="productBlock_bottom"> 
                            <div class="productBlock_price">￥25.50</div>
                            <div class="productBlock_specification">11人已兑</div>
                            <span>兑换</span>
                        </div>
                    </div>
                    <div class="productBlock">
                        <img src="../assets/shopList.jpg" class="">
                        <p>众合盐焗鸡蛋一盒</p>
                        <div class="productBlock_bottom"> 
                            <div class="productBlock_price">￥25.50</div>
                            <div class="productBlock_specification">11人已兑</div>
                            <span>兑换</span>
                        </div>
                    </div>
                </div>
                <div class="product">
                    <div class="productBlock">
                        <img src="../assets/shopList.jpg" class="">
                        <p>众合盐焗鸡蛋一盒</p>
                        <div class="productBlock_bottom"> 
                            <div class="productBlock_price">100积分</div>
                            <div class="productBlock_specification">11人已兑</div>
                            <span>兑换</span>
                        </div>
                    </div>
                    <div class="productBlock">
                        <img src="../assets/shopList.jpg" class="">
                        <p>众合盐焗鸡蛋一盒</p>
                        <div class="productBlock_bottom"> 
                            <div class="productBlock_price">100积分</div>
                            <div class="productBlock_specification">11人已兑</div>
                            <span>兑换</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="third"></el-tab-pane>
        <el-tab-pane label="待收货" name="fourth"></el-tab-pane>
        <el-tab-pane label="待评价" name="five"></el-tab-pane>
    </el-tabs>



</div>

</template>
<script>
import footer from "../components/footer";
import {historyOrder} from '../api/api.js';
import {filtertoMoney} from '../../filter/filter.js'
export default {
  components: {
    "footer-currency": footer
  },
  data() {
    return {
      activeName:"first",
      orderList:'',
      deliverStatus:'',
    };
  },
  methods: {
      goBack(){
        this.$router.push('/myself')
      },
      loadingOrder(){
        let params={
          'userOpenId':localStorage.getItem('userOpenId')
        }
        historyOrder(params).then((result) => {
              this.orderList=result.data.list
        }).catch((err) => {
            console.log(err)
        });
      }
  },
  created() {
        this.loadingOrder()
  }
};
</script>
<style scoped>
div {
  font-size: 0.11rem;
  background-color: #ffffff;
}
.header {
  width: 85%;
  margin: 0 auto;
  font-size: 0.135rem;
  overflow: hidden;
  background-color: #ffffff;
}
.header div {
  width: 18%;
  padding: 0rem 1%;
  line-height: 0.27rem;
  text-align: center;
  float: left;
  font-size: 0.14rem;
}
.box {
  width: 100%;
  float: left;
  font-size: 0.11rem;
}
.box_long {
    width: 95%;
    margin: 0 auto;
    overflow: hidden;
}
.box_long > div {
  float: left;
  width: 100%;
}
.box_right {
  text-align: right;
  color: #db2828;
  font-size: 0.115rem;
  margin: 0.1rem 0rem;
}
.box_left {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
  padding: 0px 0.2rem;
}
.box_text {
  width: 1.75rem;
  font-size: 0.11rem;
  float: left;
  text-align: left;
}
.box_righttext {
  float: right;
  font-size: 0.135rem;
}
/* .box_right p:first-child{

} */
.box_righttext p:last-child {
  font-size: 0.1rem;
  color: #888181;
  line-height: 0.01rem;
}
.box_state {
  font-size: 0.115rem;
  float: right;
  width: 60%;
  text-align: right;
  color: #e18601;
}
.box_state_blue {
  color: #0288d1;
}
.box_bottom {
  width: 100%;
  padding: 0.01rem 0px;
  border-bottom: 2px solid #e0dfe3;
  float: left;
}
.box_bottom > span {
  float: right;
  padding: 0rem 2.5%;
}
.box_bottom_button {
  width: 100%;
  float: left;
  border-bottom: 5px solid #e0dfe3;
}
.box_bottom_button > div {
  float: right;
  border-radius: 0.19rem;
  border: 0.01rem solid #6d6c6c;
  padding: 0.02rem 0.15rem;
  color: #db2828;
  font-size: 0.115rem;
  margin: 0.07rem 0.08rem;
  cursor: pointer;
}

.integral_tops {
  width: 100%;
  height: 0.635rem;
  text-align: center;
  line-height: 0.635rem;
  font-size: 0.135rem;
  color: #a2a0a0;
}
.product {
  margin-top: 0.12rem;
}
.productBlock {
  width: 1.71rem;
  height: 1.83rem;
  float: left;
  margin-left: 0.13rem;
  background: #fff;
  border-radius: 0.15rem;
  margin-bottom: 0.2rem;
}
.productBlock span {
  border-radius: 0.08rem;
  display: inline-block;
  width: 0.3rem;
  margin-left: 0.13rem;
  float: left;
  border: 0.01rem solid #bbbbbb;
  color: #888888;
  font-size: 0.09rem;
  line-height: 0.175rem;
}
.productBlock > img {
  width: 1.5rem;
}
.productBlock p {
  font-size: 0.14rem;
  margin-top: 0;
  margin-left: 0.13rem;
  float: left;
  text-align: left;
}
.productBlock div {
  font-size: 0.135rem;
  float: left;
  margin-left: 0.06rem;
  color: #0288d1;
}
.productBlock .productBlock_specification {
  color: #888888;
  font-size: 0.09rem;
  line-height: 0.2rem;
  margin-left: 0.13rem;
}
.productBlock_bottom {
  margin-top: -0.08rem;
}
.orderd_goback{
    position: absolute;
    height: .4rem;
    left: .1rem;
    z-index: 99;
}
.orderd_goback img{
    height: .2rem;
    position: absolute;
    top: 0.09rem;
}
</style>
<style>
.orderd .el-tabs__nav{
    margin:0rem .54rem;
}
.orderd .el-tabs__item{
    padding:0rem .09rem;
}
</style>
