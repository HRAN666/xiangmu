<template>
<div class="orderd">
    <div class="orderd_goback" @click="goBack"><img src="../assets/goBack.png"></div>
    <el-row class="usestate">
        <nav>
            <li v-for="item in usestate" :key="item.name":class="{active : active == item.name}" @click="selected(item.name)" >{{item.name}}</li>
        </nav>
    </el-row>
    <div v-for="(item,index) in orderList" :key="index">
        <div class="box">
            <p class="box_right" v-if="item.payTime === 'PAY_NOW' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' "> <!-- 微信支付，未付款 -->
                待付款
            </p>
            <p class="box_right" v-if="item.payTime === 'PAY_NOW' && item.orderStatus === 'ON_GOING' && item.payStatus === 'PAID' && item.deliverStatus === 'ON_THE_WAY' "> <!-- 微信支付，已付款，未发货 -->
                待发货
            </p>
            <p class="box_right" v-if="item.payTime === 'PAY_NOW' && item.orderStatus === 'ON_GOING' && item.payStatus === 'PAID' && item.deliverStatus === 'DELIVERED' "> <!-- 微信支付，已付款，已发货 -->
                待收货
            </p>
            <p class="box_right" v-if="item.payTime === 'PAY_NOW' && item.orderStatus === 'ON_GOING' && item.payStatus === 'PAID' && item.deliverStatus === 'CONFIRMED' "> <!-- 微信支付，已完成，未评价 -->
                待评价
            </p>

            <p class="box_right" v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'ON_THE_WAY' "> <!-- 货到付款，未发货 -->
                待发货
            </p>
            <p class="box_right" v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'DELIVERED' "> <!-- 货到付款，已发货 -->
                待收货
            </p>
            <p class="box_right" v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'CONFIRMED' "> <!-- 微信支付，已完成，未评价 -->
                待评价
            </p>
            <p class="box_right" v-if="item.orderStatus === 'APPLY_CANCEL' "> <!-- 订单取消中 -->
                订单取消中...
            </p>
            <p class="box_right" v-if="item.orderStatus === 'APPLY_DRAWBACK' "> <!-- 订单取消中 -->
                退款申请中...
            </p>
            <p class="box_right" style="color:#1591d4" v-if="item.orderStatus === 'CANCELED' "> <!-- 订单取消中 -->
                交易失败
            </p>
            <div class="bigbox" style="display:block;" v-for="(value,indexes) in JSON.parse(item.productDetailJson)" :key="indexes">
                <div class="box_long">
                    <div v-if="value.bizProductVo == null">  
                        <img class="box_left" :src="'http://img.cmhg.shop/'+ value.icon"/>
                        <div class="box_text">{{value.name}}</div>
                        <div class="box_righttext"> 
                            <span>{{value.price|filtertoMoney}}</span>
                            <p>x{{value.quantity}}</p> 
                        </div>
                    </div>
                    <div v-if="value.bizProductVo != null">  
                        <img class="box_left" :src="'http://img.cmhg.shop/'+ value.bizProductVo.icon"/>
                        <div class="box_text">{{value.bizProductVo.name}}</div>
                        <div class="box_righttext"> 
                            <span>{{value.bizProductVo.price|filtertoMoney}}</span>
                            <p>x{{value.theNum}}</p> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="box_bottom">
                <p class="box_bottom_payTime" v-if="item.payTime === 'PAY_NOW'">
                    微信支付
                </p>
                <p class="box_bottom_payTime" v-if="item.payTime === 'PAY_NEXT'">
                    货到付款
                </p>
                <div>{{'共'+item.totalNum+'件商品'}}<span>{{'合计：￥'+item.totalFee/100}}</span></div>
            </div>
            <div class="box_bottom_button">
                <div style="color:#db2828;border-color:#db2828;" v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'NOT_PAY' && item.orderStatus === 'ON_GOING' " @click="todoWechatPay(item)"> <!-- 微信支付，未付款 -->
                    立即支付
                </div>
                <div v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'NOT_PAY' && item.orderStatus === 'ON_GOING' " @click="applyCancel(item)"> <!-- 微信支付，未付款 -->
                    取消订单
                </div>
                <div v-if="item.orderStatus === 'APPLY_CANCEL' ">
                    订单取消中...
                </div>
                <div v-if="item.orderStatus === 'CANCELED' " @click="deleteorder(item)"> 
                    删除订单
                </div>
                <div v-if="item.orderStatus === 'APPLY_DRAWBACK' ">
                    退款申请中...
                </div>
                <div v-if="item.payTime === 'PAY_NOW' && item.orderStatus === 'ON_GOING' && item.payStatus === 'PAID' && item.deliverStatus === 'ON_THE_WAY' "> <!-- 微信支付，已付款，未发货 -->
                    等待发货
                </div>
                <div v-if="item.payTime === 'PAY_NOW' && item.orderStatus === 'ON_GOING' && item.payStatus === 'PAID' && item.deliverStatus === 'ON_THE_WAY' " @click="applyDrawback(item)"> <!-- 微信支付，已付款，未发货 -->
                    申请退款
                </div>
                <div style="color:#db2828;border-color:#db2828;" v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'PAID' && item.deliverStatus === 'DELIVERED' " @click="Confirmreceipt(item)"> <!-- 微信支付，已付款，已发货 -->
                    确认收货
                </div>
                <div style="color:#db2828;border-color:#db2828;" v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'PAID' && item.deliverStatus === 'CONFIRMED' && item.orderStatus === 'ON_GOING'"> <!-- 微信支付，已完成，未评价 -->
                    立即评价
                </div>
                <div v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'PAID' && item.deliverStatus === 'CONFIRMED' && item.orderStatus === 'ON_GOING'" @click="applyDrawback(item)"> <!-- 微信支付，已完成，未评价 -->
                    申请退款
                </div>
                <div v-if="item.payTime === 'PAY_NOW' && item.payStatus === 'PAID' && item.deliverStatus === 'DELIVERED' "> <!-- 微信支付，已付款，已发货 -->
                    查看物流
                </div>

                <div v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'ON_THE_WAY' "> <!-- 货到付款，未发货 -->
                    等待发货
                </div>
                <div v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'ON_THE_WAY' " @click="applyCancel(item)"> <!-- 货到付款，未发货 -->
                    取消订单
                </div>
                <div v-if="item.payTime === 'PAY_NEXT' && item.orderStatus === 'ON_GOING' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'DELIVERED' "> <!-- 货到付款，已发货 -->
                    查看物流
                </div>
                <div style="color:#db2828;border-color:#db2828;" v-if="item.payTime === 'PAY_NEXT' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'DELIVERED' " @click="Confirmreceipt(item)"> <!-- 货到付款，已发货 -->
                    确认收货
                </div>
                <div style="color:#db2828;border-color:#db2828;" v-if="item.payTime === 'PAY_NEXT' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'CONFIRMED' && item.orderStatus === 'ON_GOING'"> <!-- 货到付款，已完成，未评价 -->
                    立即评价
                </div>
                <div v-if="item.payTime === 'PAY_NEXT' && item.payStatus === 'NOT_PAY' && item.deliverStatus === 'CONFIRMED' && item.orderStatus === 'ON_GOING'" @click="applyDrawback(item)"> <!-- 货到付款，已完成，未评价 -->
                    申请退款
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import footer from "../components/footer";
import {historyOrder,Orderpay,Confirmreceipt,applyCancel,deleteorder,applyDrawback} from '../api/api.js';
import {filtertoMoney} from '../filter/filter.js';
import { Toast } from 'mint-ui';
export default {
    components: {
        "footer-currency": footer
    },
    data() {
        return {
            orderList:[],
            deliverStatus:'',
            usestate: [
                {name: '全部',tabId: '0'},
                {name: '待付款',tabId: '1'},
                {name: '待发货',tabId: '3'},
                {name: '待收货',tabId: '4'},
                {name: '待评价',tabId: '5'},
            ],
            active:'全部',
        };
    },
    methods: {
        goBack(){
            this.$router.push('/myself')
        },
        todoWechatPay(item){//微信支付||货到付款.
            let params={
                "id":item.id,                              
            }
            Orderpay(params).then((result) => {
                if (result.data.resultCode==200) {
                    this.wechatpay(result.data);
                }
                }).catch((err) => {
                    console.log(err)
            });
        },
        wechatpay(data){
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId":data.wxId,     //公众号名称，由商户传入     
                    "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数     
                    "nonceStr":data.nonceStr, //随机串     
                    "package":"prepay_id="+data.prepayId,
                    "signType":"MD5",         //微信签名方式：     
                    "paySign":data.sign//微信签名 
                },
                function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    Toast({
                        message: '支付成功!',
                        duration: 1000
                    });
                }else if(res.err_msg == "get_brand_wcpay_request:cancel" ){
                    Toast({
                        message: '取消支付',
                        duration: 1000
                    });
                }else{
                    Toast({
                        message: '支付失败！',
                        duration: 1000
                    });
                }
            });
        },
        Confirmreceipt(item){
            let params={
                "id":item.id,                              
            }
            Confirmreceipt(params).then((result) => {
                if (result.data.resultCode==200) {
                    Toast({
                        message: '收货成功',
                        duration: 1000
                    });
                }else if(result.data.resultCode==500){
                    Toast({
                        message: '收货失败',
                        duration: 1000
                    });
                }
            }).catch((err) => {
                
            });
        },
        applyCancel(item){
            let params={
                "id":item.id,                              
            }
            applyCancel(params).then((result) => {
                if (result.data.resultCode==200) {
                    Toast({
                        message: '申请取消订单',
                        duration: 1000
                    });
                }else if(result.data.resultCode==500){
                    Toast({
                        message: '取消失败',
                        duration: 1000
                    });
                }
            }).catch((err) => {
                
            });
        },
        deleteorder(item){
            let params={
                "id":item.id,                              
            }
            deleteorder(params).then((result) => {
                if (result.data.resultCode==200) {
                    Toast({
                        message: '删除成功',
                        duration: 1000
                    });
                }else if(result.data.resultCode==500){
                    Toast({
                        message: '删除失败',
                        duration: 1000
                    });
                }
            }).catch((err) => {
                
            });
        },
        applyDrawback(item){
            let params={
                "id":item.id,                              
            }
            applyDrawback(params).then((result) => {
                if (result.data.resultCode==200) {
                    Toast({
                        message: '申请退款',
                        duration: 1000
                    });
                }else if(result.data.resultCode==500){
                    Toast({
                        message: '申请失败',
                        duration: 1000
                    });
                }
            }).catch((err) => {
                
            });
        },
        selected(name){
            this.orderList=[];
            this.active = name;
            let params={
                'userOpenId':localStorage.getItem('userOpenId')
            }
            historyOrder(params).then((result) => {
                for (let i = 0; i < result.data.list.length; i++) {
                    if(this.active=='待付款' && result.data.list[i].payTime=='PAY_NOW' && result.data.list[i].orderStatus=='ON_GOING' && result.data.list[i].payStatus=='NOT_PAY'){
                        this.orderList.push(result.data.list[i]);
                    }else if(this.active=='待发货' && result.data.list[i].payTime=='PAY_NOW' && result.data.list[i].orderStatus=='ON_GOING' && result.data.list[i].payStatus=='PAID' && result.data.list[i].deliverStatus=='ON_THE_WAY'){
                        this.orderList.push(result.data.list[i]);
                    }else if(this.active=='待发货' && result.data.list[i].payTime=='PAY_NEXT' && result.data.list[i].orderStatus=='ON_GOING' && result.data.list[i].payStatus=='NOT_PAY' && result.data.list[i].deliverStatus=='ON_THE_WAY'){
                        this.orderList.push(result.data.list[i]);
                    }else if(this.active=='待收货' && result.data.list[i].payTime=='PAY_NOW' && result.data.list[i].orderStatus=='ON_GOING' && result.data.list[i].payStatus=='PAID' && result.data.list[i].deliverStatus=='DELIVERED'){
                        this.orderList.push(result.data.list[i]);
                    }else if(this.active=='待收货' && result.data.list[i].payTime=='PAY_NEXT' && result.data.list[i].orderStatus=='ON_GOING' && result.data.list[i].payStatus=='NOT_PAY' && result.data.list[i].deliverStatus=='DELIVERED'){
                        this.orderList.push(result.data.list[i]);
                    }else if(this.active=='待评价' && result.data.list[i].orderStatus=='ON_GOING' && result.data.list[i].payStatus=='PAID' && result.data.list[i].deliverStatus=='CONFIRMED'){
                        this.orderList.push(result.data.list[i]);
                    }else if(this.active=='全部'){
                        this.orderList.push(result.data.list[i]);
                    }
                }
            }).catch((err) => {
                console.log(err)
            });
        },
        loadingOrder(){
            let params={
                'userOpenId':localStorage.getItem('userOpenId')
            }
            historyOrder(params).then((result) => {
                for (let i = 0; i < result.data.list.length; i++) {
                    this.orderList.push(result.data.list[i]);
                }
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
.usestate{
    background-color: #ffffff;
    height: .45rem;
    position: relative;
}
.usestate nav{
    margin: 0 auto;
    width: 90%;
    margin-left: .35rem;
}
.usestate nav li{
    text-indent: .03rem;
    line-height: .4rem;
    list-style: none;
    text-decoration: none;
    width: 20%;
    font-size: .15rem;
    float: left;
}
.usestate nav li:nth-child(1){
    margin-left: .0;
}
.usestate nav li span{
    margin-left: .08rem; 
}
.usestate nav .active{
    text-indent: .03rem;
    line-height: .4rem;
    list-style: none;
    text-decoration: none;
    width: 20%;
    font-size: .15rem;
    float: left;
    color: #0288d1;
    border-bottom: .02rem solid #0288d1; 
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
    margin-top: .01rem;
    background-color: #ffffff;
}
.bigbox{
    position: relative;
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
    color: #db2828;
    font-size: 0.12rem;
    margin: 0.03rem 0rem;
    position: relative;
    text-align: right;
    margin-right: .1rem;
}
.box_left {
    float: left;
    width: .9rem;
    height: .9rem;
    padding: 0px 0.2rem;
}
.box_text {
    width: 1.7rem;
    font-size: 0.13rem;
    float: left;
    text-align: left;
}
.box_righttext {
    float: right;
    font-size: 0.16rem;
    font-weight: bolder;
}
.box_righttext p:last-child {
    font-size: 0.12rem;
    text-align: right;
    font-weight: normal;
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
    position: absolute;
    right: 0;
    width: 2rem;
    margin-top: -.4rem;
}
.box_bottom .box_bottom_payTime{
    text-align: right;
    color: #e18601;
    font-size: 0.12rem;
    margin: 0.03rem 0rem;
    margin-right: .1rem;
}
.box_bottom div{
    font-size: 0.14rem;
    text-align: right;
}
.box_bottom div span{
    margin-left: .2rem;
    margin-right: .1rem;
}
.box_bottom_button {
    width: 100%;
    float: left;
    margin-top: .05rem;
    border-top: 0.01rem solid #e0dfe3;
    border-bottom: 0.05rem solid #e0dfe3;
}
.box_bottom_button > div {
    float: right;
    border-radius: 0.19rem;
    border: 0.01rem solid #6d6c6c;
    padding: 0.02rem 0.15rem;
    color: #6d6c6c;
    font-size: 0.12rem;
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